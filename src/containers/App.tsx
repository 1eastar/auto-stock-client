import React, { useCallback, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'

import upbitSelector from '../redux/selectors/upbitSelector'
import upbitActions, { Period } from '../redux/actions/upbitActions'

type candleTypes = 'minute' | 'DWM'

function App() {
  const dispatch = useDispatch()

  const [candleType, setCandleType] = useState<candleTypes>('minute')
  const [DWM, setDWM] = useState<Period>('days')
  const [unit, setUnit] = useState<number>(1)
  const [market, setMarket] = useState<string>('')
  const [count, setCount] = useState<number>(1)
  const [candleList, setCandleList] = useState([])

  const isLoading = useSelector(upbitSelector.isFetching)

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
        setCandleList(res.payload)
      })
  }, [dispatch, DWM, count, market, candleType])

  const headerColumn = useMemo(() => {
    if (_.isEmpty(candleList)) { return }

    return Object.keys(candleList[0])
  }, [candleList])

  // TODO: 데이터 확인을 위한 임시 코드, 추후 리팩토링 필요
  return (
    <div>
      <h3>UPBIT stock data test</h3>
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
      { !!(candleList) && (
        <table>
          <thead>
            <tr style={{fontSize: 11, fontWeight: 400}}>
              { headerColumn?.map((col, i) => (
                <th key={i}>{ col }</th>
              )) }
            </tr>
          </thead>
          <tbody>
            { candleList.map((candle, i) => {
              const rowValues = Object.values<string>(candle)
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
