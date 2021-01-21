import { all, takeLatest, takeEvery, call, put } from 'redux-saga/effects'
import { v4 as UUID } from 'uuid'

import AT from '../../constants/ActionTypes'
import upbitActions, {
  GetDWMCandleAction,
  GetMinuteCandleAction,
} from '../actions/upbitActions'
import {
  getDWMCandle,
  getMinuteCandle,
} from '../../api/upbitAPI'

function* getDWMCandleSaga({ uuid, payload }: GetDWMCandleAction) {
  try {
    const result = yield call(getDWMCandle, payload)
    yield put(upbitActions.requestGetDWMCandleSuccess(result, { uuid }))
  } catch (error) {
    yield put(upbitActions.requestGetDWMCandleError(error, { uuid }))
  }
}

function* getMinuteCandleSaga({ uuid, payload }: GetMinuteCandleAction) {
  try {
    const result = yield call(getMinuteCandle, payload)
    yield put(upbitActions.requestGetMinuteCandleSuccess(result, { uuid }))
  } catch (error) {
    yield put(upbitActions.requestGetMinuteCandleError(error, { uuid }))
  }
}

export default function* watchUpbitSaga() {
  yield all([
    takeLatest(AT.REQUEST_GET_UPBIT_DWM_CANDLE, getDWMCandleSaga),
    takeLatest(AT.REQUEST_GET_UPBIT_MINUTE_CANDLE, getMinuteCandleSaga),
  ])
}