import React, { createContext, useState } from 'react'

const WordContext = createContext()
const WordDispatchContext = createContext()

export default ({ children }) => {
  const [words, setWords] = useState([])
  return (
    <WordContext.Provider value={words}>
      <WordDispatchContext.Provider value={setWords}>
        {children}
      </WordDispatchContext.Provider>
    </WordContext.Provider>
  )
}

export { WordContext, WordDispatchContext }
