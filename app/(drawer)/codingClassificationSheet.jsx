import { View, Text, Image, StyleSheet} from 'react-native'
import React from 'react'

import codeSheet from '@/assets/images/HH_codeSheet.png';

export default function CodingClassificationSheet() {
  return (
    <View style={styles.container}>
      <Image 
        source={codeSheet}
        style={styles.image}
        resizeMode='contain' />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{ 
        flex: 1, 
    },
    image:{
        flex: 1, 
        width: '100%', 
        height: '100%',
    },
})