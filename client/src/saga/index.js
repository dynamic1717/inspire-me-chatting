import { all } from 'redux-saga/effects'
import { quoteWatcher } from './quoteSaga'

export function* rootWatcher() {
  yield all([quoteWatcher()])
}
