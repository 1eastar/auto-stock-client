import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import _ from 'lodash'

import App from './containers/App'
import ReduxService from './services/ReduxService'

const rootElement = document.getElementById('root')

ReactDom.render(
  <Provider store={ReduxService.getStore()}>
    <App />
  </Provider>, 
  rootElement,
)
