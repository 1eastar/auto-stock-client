import { combineReducers } from 'redux'

import upbitReducer from './upbitReducer'

const rootReducer = combineReducers({
  upbitReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer