import dayjs from 'dayjs'

export interface IWaterReminderConfig {
  targetCup: number
  interval: number
  lastReminderAt: string
  enableReminder: boolean
}

export const DEFAULT_WATER_REMINDER_CONFIG: IWaterReminderConfig = {
  enableReminder: true,
  interval: 30,
  targetCup: 8,
  lastReminderAt: dayjs().toISOString(),
}
