import AT from '../../constants/ActionTypes'
import { actionCreator, actionCreatorWithPromise } from '../../utils/ReduxUtils'
import { MainAction } from '../../types/Redux'

export default {
  connectWebSocket: actionCreator(AT.CONNECT_WEB_SOCKET),
  disconnectWebSocket: actionCreator(AT.DISCONNECT_WEB_SOCKET),
}
