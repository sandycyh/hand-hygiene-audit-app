import { Stack } from 'expo-router';
import { Button, StyleSheet } from 'react-native';
import { SubmitProvider } from '../Context/SubmitResult';

export default function Layout() {
    const isLoggedIn = false;

    return (
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
                <Stack.Protected guard={true}>

                    <Stack.Screen name='(tabs)'
                        options={{
                            headerShown: false,
                            title: 'Login',
                        }} />
                </Stack.Protected>
                <Stack.Protected guard={true}>
                    <Stack.Screen name='(drawer)'
                        options={{
                            headerShown: false
                        }} />
                </Stack.Protected>
            </Stack>
        </SubmitProvider>
    )
}

const styles = StyleSheet.create({
    headerTitle: {
        fontsize: 20,
    }
})