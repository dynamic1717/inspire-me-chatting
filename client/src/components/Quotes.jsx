import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchQuote } from '../redux/quoteSlice'

export const Quotes = () => {
  const { randomQuote } = useSelector((state) => state.quote)
  const dispatch = useDispatch()

  const handleChangeQuote = () => {
    dispatch(fetchQuote())
  }

  useEffect(() => {
    dispatch(fetchQuote())
  }, [dispatch])

  if (!randomQuote) {
    return (
      <div className='quote'>
        <div className='quote__wrapper'>
          <h4 className='quote__text'>Loading...</h4>
        </div>
      </div>
    )
  }

  return (
    <div className='quote'>
      <div className='quote__wrapper'>
        <h4 className='quote__text'>{randomQuote.text}</h4>
        <p className='quote__author'>{randomQuote.author}</p>
        <button className='quote__btn' onClick={handleChangeQuote}>
          click here to get another quote
        </button>
      </div>
    </div>
  )
}
