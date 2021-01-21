import { createSelector } from 'reselect'

import { RootState } from '../reducers'

const isFetching = (state: RootState) => state.upbitReducer.isFetching

const hasError = (state: RootState) => state.upbitReducer.hasError

const candle = (state: RootState) => state.upbitReducer.candle

export default {
  isFetching,
  hasError,
  candle,
}
