import React from 'react'
import Main from './src/Main'
import { StatusBar } from 'expo-status-bar'
import UserContext from './src/contexts/UserContext'
import WordContext from './src/contexts/WordContext'

export default () => {
  return (
    <UserContext>
      <WordContext>
        <Main />
        <StatusBar style='auto' />
      </WordContext>
    </UserContext>
  )
}
