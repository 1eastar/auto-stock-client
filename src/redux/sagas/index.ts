import { spawn } from 'redux-saga/effects'

import upbitSaga from './upbitSaga'
import WebSocketSaga from './WebSocketSaga'

export default function* rootSaga() {
  yield spawn(upbitSaga)
  yield spawn(WebSocketSaga)
}