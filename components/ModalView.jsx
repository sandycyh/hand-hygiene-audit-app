import { Modal, View, Pressable, StyleSheet } from 'react-native'

import ThemedView from '@/components/ui/ThemedView';
import ThemedText from '@/components/ui/ThemedText';

import { useDropDown } from '../Context/DropDownOptions';
import { useEffect } from 'react';

export default function ModalView({ visible, result, onClose }) {

  return (
    <Modal
      transparent visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
      <Pressable
        style={styles.backdrop}
        onPress={onClose}>

        <ThemedView style={styles.modal}>
          <ThemedView style={styles.modalDisplay}>
            <ThemedText>{`Result ID:      ${result.ResultID}`}</ThemedText>
            <ThemedText>{`Set No.:        ${result.SetID}`}</ThemedText>
            <ThemedText>{`HCW:            ${result.HCW}`}</ThemedText>
            <ThemedText>{`Moment:     No.${result.Moment}`}</ThemedText>
            <ThemedText>{`Action:         ${result.Action}`}</ThemedText>
            <ThemedText>{`Glove:          ${result.Glove}`}</ThemedText>
            <ThemedText>{`CorrectMoment:    ${result.CorrectMoment}`}</ThemedText>

          </ThemedView>
        </ThemedView>
      </Pressable>
    </Modal>
  )
}


const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  modalDisplay: {
    padding: 20,
    borderWidth: 10,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9',
    width: '90%',
    height: '70%',
    borderRadius: 15,
  },
})
