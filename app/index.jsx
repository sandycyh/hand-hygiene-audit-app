console.log("ENTRY FILE RUNNING");
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from 'expo-router';
import { Link } from "expo-router";


import ThemedView from '@/components/ui/ThemedView';
import Spacer from '@/components/ui/Spacer';
import ThemedText from '@/components/ui/ThemedText';
import Logo from '@/assets/images/dirtyHands.png';

const HomeScreen = () => {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <Spacer size={60} />

      <ThemedText style={styles.title} title={true}>
        Hand Hygiene Audit App
      </ThemedText>
      <Spacer size={60} />

      <Image source={Logo} style={styles.image}></Image>
      <Spacer size={50} />
      
      <Link href={'/log'} style={styles.link}>
      <Text style={styles.text}>Log Moments</Text>
      </Link>
      

    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#133981',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffff'
  },
  text: {
    color: '#ffff'
  },
  image: {
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  link: {
    padding: 10,
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 10,
  },
  button: {
    padding: 20,
    alignItems: 'center',
  }

})
export default HomeScreen; 


