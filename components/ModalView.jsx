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
            <ThemedText style={styles.modalText}>{`Result ID:      ${result.ResultID}`}</ThemedText>
            <ThemedText style={styles.modalText}>{`Set No.:        ${result.SetID}`}</ThemedText>
            <ThemedText style={styles.modalText}>{`HCW:            ${result.HCW}`}</ThemedText>
            <ThemedText style={styles.modalText}>{`Moment:     No.${result.Moment}`}</ThemedText>
            <ThemedText style={styles.modalText}>{`Action:         ${result.Action}`}</ThemedText>
            <ThemedText style={styles.modalText}>{`Glove:          ${result.Glove}`}</ThemedText>
            <ThemedText style={styles.modalText}>{`CorrectMoment:    ${result.CorrectMoment}`}</ThemedText>

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
    height: '50%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10
  },
  modalDisplay: {
    padding: 20,
    borderWidth: 10,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9',
    height: '100%',
    borderRadius: 15,
  },
  modalText:{
    fontSize: 16, 
    padding: 3,
  }
})
