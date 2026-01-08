import { View, Text, StyleSheet, Modal, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useDropDown } from '../../Context/DropDownOptions';
import { SubmitProvider } from '../../Context/SubmitResult';
import ModalView from '@/components/ModalView';

import ThemedText from '@/components/ui/ThemedText';
import ThemedView from '@/components/ui/ThemedView';
import Spacer from '@/components/ui/Spacer';
import Dropdown from 'react-native-input-select';

export default function Result() {
  const { orgOptions,
    deptOptions,
    auditorOptions,
    HCWOptions,
    momentOptions,
    actionOptions,
    gloveOptions,
    resultOptions,
    resultSetRequested,
    org, setOrg,
    department, setDepartment,
    auditor, setAuditor,
    editSetID, setEditSetID,
    editResultID, setEditResultID,
    resultRequested, setResultRequested
  } = useDropDown();

  const [modalVisible, setModalVisible] = useState(false);


  const editResultList = ({ ID, correctMoment }) => (
    <View style={styles.item}>
      <Text style={styles.title} > Result ID: {ID} - Correct Moment: ${correctMoment} </Text>
    </View>
  )

  // useEffect(() => {
  //   console.log(`edit: ${editResult}`)
  //   console.log(`editID: ${editResultID}`)
  //   console.log(`edit: ${editResult}`)

  // }, [editResult])


  // consider not using dropdown, use flatlist with selection instead 
  return (
    <SafeAreaProvider >
      <SubmitProvider>
        <ThemedView style={styles.container}>
          <ThemedView style={styles.resultContainer}>
            <Spacer size={20} />
            <ThemedText>Result Available</ThemedText>
            <Dropdown
              dropdownStyle={styles.dropdownMainForm}
              options={resultOptions}
              selectedValue={editSetID}
              onValueChange={(value) => { setEditSetID(value) }}
            />
            {/* <ThemeText>Choose an option</ThemeText> */}

            <ThemedView style={styles.flatListContainer}>
              <FlatList
                data={resultSetRequested}
                keyExtractor={(item) => item.ResultID}
                renderItem={({ item }) => (
                  <ThemedView style={styles.item}>
                    <Pressable
                      onPress={() => {
                        setEditResultID(item.ResultID)
                        setModalVisible(true)
                      }}>
                      <ThemedText style={styles.flatListItem}>{`Result ID: ${item.ResultID} - Correct Moment: ${item.CorrectMoment}`}</ThemedText>
                    </Pressable>
                  </ThemedView>
                )}
              />
            </ThemedView>

            <ModalView
              visible={modalVisible}
              result={resultRequested}
              onClose={() => setModalVisible(false)}>

            </ModalView>

          </ThemedView>
        </ThemedView>
      </SubmitProvider>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'column',
    padding: 20,
  },
  dropdownMainForm: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    minHeight: 56,
    height: 56
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
  },
  flatListItem: {
    padding: 5
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
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
  flatListContainer: {
    flex: 1,
    padding: 5,
  },
  resultContainer: {
    flex: 1,
  }
})