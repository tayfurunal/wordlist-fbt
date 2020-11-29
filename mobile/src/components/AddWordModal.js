import React, { useState, useContext } from 'react'
import { StyleSheet, Text, TextInput, Keyboard } from 'react-native'
import { Overlay, Button } from 'react-native-elements'
import api from '../api'
import { UserContext } from '../contexts/UserContext'
import { WordContext, WordDispatchContext } from '../contexts/WordContext'

const FIELDS_EMPTY = 'Please fill all fields'

export default ({ setShowAddWordModal }) => {
  const [turkish, setTurkish] = useState('')
  const [english, setEnglish] = useState('')
  const [wordAdding, setWordAdding] = useState(false)
  const [wordAddError, setWordAddError] = useState('')
  const user = useContext(UserContext)
  const words = useContext(WordContext)
  const wordDispatch = useContext(WordDispatchContext)

  const handleWordAdd = async () => {
    Keyboard.dismiss()
    if (!turkish || !english) {
      setWordAddError(FIELDS_EMPTY)
      return
    }
    try {
      setWordAdding(true)
      const response = await api.post('/posts/', {
        name: user.username,
        tr: turkish,
        en: english
      })
      wordDispatch([...words, response.data])
    } catch (err) {
      console.log(err)
    } finally {
      setWordAdding(false)
      setShowAddWordModal(false)
    }
  }

  return (
    <Overlay
      isVisible={true}
      transparent
      animationType='fade'
      onBackdropPress={() => {
        setShowAddWordModal(false)
      }}
      overlayStyle={{ paddingVertical: 20 }}>
      <React.Fragment>
        {wordAddError !== '' && (
          <Text style={styles.wordAddError}>{wordAddError}</Text>
        )}
        <Text style={styles.inputTitle}>English</Text>
        <TextInput
          style={StyleSheet.flatten([styles.input, { marginBottom: 15 }])}
          onChangeText={value => setEnglish(value)}
          defaultValue={english}
          autoCapitalize='none'
          autoCorrect={false}
          editable={!wordAdding}
          onFocus={() => {
            setWordAddError('')
          }}
        />
        <Text style={styles.inputTitle}>Turkish</Text>
        <TextInput
          style={styles.input}
          onChangeText={value => setTurkish(value)}
          defaultValue={turkish}
          autoCapitalize='none'
          autoCorrect={false}
          editable={!wordAdding}
          onFocus={() => {
            setWordAddError('')
          }}
        />
        <Button
          title='Add'
          containerStyle={{ marginTop: 15 }}
          buttonStyle={{ backgroundColor: 'purple' }}
          loading={wordAdding}
          onPress={handleWordAdd}
        />
      </React.Fragment>
    </Overlay>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 35,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    width: 225,
    paddingLeft: 5
  },
  inputTitle: {
    marginBottom: 5
  },
  wordAddError: {
    color: 'tomato',
    marginBottom: 10
  }
})
