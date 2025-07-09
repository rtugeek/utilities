export interface FileModel {
  id?: number
  label: string
  target: string
  /**
   * maybe url of http/data/file
   */
  icon: string
  sort: string
  /**
   * 0: file, 1: dir
   */
  isDir: number
  size: number
  type: string
  path: string
  lastModified: number
}
