import React, { useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { Card, Overlay, Button } from 'react-native-elements'
import CardMenu from './CardMenu'

export default ({ word }) => {
  const handleLongPress = () => {
    setShowCardMenu(true)
  }

  const [showCardMenu, setShowCardMenu] = useState(false)

  return (
    <TouchableOpacity onPress={handleLongPress}>
      <Card containerStyle={{ padding: 5 }}>
        <Card.Title
          style={{ marginBottom: 5, textAlign: 'auto', paddingLeft: 7 }}>
          {word.en}
        </Card.Title>
        <Card.Divider style={{ marginBottom: 0 }} />
        <Text style={{ marginTop: 5, paddingLeft: 7 }}>{word.tr}</Text>
      </Card>
      {showCardMenu && (
        <CardMenu word={word} setShowCardMenu={setShowCardMenu} />
      )}
    </TouchableOpacity>
  )
}
