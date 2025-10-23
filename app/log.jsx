import { View, ScrollView, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, Modal, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'

import ThemedView from '@/components/ui/ThemedView';
import ThemedText from '@/components/ui/ThemedText';
import Spacer from '@/components/ui/Spacer';
import Dropdown from 'react-native-input-select';
import CollapsableContainer from '@/components/CollapsableContainer';
import ModalAlert from '../components/ModalAlert';

const getFormattedDate = () => {
  const curDate = new Date();
  const day = String(curDate.getDate()).padStart(2, '0');
  const month = String(curDate.getMonth() + 1).padStart(2, '0');
  const year = curDate.getFullYear();
  return `${day}-${month}-${year}`;
};


const timerCount = (time) => {
  const hours = Math.floor(time / 3600);
  const mins = Math.floor((time % 3600) / 60);
  const seconds = Math.floor((time % 60));
  return { hours, mins, seconds };
}

let results = [];

export default function log() {
  const [ timer, setTimer ] = useState(0);
  const [ isActive, setIsActive ] = useState(true);
  const { hours, mins, seconds } = timerCount(timer);
  const [ startTime, setStartTime ] = useState(null);
 
  const [ expanded, setExpanded ] = useState(true);
  const [ showForm, setShowForm ] = useState(false);

  const [ org, setOrg ] = useState('');
  const [ department, setDepartment ] = useState('');
  const [ auditor, setAuditor ] = useState('');

  const [ HCW, setHCW ] = useState('');
  const [ moment, setMoment ] = useState('');
  const [ action, setAction ] = useState('');
  const [ glove, setGlove ] = useState('');
  const [ correctMoment, setCorrectMoment ] = useState('');

  const [ warningModalVisible, setWarningModalVisible ] = useState(false)

  const [ saveForm, setSaveForm ] = useState(false);
  const [ momentNo, setMomentNo ] = useState(0);

  const onItemPress = () => {
    setExpanded(!expanded);
  };

  const addMoments = () => {
    setShowForm(!showForm);
    setMomentNo(momentNo => results.length + 1);
  };

  function resetResultsArray(){
    results = [];
  }

  const saveFormDetails = () => {
    
  }

  const resetDropDown = () => {
    setHCW('');
    setMoment('');
    setAction('');
    setGlove('');
    setCorrectMoment('');
  }
  const nextMoment = async () => {
    try {
      if (HCW !== '' && moment !== '' && action !== '' && glove !== '' && correctMoment !== '') {
        let result = {
          HCW,
          moment,
          action,
          glove,
          correctMoment,
        }
        results.push(result);

        //reset dropdown options 
        resetDropDown();
        setMomentNo(momentNo => momentNo + 1);

        console.log(results)
      } else {
        setWarningModalVisible(true);
      }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    const timeNow = new Date();
    const hours = String(timeNow.getHours()).padStart(2, '0');
    const minutes = String(timeNow.getMinutes()).padStart(2, '0');
    const seconds = String(timeNow.getSeconds()).padStart(2, '0');

    setStartTime(`${hours}:${minutes}:${seconds}`);
  }, []);

  const toggle = () => {
    setIsActive(!isActive);
  }

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setTimer(timer => timer + 1)
      }, 1000);
    } else if (!isActive && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.container}>
        <ThemedView>
          <Spacer size={20} />
          <ThemedText style={styles.title}> Hand Hygiene Observation Form</ThemedText>
          <Spacer size={20} />
        </ThemedView>

        <ThemedView>
          <ThemedView style={styles.formContainer}>
            <Spacer size={10} />

            <ThemedView style={styles.detailSection}>

              <ThemedText style={{
                width: '30%',
                fontSize: 16,
                marginLeft: 15,
                padding: 15,
              }}
              >Organisation: </ThemedText>
              <Dropdown
                dropdownStyle={{
                  width: '37%',
                  height: 45, 
                  marginLeft: 3
                }}
                options={[
                  { label: 'Royal North Shore Hospital', value: 'RNSH' },
                ]}
                selectedValue={org}
                onValueChange={(value) => setOrg(value)}
              />
            </ThemedView>

            <ThemedView style={styles.detailSection}>
              <ThemedText style={styles.text}>Department / Ward: </ThemedText>
              <TextInput style={styles.Input}></TextInput>
            </ThemedView>

            <ThemedView style={styles.detailSection}>
              <ThemedText style={styles.text}>Date:</ThemedText>
              <ThemedText style={styles.date}>{getFormattedDate()}</ThemedText>
            </ThemedView>

            <ThemedView style={styles.detailSection}>
              <ThemedText style={styles.text}>Auditor: </ThemedText>
              <TextInput style={styles.Input}></TextInput>
            </ThemedView>
          </ThemedView>

          <Spacer size={15} />
        </ThemedView>

        <ThemedView style={styles.mommentBtnSection}>
          <TouchableOpacity style={styles.mommentBtn} onPress={addMoments}>
            <ThemedText style={styles.momentBtnText}>Add a moment</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.timerSection}>
          <ThemedText style={styles.time}>Start time: </ThemedText>
          <ThemedText style={styles.time}>{startTime ?? '--:--'}</ThemedText>
        </ThemedView>


        <ThemedView style={styles.timerSection}>
          <TouchableOpacity onPress={toggle} style={styles.button}>
            <ThemedText style={styles.buttonText}>{isActive ? 'Pause Audit ' : 'Re-Start Audit '}</ThemedText>
          </TouchableOpacity>
          <ThemedText style={styles.time}>
            {String(hours).padStart(2, '0')} h :
            {String(mins).padStart(2, '0')} m :
            {String(seconds).padStart(2, '0')} s
          </ThemedText>
        </ThemedView>

        <TouchableWithoutFeedback onPress={onItemPress}>
          <ThemedView style={styles.SectionII}>
            <ThemedText style={{ paddingVertical: 15 }}>FIVE MOMENTS FOR HAND HYGIENE</ThemedText>
            <CollapsableContainer expanded={expanded}>
              <ThemedText>1. Before Touching a Patient</ThemedText>
              <ThemedText>2. Before a Procedure</ThemedText>
              <ThemedText>3. After a Procedure</ThemedText>
              <ThemedText>4. After Touching a Patient</ThemedText>
              <ThemedText>5. After Touching Patient's Surroundings</ThemedText>
            </CollapsableContainer>
          </ThemedView>
        </TouchableWithoutFeedback>

        <Modal
          animationType='slide'
          transparent={false}
          visible={showForm}
          onRequestClose={() => {
            setShowForm(!showForm);
          }}>

          <ThemedView style={styles.auditSection}>
            <ThemedText style={styles.title}> Moment No. {momentNo}</ThemedText>

            <ThemedText style={styles.dropdownText}>HCW code</ThemedText>
            <Dropdown
              dropdownStyle={styles.dropdown}
              options={[
                { label: 'N - Nurse (Registered / Enrolled)', value: 'N' },
                { label: 'DR - Medical Practitioner', value: 'DR' },
                { label: 'PC(OSO) - AIN / Personal Care Staff / Operational', value: 'PC' },
                { label: 'AH - Allied Health; Physio, OT, Speech, Social Work, Pharamacy', value: 'AH' },
                { label: 'D - Domestic, Cleaning, Food Service', value: 'D' },
                { label: 'AC - Admin and Clerical', value: 'AC' },
                { label: 'BL - Invasive Tech including Phlemotomist', value: 'BL' },
                { label: 'SN - Student Nurse', value: 'SN' },
                { label: 'SDR - Student Medical Practitioner', value: 'SDR' },
                { label: 'SAH - Student PC staff/ SIN', value: 'SAH' },
                { label: 'SPC - Student Allied Health', value: 'SPC' },
                { label: 'O - Other Not Specified', value: 'O' },
              ]}
              selectedValue={HCW}
              onValueChange={(value) => setHCW(value)} />

            <ThemedText style={styles.dropdownText}>Moment</ThemedText>
            <Dropdown
              dropdownStyle={styles.dropdown}
              options={[
                { label: '1 - Before Touching a Patient', value: '1' },
                { label: '2 - Before a Procedure', value: '2' },
                { label: '3 - After a Procedure', value: '3' },
                { label: '4 - After Touching a Patient', value: '4' },
                { label: '5 - After Touching Patient\'s Surroundings', value: '5' },
              ]}
              selectedValue={moment}
              onValueChange={(value) => setMoment(value)}
            />

            <ThemedText style={styles.dropdownText}>Action</ThemedText>
            <Dropdown
              dropdownStyle={styles.dropdown}
              options={[
                { label: 'Rub', value: 'R' },
                { label: 'Wash', value: 'W' },
                { label: 'Missed', value: 'M' },
              ]}
              selectedValue={action}
              onValueChange={(value) => setAction(value)}
            />

            <ThemedText style={styles.dropdownText}>Glove</ThemedText>
            <Dropdown
              dropdownStyle={styles.dropdown}
              options={[
                { label: 'On', value: 'On' },
                { label: 'Off', value: 'Off' },
                { label: 'Continue', value: 'Cont' },
              ]}
              selectedValue={glove}
              onValueChange={(value) => setGlove(value)}
            />

            <ThemedText style={styles.dropdownText}> Correct Moment? </ThemedText>
            <Dropdown
              dropdownStyle={styles.dropdown}
              options={[
                { label: 'Yes', value: 'Y' },
                { label: 'No', value: 'N' },
              ]}
              selectedValue={correctMoment}
              onValueChange={(value) => setCorrectMoment(value)}
            />
          </ThemedView>

          <ThemedView>
            <Spacer size={10} />

            <TouchableOpacity style={styles.mommentBtn} onPress={() => nextMoment()}>
              <ThemedText>Next moment</ThemedText>
              <ThemedView>

                <ModalAlert
                  visible={warningModalVisible}
                  onClose={() => setWarningModalVisible(false)}>
                  All Fields are required!
                </ModalAlert>
              </ThemedView>
            </TouchableOpacity>

            <Spacer size={10} />

            <TouchableOpacity onPress={resetResultsArray()} style={styles.mommentBtn}>
              <ThemedText>Save & Exit</ThemedText>
            </TouchableOpacity>

          </ThemedView>
        </Modal>
      </ScrollView >
    </ThemedView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  dropdown: {
    width: '50%',
  },
  formContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailSection: {
    flexDirection: 'row',

  },
  timerSection: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  SectionII: {
    padding: 10,
    fontSize: 14,
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,

  },
  Input: {
    height: 30,
    width: '50%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 13,
    padding: 5,
    marginLeft: 10,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 14,
    justifyContent: 'center',
    color: '#625f72',
  },
  text: {
    width: '40%',
    fontSize: 16,
    marginLeft: 15,
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  button: {
    height: 40,
    width: 95,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: '#d6d5e1',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  buttonText: {
    color: '#625f72',

  },
  date: {
    width: '55%',
    marginLeft: -10,
    fontSize: 16,
    textAlign: 'center',
    justifyContent: 'center',
    paddingVertical: 5
  },
  time: {
    fontSize: 16,
    padding: 15,
  },
  auditSection: {
    flexDirection: 'column',
    padding: 15,
  },
  mommentBtnSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50,
  },
  mommentBtn: {
    height: 40,
    width: '100%',
    elevation: 10,
    backgroundColor: '#b5b0e6ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  momentBtnText: {
    fontSize: 18,
  },
  dropdown: {
    width: '75%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign: 'flex-start',
    justifyContent: 'flex-start',
    padding: 5,
  },
  dropdownText: {
    fontSize: 14,
    padding: 10,
  }
});
