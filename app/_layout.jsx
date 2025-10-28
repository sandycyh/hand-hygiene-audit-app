import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, StyleSheet } from 'react-native';
import { useSubmit } from '../Context/SubmitResult';
import { SubmitProvider } from '../Context/SubmitResult';

export default function Layout() {
    const router = useRouter();
    const [momentNo, setMomentNo] = useState(0);

    return (
        <SubmitProvider>
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#ffff'
                    }
                }}>;
                <Stack.Screen name='index'
                    options={{
                        title: 'Home',
                        headerShown: false
                    }} />
                <Stack.Screen name='log'
                    options={{
                        title: 'Audit Collection',
                        headerRight: () => {
                            const { postResult } = useSubmit();
                            return < Button
                                title='Complete'
                                onPress={() => {
                                    postResult();
                                    router.replace('/');
                                    setMomentNo(0);
                                }} />
                        }
                    }} />
            </Stack>
        </SubmitProvider>
    )
}

const styles = StyleSheet.create({
    headerTitle: {
        fontsize: 20,
    }
})