import { spawn } from 'redux-saga/effects'

import upbitSaga from './upbitSaga'

export default function* rootSaga() {
  yield spawn(upbitSaga)
}