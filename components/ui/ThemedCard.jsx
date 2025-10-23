import { View, useColorScheme } from 'react-native'
import React from 'react'
import { Colours } from '@/constants/colours';

const ThemedView = ({ style, ...props }) => {
    const colourScheme = useColorScheme();
    const theme = Colours[colourScheme] ?? Colours.light
  return (
    <View style={[{ backgroundColor: theme.uiBackground }, styles.card ]}
    { ...props }
    />
  )
}

export default ThemedView

const styles = StyleSheet.create({
  card: {
    borderRadius: 5, 
    padding: 20,
  }
})