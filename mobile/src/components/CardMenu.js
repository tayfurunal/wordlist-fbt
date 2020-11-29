import React, { useContext, useState } from 'react'
import { Text, TextInput, StyleSheet, View } from 'react-native'
import { Overlay, Button, ButtonGroup, Icon } from 'react-native-elements'
import api from '../api'
import { WordContext, WordDispatchContext } from '../contexts/WordContext'

export default ({ word, setShowCardMenu }) => {
  const [english, setEnglish] = useState(word.en)
  const [turkish, setTurkish] = useState(word.tr)
  const [inProcess, setInProcess] = useState(false)
  const words = useContext(WordContext)
  const wordDispatch = useContext(WordDispatchContext)

  const handleEdit = () => {
    setInProcess(true)
    api
      .put(`/posts/${word._id}`, {
        en: english,
        tr: turkish
      })
      .then(res => {
        wordDispatch(
          words.map(w => {
            if (w._id !== word._id) return w
            w.en = english
            w.tr = turkish
            return w
          })
        )
        setShowCardMenu(false)
      })
      .catch(err => {
        console.log(err)
        setInProcess(false)
      })
  }

  const handleDelete = () => {
    setInProcess(true)
    api
      .delete(`/posts/${word._id}`)
      .then(() => {
        wordDispatch(words.filter(w => w._id !== word._id))
        setShowCardMenu(false)
      })
      .catch(err => {
        console.log(err)
        setInProcess(false)
      })
  }

  return (
    <Overlay
      isVisible={true}
      onBackdropPress={() => {
        if (inProcess) return
        setShowCardMenu(false)
      }}
      overlayStyle={{ padding: 15, minWidth: 175 }}>
      <>
        <TextInput
          style={styles.input}
          onChangeText={value => setEnglish(value)}
          defaultValue={english}
          autoCapitalize='none'
          autoCorrect={false}
          editable={!inProcess}
        />
        <TextInput
          style={styles.input}
          onChangeText={value => setTurkish(value)}
          defaultValue={turkish}
          autoCapitalize='none'
          autoCorrect={false}
          editable={!inProcess}
        />
        <View style={styles.buttonGroup}>
          <Button
            titleStyle={{ fontSize: 13 }}
            title='Edit'
            onPress={handleEdit}
            containerStyle={styles.buttonContainer}
            buttonStyle={{ backgroundColor: 'green' }}
            disabled={inProcess}
          />
          <Button
            titleStyle={{ fontSize: 13 }}
            containerStyle={styles.buttonContainer}
            buttonStyle={{ backgroundColor: 'tomato' }}
            title='Delete'
            disabled={inProcess}
            onPress={handleDelete}
          />
        </View>
      </>
    </Overlay>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 35,
    borderColor: 'black',
    borderWidth: 0.5,
    width: 225,
    paddingLeft: 5,
    marginBottom: 10
  },
  buttonGroup: {
    flexDirection: 'row'
  },
  buttonContainer: {
    flex: 1,
    padding: 5
  }
})
