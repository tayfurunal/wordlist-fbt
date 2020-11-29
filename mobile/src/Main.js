import React, { useContext, useEffect, useState } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { UserContext, UserDispatchContext } from './contexts/UserContext'
import AsyncStorage from '@react-native-community/async-storage'

import Login from './components/Login'
import List from './components/List'

export default () => {
  const userDispatch = useContext(UserDispatchContext)
  const user = useContext(UserContext)
  const [fetchingUser, setFetchingUser] = useState(true)

  useEffect(() => {
    AsyncStorage.getItem('@user')
      .then(u => {
        userDispatch(JSON.parse(u))
      })
      .catch(err => console.log(err))
      .finally(() => {
        setFetchingUser(false)
      })
  }, [])

  return fetchingUser ? (
    <View style={styles.container}>
      <ActivityIndicator color='purple' size='large' />
    </View>
  ) : user ? (
    <List />
  ) : (
    <Login />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
