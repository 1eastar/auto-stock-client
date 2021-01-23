import { takeLatest, put, fork, call, take } from 'redux-saga/effects'
import _ from 'lodash'

import AT from '../../constants/ActionTypes'
import UpbitActions from '../actions/upbitActions'
import SocketService from '../../services/SocketService'
import { createWebSocketMessageChannel } from '../../utils/WebSocketUtils'

function* watchRealTimeDataSaga() {
  const channel = yield call(createWebSocketMessageChannel)

  while (true) {
    try {
      const payload = yield take(channel)

      yield put(UpbitActions.receivedTickerData(payload))
    } catch (e) { /* Empty handler. */ }
  }
}

function* watchtestSaga() {
  if (!SocketService.isConnected()) {
    SocketService.connect()

    yield fork(watchRealTimeDataSaga)
  }
}

export default function* watchWebSocketSaga() {
  yield takeLatest(AT.CONNECT_WEB_SOCKET, watchtestSaga)
}
