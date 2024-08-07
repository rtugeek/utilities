export type CurrencyCode = 'CNY' | 'USD' | 'JPY' | 'EUR' | 'KRW' | 'AUD' | 'HKD'

export interface CurrencyInfo {
  code: CurrencyCode
  name: string
  symbol: string
  flag: string
}

export const CNY: CurrencyInfo = {
  code: 'CNY',
  name: '人民币',
  symbol: '¥',
  flag: 'https://assets.msn.cn/weathermapdata/1/static/finance/taskbar/countryflag/cn.svg',
}
export const USD: CurrencyInfo = {
  code: 'USD',
  name: '美元',
  symbol: '$',
  flag: 'https://assets.msn.cn/weathermapdata/1/static/finance/taskbar/countryflag/us.svg',
}
export const CurrencyMapping: CurrencyInfo[] = [
  CNY,
  USD,
  {
    code: 'JPY',
    name: '日元',
    symbol: '¥',
    flag: 'https://assets.msn.cn/weathermapdata/1/static/finance/taskbar/countryflag/jp.svg',
  },
  {
    code: 'EUR',
    name: '欧元',
    symbol: '€',
    flag: 'https://assets.msn.cn/weathermapdata/1/static/finance/taskbar/countryflag/eu.svg',
  },
  {
    code: 'HKD',
    name: '港币',
    symbol: '$',
    flag: 'https://assets.msn.cn/weathermapdata/1/static/finance/taskbar/countryflag/hk.svg',
  },
  {
    code: 'KRW',
    name: '韩元',
    symbol: '₩',
    flag: 'https://assets.msn.cn/weathermapdata/1/static/finance/taskbar/countryflag/kr.svg',
  },
  {
    code: 'AUD',
    name: '澳元',
    flag: 'https://assets.msn.cn/weathermapdata/1/static/finance/taskbar/countryflag/au.svg',
    symbol: '$',
  },
]

export class FinanceApi {
  static async getForexRates(from: CurrencyCode, to: CurrencyCode): Promise<FinanceResult<GetRevForeignDataResult>> {
    const response = await fetch(`https://finance.pae.baidu.com/api/getrevforeigndata?query=${to}${from}&finClientType=pc`)
    return await response.json()
  }
}

export interface FinanceResult<T> {
  /**
   * 0代表正常
   */
  ResultCode: string
  Result: T
}
export interface GetRevForeignDataResult {
  revCode: ForexRate[]
  corrCode: any
}

export interface ForexRate {
  code: string
  name: string
  market: string
  ratio: string
  price: string
  increase: string
  status: string
  list: Array<{
    text: string
    value: string
  }>
  icon1: string
  icon2: string
}
