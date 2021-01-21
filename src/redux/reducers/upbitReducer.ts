import Immutable from 'immutable'
import _ from 'lodash'

import AT from '../../constants/ActionTypes'

interface UpbitReducerState {
  isFetching: boolean
  hasError: boolean
  candle: any
}

const upbitReducerInitialState: UpbitReducerState = {
  isFetching: false,
  hasError: false,
  candle: []
}

export default (state = upbitReducerInitialState, action): UpbitReducerState => {
  switch(action.type) {
    case AT.REQUEST_GET_UPBIT_DWM_CANDLE:
      return {
        ...state,
        isFetching: true,
      }

    case AT.REQUEST_GET_UPBIT_DWM_CANDLE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        hasError: false,
        candle: _.get(action, 'payload', []),
      }

    case AT.REQUEST_GET_UPBIT_DWM_CANDLE_ERROR:
      return {
        ...state,
        isFetching: false,
        hasError: true,
      }
    
    default:
      return upbitReducerInitialState
  }
}