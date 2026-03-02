import { TextInput, useColorScheme } from 'react-native'
import React from 'react'
import { Colours } from '../../constants/colours';

const ThemedTextInput = ({ style, ...props }) => {
    const colourScheme = useColorScheme();
    const theme = Colours[colourScheme] ?? Colours.light
  return (
    <TextInput 
      style={[
        { 
            backgroundColor: theme.uiBackground, 
            color: theme.text, 
            padding: 15, 
            borderRadius: 6 
            
        }, style ]}
      { ...props }/> 
  )
}

export default ThemedTextInput