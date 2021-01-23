import Immutable from 'immutable'

interface UpbitTickerPOJO {
  acc_ask_volume: number
  acc_bid_volume: number
  acc_trade_price: number
  acc_trade_price_24h: number
  acc_trade_volume: number
  acc_trade_volume_24h: number
  ask_bid: string
  change: 'RISE' | 'EVEN' | 'FALL'
  change_price: number
  change_rate: number
  code: string
  delisting_date: string | null
  high_price: number
  highest_52_week_date: string
  highest_52_week_price: number
  is_trading_suspended: boolean
  low_price: number
  lowest_52_week_date: string
  lowest_52_week_price: number
  market_state: 'ACTIVE' | 'PREVIEW' | 'DELISTED'
  market_state_for_ios: string | null
  market_warning: 'NONE' | 'CAUTION'
  opening_price: number
  prev_closing_price: number
  signed_change_price: number
  signed_change_rate: number
  stream_type: 'REALTIME' | 'SNAPSHOT'
  timestamp: number
  trade_date: string
  trade_price: number
  trade_status: string | null
  trade_time: string
  trade_timestamp: number
  trade_volume: number
  type: string
}

interface UpbitTickerAttr extends UpbitTickerPOJO {}

const UpbitTickerRecord = Immutable.Record<UpbitTickerAttr>({
  acc_ask_volume: 0,
  acc_bid_volume: 0,
  acc_trade_price: 0,
  acc_trade_price_24h: 0,
  acc_trade_volume: 0,
  acc_trade_volume_24h: 0,
  ask_bid: '',
  change: 'EVEN',
  change_price: 0,
  change_rate: 0,
  code: 'KRW-BTC',
  delisting_date: null,
  high_price: 0,
  highest_52_week_date: '',
  highest_52_week_price: 0,
  is_trading_suspended: false,
  low_price: 0,
  lowest_52_week_date: '',
  lowest_52_week_price: 0,
  market_state: 'ACTIVE',
  market_state_for_ios: null,
  market_warning: 'NONE',
  opening_price: 0,
  prev_closing_price: 0,
  signed_change_price: 0,
  signed_change_rate: 0,
  stream_type: 'REALTIME',
  timestamp: 0,
  trade_date: '',
  trade_price: 0,
  trade_status: null,
  trade_time: '',
  trade_timestamp: 0,
  trade_volume: 0,
  type: 'ticker',
})

class UpbitTicker extends UpbitTickerRecord {
  constructor(args: any = {}) {
    super(args)
  }
}

export default UpbitTicker
