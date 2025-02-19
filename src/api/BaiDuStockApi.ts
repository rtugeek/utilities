import type { StockModel } from '@/model/StockModel'
import axios from 'axios'

export class BaiDuStockApi {
  static async getStockPrice(symbol: string): Promise<StockModel | undefined> {
    try {
      const response = await axios.get(`https://finance.pae.baidu.com/selfselect/sug?wd=${symbol}&skip_login=1&finClientType=pc}`)
      const data = response.data as BaiDuApiResponse<StockResult>
      if (data.ResultCode == '0' && data.Result.stock.length > 0) {
        const stock = data.Result.stock[0]
        if (stock) {
          return {
            symbol,
            price: stock.price,
            change: stock.ratio,
            changeArrow: stock.status == '1' ? 'up' : 'down',
            name: stock.name,
          } as StockModel
        }
      }
      else {
        console.error(`Error fetching stock data for ${symbol}`)
      }
    }
    catch (e) {
      console.error(e)
    }
    return undefined
  }
}

export interface Stock {
  code: string
  type: string
  market: string
  follow_status: string
  amount: string
  exchange: string
  name: string
  price: string
  increase: string
  ratio: string
  amplitudeRatio: string
  turnoverRatio: string
  holdingAmount: string
  volume: string
  capitalization: string
  stockStatus: string
  peRate: string
  pbRate: string
  /**
   * 1: 涨
   * -1: 跌
   */
  status: string
  stockStatusInfo: string
  src_loc: string
  subType: string
  sf_url: string
  pv: string
  CNYPrice: string
}

export interface LabelMap {
  text: string
  ename: string
}

export interface StockStatus {
  is_trend: string
  time_sort: string
}

export interface StockResult {
  stock: Stock[]
  index: any[]
  deal_status: string
  stock_status: StockStatus
  refresh_time: string
  labelMap: LabelMap[]
  isNew: string
  follow_num: string
}

export interface BaiDuApiResponse<T> {
  QueryID: string
  /**
   * 0代表正常
   */
  ResultCode: string
  Result: T
}
