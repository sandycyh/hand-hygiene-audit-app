import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import ThemedText from './ui/ThemedText';
import Spacer from '../components/ui/Spacer';

const ModalAlert = ({ children, visible, onClose }) => {
    return (
        <Modal transparent visible={visible} animationType='fade'>
            <View style={styles.container}>
                <View style={styles.containerTitle}>
                    <Spacer size={10} />
                    <ThemedText> {children} </ThemedText>
                    <Spacer size={35} />
                        <Pressable onPress={onClose} style={styles.button}>
                            <ThemedText style={styles.text}>Confirm</ThemedText>
                        </Pressable>
                    </View>
                </View>
        </Modal>
    )
}

export default ModalAlert

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerTitle: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        shadowOffset: { width: 2, height: 4, },
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 10,
        width: '60%',
        height: '20%',
    },
    text: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    button: {
        justifyContent: 'center',
        backgroundColor: '#b5b0e6ff',
        borderRadius: 7,
        paddingHorizontal: 10,
        paddingVertical: 6
    }
})


