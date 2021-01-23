/* External Dependencies */
import { Store, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { enableBatching } from 'redux-batched-actions'
import compose from 'lodash/fp/compose'

/* Internal Dependencies */
import actionLifecycles from 'Redux/middleWares/actionLifecycles'
import rootSaga from 'Redux/sagas'
import rootReducer from 'Redux/reducers'

class ReduxService {
  private store: Store

  constructor() {
    const sagaMiddleware = createSagaMiddleware()
    // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }) || compose
    const composeEnhancers = compose

    this.store = createStore(
      enableBatching(rootReducer),
      compose(
        composeEnhancers(
          applyMiddleware(
            actionLifecycles,
            sagaMiddleware,
          ),
        ),
      ),
    )

    sagaMiddleware.run(rootSaga)
  }

  addStoreListener(selector, callback) {
    return (() => {
      let prevState = null
      const handleChange = () => {
        const nextState = selector(this.getState())
        if (nextState !== prevState) {
          prevState = nextState
          callback(nextState)
        }
      }
      handleChange()
      const unSubscribe = this.getStore().subscribe(handleChange)
      return unSubscribe
    })()
  }

  getStore() {
    return this.store
  }

  dispatch(action) {
    return this.store.dispatch(action)
  }

  getState() {
    return this.store.getState()
  }
}

export default new ReduxService()
