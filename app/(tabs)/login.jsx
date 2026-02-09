import { View, Text, StyleSheet, Button } from 'react-native';
import React from 'react'
import ThemedView from '../../components/ui/ThemedView';
import ThemedText from '../../components/ui/ThemedText';


export default function Login() {

  return (
    <ThemedView style={styles.container}>
      <ThemedText>Enter Login Details: </ThemedText>
      <ThemedText>Username: </ThemedText>
      <ThemedText>Password: </ThemedText>
    
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 16,

  }
})
