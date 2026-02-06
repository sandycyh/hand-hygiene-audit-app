import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Modal, Button } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router';

import { useDropDown } from '../../Context/DropDownOptions';
import { useSubmit, SubmitProvider } from '../../Context/SubmitResult';

import ThemedView from '../../components/ui/ThemedView';
import ThemedText from '../../components/ui/ThemedText';
import Spacer from '../../components/ui/Spacer';
import Dropdown from 'react-native-input-select';
import CollapsableContainer from '../../components/CollapsableContainer';
import ModalConfirm from '../../components/ModalConfirm';
import ModalAlert from '../../components/ModalAlert';

export default function log() {


  //  ********************** time / date / timer section ********************** 

  const timerCount = (time) => {
    const hours = Math.floor(time / 3600);
    const mins = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
    const seconds = String(Math.floor((time % 60))).padStart(2, '0');
    return { hours, mins, seconds };
  }

  const [date, setDate] = useState(null);
  const [timer, setTimer] = useState(0);
  const [totalTime, setTotalTime] = useState(null);
  const [isActive, setIsActive] = useState(true);
  const { hours, mins, seconds } = timerCount(timer);
  const [startTime, setStartTime] = useState(null);
  const [expanded, setExpanded] = useState(true);
  const [showForm, setShowForm] = useState(false);


  const getFormattedDate = () => {
    const curDate = new Date();
    const day = String(curDate.getDate()).padStart(2, '0');
    const month = String(curDate.getMonth() + 1).padStart(2, '0');
    const year = curDate.getFullYear();
    if (!date) {
      setDate(`${year}-${month}-${day}`);
    }
    return (`${day}-${month}-${year}`);
  };


  useEffect(() => {
    const timeNow = new Date();
    const hours = String(timeNow.getHours()).padStart(2, '0');
    const minutes = String(timeNow.getMinutes()).padStart(2, '0');
    const seconds = String(timeNow.getSeconds()).padStart(2, '0');

    setStartTime(`${hours}:${minutes}:${seconds}`)
  }, []);

  //toggle timer start / stop 
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
  const onItemPress = () => {
    setExpanded(!expanded);
  };

  async function getTotalTime() {
    setTotalTime(
      String(hours).padStart(2, '0') + ':' +
      String(mins).padStart(2, '0') + ':' +
      String(seconds).padStart(2, '0')
    )
  }



  // setup & import states for audit form 
  const { orgOptions,
    deptOptions,
    auditorOptions,
    HCWOptions,
    momentOptions,
    actionOptions,
    gloveOptions,
    org, setOrg,
    department, setDepartment,
    auditor, setAuditor,
  } = useDropDown();

  const [HCW, setHCW] = useState(null);
  const [moment, setMoment] = useState(null);
  const [action, setAction] = useState(null);
  const [glove, setGlove] = useState(null);
  const [correctMoment, setCorrectMoment] = useState(null);
  const [momentNo, setMomentNo] = useState(0);


  // warning modal states 
  const [warningEmptyAuditVisible, setWarningEmptyAuditVisible] = useState(false);
  const [warningModalVisible, setWarningModalVisible] = useState(false)


  // storing results
  const [results, setResults] = useState([]);
  const [auditSet, setAuditSet] = useState([]);

  var totalMoment = results.length;
  var totalCorrectMoment = results.filter(r => r.correctMoment === 'Yes').length;
  var successRate = 0;

  const getSuccessRate = () => {
    if (results.length === 0) return 0;
    successRate = ((totalCorrectMoment / totalMoment) * 100).toFixed(2)
    return successRate;
  };

  const addMoments = () => {
    setShowForm(!showForm);
    setMomentNo(momentNo => results.length + 1);
  };

  function saveAndExit() {
    try {
      if (HCW !== null && moment !== null && action !== null &&
        glove !== null && correctMoment !== null) {
        nextMoment();
        setShowForm(false);
        getTotalTime();
      } else {
        setWarningModalVisible(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  function cancel() {
    setShowForm(false);
  }

  const resetDropDown = () => {
    setHCW(null);
    setMoment(null);
    setAction(null);
    setGlove(null);
    setCorrectMoment(null);
  }


  const nextMoment = async () => {
    try {
      if (HCW !== null && moment !== null && action !== null &&
        glove !== null && correctMoment !== null) {
        setResults(prev => [
          ...prev,
          {
            HCW,
            moment,
            action,
            glove,
            correctMoment,
          }
        ]);
        //reset dropdown options 
        resetDropDown();
        setMomentNo(momentNo => momentNo + 1);
      } else {
        setWarningModalVisible(true);
      }
    } catch (error) {
      console.error(error)
    }
  };

  //confirm submit section (including mappinng data)
  const { postResult,
    postAuditSet,
  } = useSubmit();


  const [confirmSubmitModal, setConfirmSubmitModal] = useState(false);
  const router = useRouter();

  function MapAuditSet(auditSet) {
    if (!auditSet) throw new Error('auditSet is undefined')

    return {
      AuditDate: auditSet.date,
      StartTime: auditSet.startTime,
      TotalTime: auditSet.totalTime,
      OrgID: auditSet.org,
      DeptCode: auditSet.department,
      AuditedBy: auditSet.auditor,
      TotalCorrectMoment: auditSet.totalCorrectMoment,
      TotalMoment: auditSet.totalMoment,
      SuccessRate: auditSet.successRate
    }
  }

  function MapResult(setID, results) {

    return results.map(r => ({
      SetID: setID,
      HCW: r.HCW,
      Moment: r.moment,
      Action: r.action,
      Glove: r.glove,
      CorrectMoment: r.correctMoment
    }));
  }


  async function confirmSubmit(auditSet) {
    //mapping auditSet details 
    const auditSetData = MapAuditSet(auditSet)
    const setID = await postAuditSet(auditSetData);

    //mapping individual audit moments 
    const resultPayload = MapResult(setID, results)
    await postResult(resultPayload)

    //empty the list for next time 

    setAuditSet([]);
    setResults([]);
  }

  // for confirm button  
  const onConfirm = async () => {
    if (!org || !department || !auditor) {
      setWarningModalVisible(true);
      setConfirmSubmitModal(false);
      return;
    } else if (results.length === 0) {
      setWarningEmptyAuditVisible(true);
      setConfirmSubmitModal(false);
      return;
    }
    else {
      getSuccessRate();
      const newAuditSet = ({
        date,
        startTime,
        totalTime,
        org,
        department,
        auditor,
        totalCorrectMoment,
        totalMoment,
        successRate
      })
      setAuditSet(newAuditSet)

      await confirmSubmit(newAuditSet)
      setConfirmSubmitModal(false);
      router.replace('/');
    }
  }

  const onComplete = () => {
    setConfirmSubmitModal(true)
  }
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title='Complete' onPress={onComplete} />
      )
    })
  }, [navigation])

  
  return (
    <SubmitProvider>
      <ThemedView style={styles.container}>
        <ThemedView>
          <Spacer size={20} />
          <ThemedText style={styles.title}> Hand Hygiene Observation Form</ThemedText>
          <Spacer size={20} />

        </ThemedView>

        <ThemedView style={styles.formContainer}>
          <Spacer size={10} />
          <ThemedView style={styles.detailSection}>
            <ThemedText style={styles.dropdownTitle}>Organisation: </ThemedText>

            <Dropdown
              dropdownStyle={styles.dropdownMainForm}
              options={orgOptions}
              selectedValue={org}
              onValueChange={(value) => setOrg(value)}
            /> 
          </ThemedView>

          <Spacer size={7} />

          <ThemedView style={styles.detailSection}>
            <ThemedText style={styles.dropdownTitle}>Department / Ward: </ThemedText>
            <Dropdown
              dropdownStyle={styles.dropdownMainForm}
              options={deptOptions}
              selectedValue={department}
              onValueChange={(value) => setDepartment(value)}
            />
          </ThemedView>

          <ThemedView style={styles.detailSection}>
            <ThemedText style={styles.dropdownTitle}>Auditor</ThemedText>
            <Dropdown
              dropdownStyle={styles.dropdownMainForm}
              options={auditorOptions}
              selectedValue={auditor}
              onValueChange={(value) => setAuditor(value)}
            />
          </ThemedView>
        </ThemedView>

        <ModalConfirm
          visible={confirmSubmitModal}
          onConfirm={onConfirm}
          onClose={() => setConfirmSubmitModal(false)}>
          <ThemedText>Confirm Submit ?</ThemedText>
        </ModalConfirm>

        <ModalAlert
          visible={warningModalVisible}
          onClose={() => setWarningModalVisible(false)}>
          All Fields are required!
        </ModalAlert>

        <ModalAlert
          visible={warningEmptyAuditVisible}
          onClose={() => setWarningEmptyAuditVisible(false)}>
          Please add at least one moment before submitting!
        </ModalAlert>

        <Spacer size={13} />


        <ThemedView style={styles.mommentBtnSection}>
          <TouchableOpacity style={styles.mommentBtn} onPress={addMoments}>
            <ThemedText style={styles.momentBtnText}>Add a moment</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <Spacer size={10} />

        <ThemedView style={styles.timerSection}>
          <ThemedText style={styles.time} >Date:</ThemedText>
          <ThemedText style={styles.time}>{getFormattedDate()}</ThemedText>

          <ThemedText style={styles.time}>Start time: </ThemedText>
          <ThemedText style={styles.time}>{startTime ?? '--:--'}</ThemedText>
        </ThemedView>


        <ThemedView style={styles.timerButtonSection}>
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
              <ThemedText>1. Before a Touching a Patient</ThemedText>
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
              dropdownStyle={styles.dropdownAuditForm}
              options={HCWOptions}
              selectedValue={HCW}
              onValueChange={(value) => setHCW(value)} />

            <ThemedText style={styles.dropdownText}>Moment</ThemedText>
            <Dropdown
              dropdownStyle={styles.dropdownAuditForm}
              options={momentOptions}
              selectedValue={moment}
              onValueChange={(value) => setMoment(value)}
            />

            <ThemedText style={styles.dropdownText}>Action</ThemedText>
            <Dropdown
              dropdownStyle={styles.dropdownAuditForm}
              options={actionOptions}
              selectedValue={action}
              onValueChange={(value) => setAction(value)}
            />

            <ThemedText style={styles.dropdownText}>Glove</ThemedText>
            <Dropdown
              dropdownStyle={styles.dropdownAuditForm}
              options={gloveOptions}
              selectedValue={glove}
              onValueChange={(value) => setGlove(value)}
            />

            <ThemedText style={styles.dropdownText}> Correct Moment? </ThemedText>
            <Dropdown
              dropdownStyle={styles.dropdownAuditForm}
              options={[
                { label: 'Yes', value: 'Yes' },
                { label: 'No', value: 'No' },
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

            <TouchableOpacity onPress={() => { saveAndExit() }} style={styles.mommentBtn}>
              <ThemedText>Save & Exit</ThemedText>
            </TouchableOpacity>

            <Spacer size={10} />

            <TouchableOpacity onPress={() => { cancel() }} style={styles.mommentBtn}>
              <ThemedText>Cancel</ThemedText>
            </TouchableOpacity>

          </ThemedView>
        </Modal>

      </ThemedView >
    </SubmitProvider>
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
    justifyContent: 'flex-start',
    paddingLeft: 20,
    paddingBottom: 15,
  },
  timerButtonSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 15,
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
    padding: 5,
    fontSize: 14,
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,

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
    marginLeft: 5,
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
    padding: 8,
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
  dropdownAuditForm: {
    width: '75%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign: 'flex-start',
    justifyContent: 'flex-start',
    padding: 5,
    minHeight: 56,
    height: 56, 
    maxHeight: 250,
  },
  dropdownText: {
    fontSize: 14,
    padding: 10,
  },
  dropdownTitle: {
    width: '28%',
    fontSize: 16,
    marginLeft: 15,
    padding: 15,
  },
  dropdownMainForm: {
    flex: 1,
    flexDirection: 'row',
    width: '40%',
    minHeight: 56,
    height: 56
  }
});
