import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, StyleSheet } from 'react-native';

export default function Layout() {
    const router = useRouter();
    const [ saveForm, setSaveForm ] = useState(false);
    const [ momentNo, setMomentNo ] = useState(0);
    return ( 
        <Stack 
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#ffff'
                }
            }}>;
            <Stack.Screen name='index' options={{title: 'Home', headerShown: false}} />
            <Stack.Screen name='log' options={{
                                        title: 'Audit Collection',
                                        headerRight: () => (
                                            <Button 
                                                title='Complete' 
                                                onPress={() => {
                                                    setSaveForm(true); 
                                                    router.replace('/');
                                                    setMomentNo(0)}}
                                                />
                                        )}} />
        </Stack>
    )
}

const styles = StyleSheet.create({
    headerTitle: {
        fontsize: 20, 
    }
})