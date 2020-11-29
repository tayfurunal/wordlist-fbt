import React, { useContext, useEffect, useState } from 'react'
import {
  StyleSheet,
  TouchableHighlight,
  View,
  ScrollView,
  ActivityIndicator,
  Text
} from 'react-native'
import { UserContext, UserDispatchContext } from '../contexts/UserContext'
import { WordContext, WordDispatchContext } from '../contexts/WordContext'
import { AntDesign } from '@expo/vector-icons'
import Consts from 'expo-constants'
import api from '../api'
import WordCard from './WordCard'
import AddWordModal from './AddWordModal'
import AsyncStorage from '@react-native-community/async-storage'

export default () => {
  const user = useContext(UserContext)
  const userDispatch = useContext(UserDispatchContext)
  const words = useContext(WordContext)
  const wordDispatch = useContext(WordDispatchContext)
  const [showAddWordModal, setShowAddWordModal] = useState(false)
  const [wordsLoading, setWordsLoading] = useState(false)

  useEffect(() => {
    setWordsLoading(true)
    api
      .get(`/posts/${user.username}`)
      .then(res => {
        wordDispatch(res.data)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setWordsLoading(false)
      })
  }, [])

  const handleLogout = () => {
    AsyncStorage.removeItem('@user').then(() => {
      userDispatch(null)
    })
  }

  return (
    <View style={styles.container(wordsLoading)}>
      {wordsLoading ? (
        <ActivityIndicator color='purple' size='large' />
      ) : (
        <React.Fragment>
          <View style={styles.userField}>
            <Text style={styles.username}>
              Welcome {user.username}, you have {words.length}{' '}
              {words.length === 1 ? 'word' : 'words'}!
            </Text>
            <AntDesign
              color='purple'
              size={15}
              name='logout'
              style={styles.logout}
              onPress={handleLogout}
            />
          </View>
          <ScrollView
            contentContainerStyle={{ paddingBottom: 90 }}
            showsVerticalScrollIndicator={false}>
            {words.map(word => {
              return <WordCard word={word} key={word._id} />
            })}
          </ScrollView>
        </React.Fragment>
      )}
      {showAddWordModal && (
        <AddWordModal setShowAddWordModal={setShowAddWordModal} />
      )}
      <TouchableHighlight
        style={styles.addButton}
        onPress={e => {
          setShowAddWordModal(true)
        }}>
        <AntDesign size={28} name='plus' color='#f9f9f9' />
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  container: wordsLoading => {
    let base = {
      flex: 1,
      backgroundColor: '#f9f9f9',
      marginTop: Consts.statusBarHeight
    }
    if (wordsLoading)
      base = StyleSheet.flatten([
        base,
        {
          justifyContent: 'center',
          alignItems: 'center'
        }
      ])
    return base
  },
  addButton: {
    position: 'absolute',
    right: 25,
    bottom: 25,
    backgroundColor: 'purple',
    borderRadius: 30,
    padding: 10
  },
  username: {
    color: '#f9f6f2',
    flex: 1
  },
  userField: {
    backgroundColor: 'purple',
    alignItems: 'center',
    paddingLeft: 15,
    flexDirection: 'row',
    paddingVertical: 10
  },
  logout: {
    marginRight: 20,
    backgroundColor: '#f9f6f2',
    padding: 8,
    borderRadius: 17
  }
})
