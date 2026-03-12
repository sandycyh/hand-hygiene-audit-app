import { View, Text, StyleSheet, TextInput, Pressable, TouchableWithoutFeedback, Keyboard, Modal } from 'react-native';
import React from 'react'
import { useState } from 'react';

import ThemedView from '../../components/ui/ThemedView';
import ThemedText from '../../components/ui/ThemedText';
import ThemedTextInput from '../../components/ui/ThemedTextInput';
import { useEffect } from 'react';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import ModalAlert from '../../components/ModalAlert';



export default function Login() {
  const API = process.env.EXPO_PUBLIC_API_URL;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginModalVisible, setLoginModalVisible] = useState(false);

  const handleLogin = async () => {
    try {
      console.log('login details: ' + username.toLowerCase() + ' / ' + password);
      await loginAPI(username, password);

    } catch (error) {
      console.error('Login failed:', error);
    }
  };



  const loginAPI = async (username, password) => {
    try {
      console.log(`username is: ${username}, pw: ${password}`)

      const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([username.toLowerCase().trim(), password]),
      });
      console.log('Response status:', res.status);
      
      const data = await res.json();

      if (!res.ok){
        console.log(data.error);
        setLoginModalVisible(true)

        return;
      }

      await SecureStore.setItemAsync('token', data.token);

      router.replace('/dash')

      console.log('Raw response:', data);

      return data;

    } catch (error) {
      console.error(error);
    }
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.loginSection}>

          <ThemedText style={styles.title}>Auditor Login </ThemedText>

          <ThemedTextInput
            style={styles.textInput}
            placeholder='Username'
            keyboardType='email-address'
            onChangeText={setUsername}
            value={username}
          />
          <ThemedTextInput
            style={styles.textInput}
            placeholder='Password'
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />

          <Pressable onPress={handleLogin}>
            <ThemedText style={styles.text}> LOGIN </ThemedText>
          </Pressable>
        </ThemedView>
        <ThemedView style={{ flex: 1 }} />

        <ThemedView >
          <ModalAlert
            style={styles.warningModal}
            visible={loginModalVisible}
            onClose={() => setLoginModalVisible(false)}>
            Invalid login details
          </ModalAlert>
        </ThemedView>


      </ThemedView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'column',

  },
  loginSection: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    padding: 20,
    marginBottom: 25
  },
  text: {
    fontSize: 16,
  },
  textInput: {
    borderColor: 'grey',
    borderWidth: 0.2,
    borderRadius: 5,
    width: '80%',
    marginBottom: 25,
  },
  warningModal: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})
