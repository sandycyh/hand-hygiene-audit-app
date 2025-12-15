import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import { useDropDown } from '../../Context/DropDownOptions';
import { SubmitProvider } from '../../Context/SubmitResult';

import ThemeText from '@/components/ui/ThemedText'; 
import ThemeView from '@/components/ui/ThemedView'; 
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
        org, setOrg,
        department, setDepartment,
        auditor, setAuditor,
      } = useDropDown();

      return ( 
        <SubmitProvider> 
            <ThemeView style={styles.container}> 
                <ThemeView>
                    <Spacer size={20}/>
                    <ThemeText>Result Available</ThemeText>
                    <Dropdown 
                        dropdownStyle={styles.dropdownMainForm}
                        options={resultOptions}
                        ></Dropdown>
                </ThemeView>
            </ThemeView>
        </SubmitProvider>
      )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    flexDirection: 'column',
  },
})