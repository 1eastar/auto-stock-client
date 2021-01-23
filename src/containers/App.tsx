import React, { useCallback, useState, useMemo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'

import upbitSelector from 'Redux/selectors/upbitSelector'
import upbitActions, { Period } from 'Redux/actions/upbitActions'
import WebSocketActions from 'Redux/actions/WebSocketActions'
import SocketService from 'Services/SocketService'

type candleTypes = 'minute' | 'DWM'

type requestType = 'api' | 'socket'

function App() {
  const dispatch = useDispatch()

  const [candleType, setCandleType] = useState<candleTypes>('minute')
  const [DWM, setDWM] = useState<Period>('days')
  const [unit, setUnit] = useState<number>(1)
  const [market, setMarket] = useState<string>('')
  const [count, setCount] = useState<number>(1)
  const [requestType, setRequestType] = useState<requestType>('api')

  const isLoading = useSelector(upbitSelector.isFetching)
  const tickerList = useSelector(upbitSelector.tickers)

  useEffect(() => {
    if (requestType === 'socket') {
      dispatch(WebSocketActions.connectWebSocket())
    } else {
      SocketService.disconnect()
    }
    return () => { SocketService.disconnect() }
  }, [dispatch, requestType, WebSocketActions])

  const handleInputChange = useCallback((e) => {
    switch(e.target.name) {
      case 'unit': return setUnit(e.target.value)
      case 'market': return setMarket(e.target.value)
      case 'count': return setCount(e.target.value)
      default: return null
    }
  }, [])

  const handleClick = useCallback(() => {
    const payload = (() => {
      const tmp = { count }
      if (candleType === 'minute') { _.set(tmp, 'unit', unit) }
      else { _.set(tmp, 'DWM', DWM) }
      if (!_.isEmpty(market)) { _.set(tmp, 'market', market) }
      return tmp
    })()

    const action = (candleType === 'minute') ? upbitActions.requestGetMinuteCandle : upbitActions.requestGetDWMCandle
    dispatch(action(payload))
      .promise
      .then((res) => {
        console.log(res)
      })
  }, [dispatch, DWM, count, market, candleType])

  const headerColumn = useMemo(() => {
    if (tickerList.toArray().length === 0) { return null }

    return Object.keys(tickerList.toArray()[0][1])
  }, [tickerList])
  // TODO: 데이터 확인을 위한 임시 코드, 추후 리팩토링 필요
  return (
    <div>
      <h3>UPBIT stock data test</h3>
      {(requestType === 'api') ? (
        <span onClick={() => setRequestType('socket')} style={{ marginLeft: 30 }}>websocket realtime data</span>
      ) : (
        <span onClick={() => setRequestType('api')} style={{ marginLeft: 30 }}>rest api data</span>
      ) }
      <div>
        <span onClick={() => setCandleType('minute')}>Minute Candle |</span>
        <span onClick={() => setCandleType('DWM')}>| DWM Candle</span>
      </div>
      <br/>
      { (candleType === 'DWM') ? (
        <div>
          <label><input type="checkbox" name="days" onClick={() => setDWM('days')}/> days</label>
          <label><input type="checkbox" name="weeks" onClick={() => setDWM('weeks')}/> weeks</label>
          <label><input type="checkbox" name="months" onClick={() => setDWM('months')}/> months</label>
        </div>
      ) : (
        <div>
          <span>Unit: </span>
          <input
            name='unit'
            onChange={handleInputChange}
            value={unit}
            disabled={isLoading}
            placeholder='set unit'
          />
        </div>
      ) }
      <div>
        <span>Market: </span>
        <input
          name='market'
          onChange={handleInputChange}
          value={market}
          disabled={isLoading}
          placeholder='set market'
        />
      </div>
      <div>
        <span>Count: </span>
        <input
          name='count'
          onChange={handleInputChange}
          value={count}
          disabled={isLoading}
          placeholder='set count'
        />
      </div>

      <button
        disabled={isLoading}
        onClick={handleClick}
      >
        get {candleType === 'minute' ? 'Minute Candle' : 'DWM Candle'} data
      </button>

      <hr/>
      { (tickerList.toArray().length !== 0) && (
        <table>
          <thead>
            <tr style={{fontSize: 11, fontWeight: 400}}>
              { headerColumn?.map((col, i) => (
                <th key={i}>{ col }</th>
              )) }
            </tr>
          </thead>
          <tbody>
            { tickerList.toArray().map((tickerKVArray, i) => {
              const rowValues = Object.values(tickerKVArray[1])
              return (
                <tr key={i} style={{fontSize: 11, fontWeight: 400}}>
                  { rowValues.map((v, i) => (
                    <th key={i}>{ v }</th>
                  )) }
                </tr>
              )
            }) }
          </tbody>
        </table>
      ) }
    </div>
  )
}

export default App
