import AT from '../../constants/ActionTypes'
import { actionCreator, actionCreatorWithPromise } from '../../utils/ReduxUtils'
import { MainAction } from '../../types/Redux'
import UpbitTicker from '../../models/UpbitTicker'

export type Period = 'days' | 'weeks' | 'months'

export interface GetDWMCandleActionPayload {
  DWM: Period
  market?: string
  to?: string
  count?: number
  convertingPriceUnit?: string
}

export interface GetMinuteCandleActionPayload {
  unit: number
  market?: string
  to?: string
  count?: number
}

export interface ReceivedTickerActionPayload {
  payload: UpbitTicker
}

export interface GetDWMCandleAction extends MainAction<string, GetDWMCandleActionPayload> {}
export interface GetMinuteCandleAction extends MainAction<string, GetMinuteCandleActionPayload> {}

export default {
  requestGetDWMCandle: actionCreatorWithPromise<GetDWMCandleActionPayload>(AT.REQUEST_GET_UPBIT_DWM_CANDLE),
  requestGetDWMCandleSuccess: actionCreator(AT.REQUEST_GET_UPBIT_DWM_CANDLE_SUCCESS),
  requestGetDWMCandleError: actionCreator(AT.REQUEST_GET_UPBIT_DWM_CANDLE_ERROR),

  requestGetMinuteCandle: actionCreatorWithPromise<GetMinuteCandleActionPayload>(AT.REQUEST_GET_UPBIT_MINUTE_CANDLE),
  requestGetMinuteCandleSuccess: actionCreator(AT.REQUEST_GET_UPBIT_MINUTE_CANDLE_SUCCESS),
  requestGetMinuteCandleError: actionCreator(AT.REQUEST_GET_UPBIT_MINUTE_CANDLE_ERROR),

  receivedTickerData: actionCreator<ReceivedTickerActionPayload>(AT.RECEIVED_TICKER_DATA),
}
