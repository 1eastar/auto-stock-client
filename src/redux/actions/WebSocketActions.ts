import AT from '../../constants/ActionTypes'
import { actionCreator, actionCreatorWithPromise } from '../../utils/ReduxUtils'
import { MainAction } from '../../types/Redux'

interface ConnectWebSocketActionPayload {
  messageCallback: (data: any) => void
}

export default {
  connectWebSocket: actionCreator<ConnectWebSocketActionPayload>(AT.CONNECT_WEB_SOCKET),
  disconnectWebSocket: actionCreator(AT.DISCONNECT_WEB_SOCKET),
}
