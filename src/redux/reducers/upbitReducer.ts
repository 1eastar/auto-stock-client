import Immutable from 'immutable'
import _ from 'lodash'

import AT from '../../constants/ActionTypes'
import UpbitTicker from '../../models/UpbitTicker'

interface UpbitReducerState {
  isFetching: boolean
  hasError: boolean
  tickers: Immutable.OrderedMap<string, UpbitTicker>
  candle: any
}

const upbitReducerInitialState: UpbitReducerState = {
  isFetching: false,
  hasError: false,
  tickers: Immutable.OrderedMap(),
  candle: [],
}

export default (state = upbitReducerInitialState, action): UpbitReducerState => {
  switch(action.type) {
    case AT.REQUEST_GET_UPBIT_MINUTE_CANDLE:
    case AT.REQUEST_GET_UPBIT_DWM_CANDLE:
      return {
        ...state,
        isFetching: true,
      }

    case AT.REQUEST_GET_UPBIT_MINUTE_CANDLE_SUCCESS:
    case AT.REQUEST_GET_UPBIT_DWM_CANDLE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        hasError: false,
        candle: _.get(action, 'payload', []),
      }

    case AT.REQUEST_GET_UPBIT_MINUTE_CANDLE_ERROR:
    case AT.REQUEST_GET_UPBIT_DWM_CANDLE_ERROR:
      return {
        ...state,
        isFetching: false,
        hasError: true,
      }

    case AT.RECEIVED_TICKER_DATA:
      return {
        ...state,
        tickers: state.tickers.withMutations((map) => {
          const ticker = _.get(action, 'payload', {})
          if (_.has(ticker, 'timestamp')) {
            map.set(ticker.timestamp.toString(), ticker)
          }
        })
      }
    
    default:
      return upbitReducerInitialState
  }
}