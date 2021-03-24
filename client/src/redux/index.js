import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { rootWatcher } from '../saga'
import quoteSlice from './quoteSlice'

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
  quote: quoteSlice,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
})

sagaMiddleware.run(rootWatcher)
