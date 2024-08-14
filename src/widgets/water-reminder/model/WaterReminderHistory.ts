import dayjs from 'dayjs'
import localforage from 'localforage'

const instance = localforage.createInstance({
  name: 'water-reminder-history',
})
export class WaterReminderHistory {
  static getTodayKey(): string {
    return dayjs().format('YYYY-MM-DD')
  }

  static async getTodayCount(): Promise<number> {
    const todayKey = this.getTodayKey()
    const value = (await instance.getItem<number>(todayKey)) ?? 0
    if (value < 0) {
      return 0
    }
    else {
      return value
    }
  }

  static async increaseTodayCount() {
    const count = await this.getTodayCount() + 1
    const todayKey = this.getTodayKey()
    await instance.setItem(todayKey, count)
  }

  static async decreaseTodayCount() {
    const count = await this.getTodayCount() - 1
    const todayKey = this.getTodayKey()
    await instance.setItem(todayKey, count)
  }

  static async resetTodayCount() {
    const todayKey = this.getTodayKey()
    await instance.setItem(todayKey, 0)
  }

  static async setTodayCount(count: number) {
    const todayKey = this.getTodayKey()
    await instance.setItem(todayKey, count)
  }
}
