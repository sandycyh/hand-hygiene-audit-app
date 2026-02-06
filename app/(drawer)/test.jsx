import Animated from 'react-native-reanimated';
import { Text, View } from 'react-native';

export default function ReanimatedTest() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.Text entering={Animated.FadeIn}>
        If you see me animate, Reanimated works
      </Animated.Text>
      
    </View>
  );
}
