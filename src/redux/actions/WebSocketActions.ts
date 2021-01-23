import AT from '../../constants/ActionTypes'
import { actionCreator, actionCreatorWithPromise } from 'Utils/ReduxUtils'

export default {
  connectWebSocket: actionCreator(AT.CONNECT_WEB_SOCKET),
  disconnectWebSocket: actionCreator(AT.DISCONNECT_WEB_SOCKET),
}
