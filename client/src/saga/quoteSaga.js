import { call, put, takeEvery } from 'redux-saga/effects'
import { fetchQuote, setQuote } from '../redux/quoteSlice'

const fetchQuoteFromApi = () => fetch('https://type.fit/api/quotes')

function* fetchQuoteWorker() {
  const data = yield call(fetchQuoteFromApi)
  const json = yield call(() => new Promise((res) => res(data.json())))
  const randomNum = yield Math.floor(Math.random() * (json.length - 1))
  yield put(setQuote(json[randomNum]))
}

export function* quoteWatcher() {
  yield takeEvery(fetchQuote.type, fetchQuoteWorker)
}
