import { io } from 'socket.io-client'
import { v4 as UUID } from 'uuid'
import { autobind } from 'core-decorators'
import _ from 'lodash'

import WebSocketState from '../constants/WebSocketState'

const WS_BASE_URL = 'wss://api.upbit.com/websocket/v1'
const mockEmitData = JSON.stringify([{"ticket":"test"},{"type":"ticker","codes":["KRW-BTC"]}])

/* Native WebSocket code */
class SocketService {
  private socket: any = null

  @autobind
  private onConnect() {
    console.log('web socket is connected')
    this.socket.send(mockEmitData)
  }

  @autobind
  private onDisconnect() {
    console.log('web socket is closed')
    // setTimeout(() => {
    //   console.log('trade 재접속')
    //   this.connect()
    // }, 1000);
  }

  @autobind
  private onReceiveMessage(callback) {
    return (event) => {
      try {
        // var str = message.toString('utf-8')
        // var json = JSON.parse(str)
        var enc = new TextDecoder("utf-8")
        var arr = new Uint8Array(event.data)
        console.log('new message :', enc.decode(arr))
        callback(JSON.parse(enc.decode(arr)))
      } catch (e) {
          console.log('Error: ', e)
      }
    }
  }

  connect() {
    this.socket = new WebSocket(WS_BASE_URL)
    this.socket.binaryType = 'arraybuffer'

    this.socket.onopen = this.onConnect
    this.socket.onclose = this.onDisconnect
  }

  disconnect() {
    if (this.socket) {
      this.socket.close()
      this.socket = null
    }
  }

  send(data) {
    if (this.socket) {
      this.socket.send(data)
    }
  }

  setOnMessageHandler(handler) {
    if (this.socket && _.isFunction(handler)) {
      this.socket.onmessage = this.onReceiveMessage(handler)
    }
  }

  deleteOnMessageHandler() {
    if (this.socket) {
      this.socket.onmessage = null
    }
  }

  isConnected() {
    if (this.socket) {
      return this.socket.readyState === WebSocketState.OPEN
    }
  }
}

export default new SocketService()

/* 
 * socket.io-client 코드 
 * socket.io-client package는 uri path에 trailing slash가 붙게 됨.
 * upbit에서 제공하는 end point는 trailing slash가 붙은 경우에 대한 처리가 되어있지 않아 404 에러가 뜸
 * 따라서 socket.io-client package에서 optional trailing slash를 제공하지 않는 한 사용할 수 없음.
 */

// const RECONNECTION_DELAY = 5 * 1000

// const WS_BASE_URL = 'wss://api.upbit.com'
// const WS_BASE_PATH = '/websocket/v1'

// const mockEmitData = JSON.stringify([{"ticket":"test"},{"type":"ticker","codes":["KRW-BTC"]}])

// class SocketService {
//   private socket: any = null

//   private forceDisconnect: boolean = false

//   private connecting: boolean = false

//   @autobind
//   private onConnect() {
//     this.connecting = false
//     this.forceDisconnect = false
//     // this.clearTimeId()
//     // this.resetAttempts()
//   }

//   @autobind
//   private onReconnect() {
//     this.forceDisconnect = false
//     // this.clearTimeId()
//     // this.resetAttempts()
//   }

//   @autobind
//   private onDisconnect() {
//     if (!this.forceDisconnect && this.socket) {
//       // this.openSocket()
//     }
//   }

//   isConnected() {
//     return this.socket && this.socket.connected
//   }

//   isConnecting() {
//     return this.socket && this.connecting
//   }

//   @autobind
//   emit(event, payload) {
//     if (this.socket) {
//       this.socket.emit(event, payload)
//     }
//   }

//   connect() {
//     /**
//      * Socket 인스턴스 생성
//      */
//     this.socket = io(WS_BASE_URL, {
//       path: WS_BASE_PATH,
//       transports: ['websocket'],
//       upgrade: true,
//       reconnectionDelay: RECONNECTION_DELAY,
//       reconnectionDelayMax: RECONNECTION_DELAY * 2,
//     })

//     /**
//      * Socket 이벤트 바인딩
//      */
//     this.socket.on('connect', this.onConnect)
//     this.socket.on('reconnect', this.onReconnect)
//     this.socket.on('disconnect', this.onDisconnect)
//     this.socket.on('message', (message) => console.log(message))

//     this.socket.send(mockEmitData)
//   }

//   disconnect(conf = { forceDisconnect: false }) {
//     if (!this.forceDisconnect && this.isConnecting()) {
//       return
//     }

//     if (this.isConnected()) {
//       this.forceDisconnect = conf.forceDisconnect
//       if (conf.forceDisconnect) {
//         this.socket.removeAllListeners()
//       }
//       this.socket.disconnect()
//     }
//   }

//   @autobind
//   reconnect() {
//     if (!this.isConnected() && !this.forceDisconnect && !this.isConnecting() && this.socket) {
//       this.handleSocketOpen()
//     }
//   }

//   @autobind
//   handleSocketOpen() {
//     /**
//      * Socket 내부 상태를 관리하기 위한 상태 초기화.
//      */
//     this.connecting = true
//     this.forceDisconnect = false

//     /**
//      * Socket open 시도
//      */
//     this.socket.open()
//   }

//   on(event, callback) {
//     if (this.socket && _.isFunction(callback)) {
//       this.socket.on(event, callback)
//     }
//   }

//   off(event, callback) {
//     if (this.socket && _.isFunction(callback)) {
//       this.socket.off(event, callback)
//     }
//   }
// }

// export default new SocketService()
