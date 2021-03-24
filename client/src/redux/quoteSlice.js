import { createSlice } from '@reduxjs/toolkit'

const quoteSlice = createSlice({
  name: 'quote',
  initialState: {
    randomQuote: null,
  },
  reducers: {
    setQuote(state, action) {
      state.randomQuote = action.payload
    },
    fetchQuote(state) {},
  },
})

export default quoteSlice.reducer

export const { setQuote, fetchQuote } = quoteSlice.actions
