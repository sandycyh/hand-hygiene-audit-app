import { Stack } from 'expo-router';
import { Button, StyleSheet } from 'react-native';
import { SubmitProvider } from '../Context/SubmitResult';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Layout() {

    return (
        <SafeAreaProvider>
            <SubmitProvider>
                <Stack
                    screenOptions={{
                        headerShown: false
                    }}
                >;
                    <Stack.Screen name='index'
                        options={{
                            title: 'Home',
                            headerShown: false,
                        }} />
                    <Stack.Screen name='log'
                        options={{
                            headerShown: false,
                            title: 'Audit Collection',
                        }} />
                </Stack>
            </SubmitProvider>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    headerTitle: {
        fontsize: 20,
    }
})