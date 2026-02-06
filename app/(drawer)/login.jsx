// import { View, Text, StyleSheet, Button } from 'react-native';
// import React, { useCallback, useMemo, useRef } from 'react'
// import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
// import ThemedView from '../../components/ui/ThemedView';
// import ThemedText from '../../components/ui/ThemedText';


// export default function Login() {
//   const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);

//   return (
//     <ThemedView style={styles.container}>
//       <BottomSheet index={1} snapPoints={snapPoints}>
//         <ThemedText>Coming Soon!</ThemedText>
//       </BottomSheet>
//     </ThemedView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   text: {
//     fontSize: 16,

//   }
// })


import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

export default function Login() {
  const snapPoints = useMemo(() => ['50%'], []);

  return (
    <View style={{ flex: 1 }}>
      <BottomSheet index={0} snapPoints={snapPoints}>
        <Text>IT WORKS</Text>
      </BottomSheet>
    </View>
  );
}

