<script lang="ts" setup>
import { ImageFiles } from '@icon-park/vue-next'
import { useStorage } from '@vueuse/core'
import { useWidget } from '@widget-js/vue3'
import { ElMessage } from 'element-plus'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { canvasToBmp, canvasToIco, fileToImage } from '@/utils/imageUtils'
import 'element-plus/theme-chalk/el-message.css'

const { t } = useI18n()

useWidget()
document.title = t('imageConverter.title')

watch(() => t('imageConverter.title'), (newTitle) => {
  document.title = newTitle
})

interface FileItem {
  raw: File
  name: string
  size: number
  status: 'pending' | 'converting' | 'success' | 'error'
}

const fileList = ref<FileItem[]>([])
const targetFormat = useStorage('image/jpeg')
const targetWidth = useStorage<number | undefined>('targetWidth', undefined)
const targetHeight = useStorage<number | undefined>('targetHeight', undefined)
const keepAspectRatio = useStorage('keepAspectRatio', true)
const converting = ref(false)

function handleFileChange(uploadFile: any) {
  const raw = uploadFile.raw
  if (!raw)
    return
  // Avoid duplicates
  if (fileList.value.some(f => f.name === raw.name && f.size === raw.size))
    return

  fileList.value.push({
    raw,
    name: raw.name,
    size: raw.size,
    status: 'pending',
  })
}

function removeFile(index: number) {
  fileList.value.splice(index, 1)
}

function clearFiles() {
  fileList.value = []
}

function formatSize(row: any, column: any, cellValue: number) {
  if (cellValue < 1024)
    return `${cellValue} B`
  if (cellValue < 1024 * 1024)
    return `${(cellValue / 1024).toFixed(1)} KB`
  return `${(cellValue / 1024 / 1024).toFixed(1)} MB`
}

function getStatusType(status: string) {
  if (status === 'success')
    return 'success'
  if (status === 'error')
    return 'danger'
  if (status === 'converting')
    return 'warning'
  return 'info'
}

async function startConversion() {
  if (fileList.value.length === 0)
    return
  converting.value = true

  const zip = new JSZip()
  let successCount = 0
  let singleFileBlob: Blob | null = null
  let singleFileName = ''

  for (const item of fileList.value) {
    item.status = 'converting'
    try {
      const blob = await processFile(item.raw)
      if (blob) {
        let ext = ''
        switch (targetFormat.value) {
          case 'image/jpeg':{
            ext = 'jpg'
            break
          }
          case 'image/png': {
            ext = 'png'
            break
          }
          case 'image/webp':{
            ext = 'webp'
            break
          }
          case 'image/bmp': {
            ext = 'bmp'
            break
          }
          case 'image/x-icon': {
            ext = 'ico'
            break
          }
        }
        const fileName = `${item.name.replace(/\.[^/.]+$/, '')}.${ext}`
        zip.file(fileName, blob)
        // Store for single file download
        if (fileList.value.length === 1) {
          singleFileBlob = blob
          singleFileName = fileName
        }
        item.status = 'success'
        successCount++
      }
      else {
        item.status = 'error'
      }
    }
    catch (e) {
      console.error(e)
      item.status = 'error'
    }
  }

  converting.value = false

  if (successCount > 0) {
    if (successCount === 1 && fileList.value.length === 1 && singleFileBlob && singleFileName) {
      saveAs(singleFileBlob, singleFileName)
      ElMessage.success(`Converted 1 file.`)
    }
    else {
      const content = await zip.generateAsync({ type: 'blob' })
      saveAs(content, 'converted_images.zip')
      ElMessage.success(`Converted ${successCount} files.`)
    }
  }
  else {
    ElMessage.warning('No files converted successfully.')
  }
}

