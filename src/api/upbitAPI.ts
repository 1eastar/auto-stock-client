import client from './lib/client'
import {
  GetDWMCandleActionPayload,
  GetMinuteCandleActionPayload,
} from '../redux/actions/upbitActions'

// NOTE: get Days, Weeks, Months Candle
export function getDWMCandle({
  DWM = 'days',
  market = 'KRW-BTC',
  count,
  to,
  convertingPriceUnit,
}: GetDWMCandleActionPayload) {
  return client.getFromUpbit(`/v1/candles/${DWM}?count=${count}&market=${market}`)
}

export function getMinuteCandle({
  unit,
  market = 'KRW-BTC',
  count,
  to,
}: GetMinuteCandleActionPayload) {
  return client.getFromUpbit(`/v1/candles/minutes/${unit}?count=${count}&market=${market}`)
}
