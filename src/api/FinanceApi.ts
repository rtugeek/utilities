export type CurrencyCode = 'CNY' | 'USD' | 'JPY' | 'EUR' | 'KRW' | 'AUD' | 'HKD' | 'PHP' | 'MYR' | 'SGD' | 'THB' | 'VND' | 'IDR'

export interface CurrencyInfo {
  code: CurrencyCode
  name: string
  sortName?: string
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

export const SoutheastAsiaCurrencyMapping = [
  {
    code: 'PHP',
    name: '菲律宾比索',
    flag: 'https://assets.msn.cn/weathermapdata/1/static/finance/taskbar/countryflag/php.svg',
    symbol: '₱',
    sortName: '比索',
  },
  {
    code: 'SGD',
    name: '新加坡元',
    flag: 'https://assets.msn.cn/weathermapdata/1/static/finance/taskbar/countryflag/sgd.svg',
    symbol: 'S$',
  },
  {
    code: 'MYR',
    name: '马来西亚林吉特',
    flag: 'https://assets.msn.cn/weathermapdata/1/static/finance/taskbar/countryflag/myr.svg',
    symbol: 'RM',
    sortName: '林吉特',
  },
  {
    code: 'THB',
    name: '泰铢',
    flag: 'https://assets.msn.cn/weathermapdata/1/static/finance/taskbar/countryflag/thb.svg',
    symbol: '฿',
  },
  {
    code: 'VND',
    name: '越南盾',
    flag: 'https://assets.msn.cn/weathermapdata/1/static/finance/taskbar/countryflag/vnd.svg',
    symbol: '₫',
  },
  {
    code: 'IDR',
    name: '印尼盾',
    flag: 'https://assets.msn.cn/weathermapdata/1/static/finance/taskbar/countryflag/idr.svg',
    symbol: 'Rp',
  },
]

export const PopularCurrencyMapping: CurrencyInfo[] = [
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
    symbol: 'A$',
  },
]

export const CurrencyMapping: CurrencyInfo[] = [
  ...PopularCurrencyMapping,
  ...SoutheastAsiaCurrencyMapping,
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