async function processFile(file: File): Promise<Blob> {
  const img = await fileToImage(file)
  const canvas = document.createElement('canvas')
  let width = img.width
  let height = img.height

  // Calculate new dimensions
  if (targetWidth.value && targetHeight.value) {
    width = targetWidth.value
    height = targetHeight.value
  }
  else if (targetWidth.value) {
    width = targetWidth.value
    if (keepAspectRatio.value) {
      height = (width / img.width) * img.height
    }
  }
  else if (targetHeight.value) {
    height = targetHeight.value
    if (keepAspectRatio.value) {
      width = (height / img.height) * img.width
    }
  }

  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx)
    throw new Error('Canvas context failed')

  // Fill white background for JPEG/BMP (no transparency)
  if (targetFormat.value === 'image/jpeg' || targetFormat.value === 'image/bmp') {
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, width, height)
  }

  ctx.drawImage(img, 0, 0, width, height)

  if (targetFormat.value === 'image/bmp') {
    return canvasToBmp(canvas)
  }
  else if (targetFormat.value === 'image/x-icon') {
    return canvasToIco(canvas)
  }
  else {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob)
          resolve(blob)
        else reject(new Error('Canvas to Blob failed'))
      }, targetFormat.value, 0.9)
    })
  }
}
</script>

<template>
  <div class="convert-container">
    <div class="upload-area">
      <el-upload
        class="upload-demo"
        drag
        multiple
        accept="image/*,.heic,.HEIC"
        :auto-upload="false"
        :on-change="handleFileChange"
        :show-file-list="false"
      >
        <div class="el-upload__text">
          <div class="flex flex-col gap-2">
            <ImageFiles size="32" />
            <div v-html="t('imageConverter.dropText')" />
          </div>
        </div>
      </el-upload>
    </div>

    <div class="settings-area">
      <el-form :inline="true" size="small">
        <el-form-item :label="t('imageConverter.targetFormat')">
          <el-select v-model="targetFormat" :placeholder="t('imageConverter.selectFormat')" style="width: 100px">
            <el-option label="JPG" value="image/jpeg" />
            <el-option label="PNG" value="image/png" />
            <el-option label="WEBP" value="image/webp" />
            <el-option label="BMP" value="image/bmp" />
            <el-option label="ICO" value="image/x-icon" />
          </el-select>
        </el-form-item>
        <el-form-item :label="t('imageConverter.width')">
          <el-input-number v-model="targetWidth" :min="1" :placeholder="t('imageConverter.original')" controls-position="right" style="width: 100px" />
        </el-form-item>
        <el-form-item :label="t('imageConverter.height')">
          <el-input-number v-model="targetHeight" :min="1" :placeholder="t('imageConverter.original')" controls-position="right" style="width: 100px" />
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="keepAspectRatio">
            {{ t('imageConverter.keepAspectRatio') }}
          </el-checkbox>
        </el-form-item>
      </el-form>
    </div>

    <div class="actions">
      <el-button type="primary" :loading="converting" :disabled="fileList.length === 0" @click="startConversion">
        {{ t('imageConverter.convertAndDownload') }}
      </el-button>
      <el-button :disabled="fileList.length === 0" @click="clearFiles">
        {{ t('imageConverter.clear') }}
      </el-button>
    </div>

    <div v-if="fileList.length > 0" class="file-list">
      <el-table :data="fileList" style="width: 100%" size="small" max-height="250">
        <el-table-column prop="name" :label="t('imageConverter.name')" show-overflow-tooltip />
        <el-table-column prop="size" :label="t('imageConverter.size')" width="100" :formatter="formatSize" />
        <el-table-column prop="status" :label="t('imageConverter.status')" width="100">
          <template #default="scope">
            <el-tag :type="getStatusType(scope.row.status)">
              {{ t(`imageConverter.statusTypes.${scope.row.status}`) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="t('imageConverter.action')" width="80">
          <template #default="scope">
            <el-button link type="danger" size="small" @click="removeFile(scope.$index)">
              {{ t('imageConverter.remove') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped>
.convert-container {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1rem;
  color: var(--widget-color);
}

.upload-area {
  width: 100%;
}

.settings-area {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.actions {
  display: flex;
  gap: 1rem;
}

.file-list {
  flex: 1;
  overflow: auto;
}
</style>
