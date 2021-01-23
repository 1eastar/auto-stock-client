import { eventChannel } from 'redux-saga'

import SocketService from 'Services/SocketService'

/*
 * socket.io-client package를 위한 유틸리티 함수였지만 해당 패키지를 사용할 수 없게 되어
 * 제너럴한 함수가 아닌 onmessage만을 위한 함수로 사용
 * 추후 마이그레이션 시 수정 필요
 * (socket.io-client 사용 불가능한 이유 => SocketService.ts 참고)
 */
export function createWebSocketMessageChannel() {
  return eventChannel(emit => {
    const emitter = (event) => emit(event)
    SocketService.setOnMessageHandler(emitter)

    return function unsubscribe() {
      SocketService.deleteOnMessageHandler()
    }
  })
}
