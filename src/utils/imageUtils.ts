import heic2any from 'heic2any'

export async function fileToImage(file: File): Promise<HTMLImageElement> {
  let src: string
  // Check for HEIC type or extension
  if (file.type === 'image/heic' || file.name.toLowerCase().endsWith('.heic')) {
    try {
      const blob = await heic2any({ blob: file, toType: 'image/jpeg' })
      const resultBlob = Array.isArray(blob) ? blob[0] : blob
      src = URL.createObjectURL(resultBlob)
    }
    catch (e: any) {
      if (e && e.code === 1 && e.message.includes('ERR_USER Image is already browser readable')) {
        console.warn('Image is already browser readable, skipping heic2any conversion')
        src = URL.createObjectURL(file)
      }
      else {
        console.error('HEIC conversion failed', e)
        throw new Error('Failed to decode HEIC image')
      }
    }
  }
  else {
    src = URL.createObjectURL(file)
  }

  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

export function canvasToBmp(canvas: HTMLCanvasElement): Blob {
  const width = canvas.width
  const height = canvas.height
  const ctx = canvas.getContext('2d')
  if (!ctx)
    throw new Error('Canvas context not found')
  const imgData = ctx.getImageData(0, 0, width, height)
  const data = imgData.data

  const bpp = 24 // 24-bit bitmap
  const stride = Math.floor((width * bpp + 31) / 32) * 4
  const pixelArraySize = stride * height
  const fileHeaderSize = 14
  const infoHeaderSize = 40
  const fileSize = fileHeaderSize + infoHeaderSize + pixelArraySize

  const buffer = new ArrayBuffer(fileSize)
  const view = new DataView(buffer)

  // File Header
  view.setUint16(0, 0x4D42, true) // BM
  view.setUint32(2, fileSize, true)
  view.setUint16(6, 0, true)
  view.setUint16(8, 0, true)
  view.setUint32(10, fileHeaderSize + infoHeaderSize, true)

  // Info Header
  view.setUint32(14, infoHeaderSize, true)
  view.setInt32(18, width, true)
  view.setInt32(22, -height, true) // top-down
  view.setUint16(26, 1, true) // planes
  view.setUint16(28, bpp, true)
  view.setUint32(30, 0, true) // compression (BI_RGB)
  view.setUint32(34, pixelArraySize, true)
  view.setInt32(38, 0, true) // x pixels per meter
  view.setInt32(42, 0, true) // y pixels per meter
  view.setUint32(46, 0, true) // colors used
  view.setUint32(50, 0, true) // important colors

  // Pixel Data
  let rowStart = fileHeaderSize + infoHeaderSize
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4
      const pos = rowStart + x * 3
      view.setUint8(pos, data[i + 2]) // B
      view.setUint8(pos + 1, data[i + 1]) // G
      view.setUint8(pos + 2, data[i]) // R
    }
    rowStart += stride
  }

  return new Blob([buffer], { type: 'image/bmp' })
}

export async function canvasToIco(canvas: HTMLCanvasElement): Promise<Blob> {
  // Simple ICO: 1 image, PNG format inside.

  const pngBlob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/png'))
  if (!pngBlob)
    throw new Error('Failed to create PNG')

  const pngArrayBuffer = await pngBlob.arrayBuffer()
  const pngData = new Uint8Array(pngArrayBuffer)

  const headerSize = 6
  const entrySize = 16
  const totalSize = headerSize + entrySize + pngData.length

  const buffer = new ArrayBuffer(totalSize)
  const view = new DataView(buffer)

  // Header
  view.setUint16(0, 0, true) // Reserved
  view.setUint16(2, 1, true) // Type (1 = ICO)
  view.setUint16(4, 1, true) // Count (1 image)

  // Entry
  const width = canvas.width >= 256 ? 0 : canvas.width
  const height = canvas.height >= 256 ? 0 : canvas.height
  view.setUint8(6, width)
  view.setUint8(7, height)
  view.setUint8(8, 0) // Palette count
  view.setUint8(9, 0) // Reserved
  view.setUint16(10, 1, true) // Color planes
  view.setUint16(12, 32, true) // Bits per pixel
  view.setUint32(14, pngData.length, true) // Size
  view.setUint32(18, headerSize + entrySize, true) // Offset

  // Image data
  const dataView = new Uint8Array(buffer)
  dataView.set(pngData, headerSize + entrySize)

  return new Blob([buffer], { type: 'image/x-icon' })
}
