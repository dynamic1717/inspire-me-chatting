import React from 'react'
import { Header } from './components/Header'
import NewChat from './components/NewChat'
import { Quotes } from './components/Quotes'

const App = () => {
  return (
    <>
      <Header />
      <Quotes />
      <NewChat />
    </>
  )
}

export default App
