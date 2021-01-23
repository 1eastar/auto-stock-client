import { createSelector } from 'reselect'

import { RootState } from 'Redux/reducers'

const isFetching = (state: RootState) => state.upbitReducer.isFetching

const hasError = (state: RootState) => state.upbitReducer.hasError

const tickers = (state: RootState) => state.upbitReducer.tickers

export default {
  isFetching,
  hasError,
  tickers,
}
