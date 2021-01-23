import { takeLatest, put, fork, call, take } from 'redux-saga/effects'
import _ from 'lodash'

import AT from 'Constants/ActionTypes'
import UpbitActions from 'Redux/actions/upbitActions'
import SocketService from 'Services/SocketService'
import { createWebSocketMessageChannel } from 'Utils/WebSocketUtils'

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
