import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import _ from 'lodash'

import ReduxService from 'Services/ReduxService'
import App from 'Containers/App'

const rootElement = document.getElementById('root')

ReactDom.render(
  <Provider store={ReduxService.getStore()}>
    <App />
  </Provider>, 
  rootElement,
)
