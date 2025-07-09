import type { FileModel } from '@/model/FileModel'
import type { Table } from 'dexie'
import Dexie from 'dexie'

class FileDatabase extends Dexie {
  files!: Table<FileModel>

  constructor() {
    super('FileDatabase')
    this.version(1).stores({
      files: '++id, label, sort, isDir',
    })
  }
}

const db = new FileDatabase()

export class FileRepository {
  static async save(file: FileModel): Promise<number> {
    return db.files.add(file)
  }

  static async saveAll(files: FileModel[]): Promise<number> {
    return db.files.bulkAdd(files)
  }

  static async update(id: number, file: Partial<FileModel>): Promise<number> {
    return db.files.update(id, file)
  }

  static async delete(id: number): Promise<void> {
    await db.files.delete(id)
  }

  static async getById(id: number): Promise<FileModel | undefined> {
    return db.files.get(id)
  }

  static async getAll(): Promise<FileModel[]> {
    return db.files.toArray()
  }

  static async getAllByDir(isDir: number): Promise<FileModel[]> {
    return db.files.where('isDir').equals(isDir).toArray()
  }

  static async searchByLabel(query: string): Promise<FileModel[]> {
    return db.files
      .where('label')
      .startsWithIgnoreCase(query)
      .toArray()
  }
}
