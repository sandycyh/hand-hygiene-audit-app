import { Stack } from 'expo-router';
import { Button, StyleSheet } from 'react-native';
import { ConfirmSubmitProvider, useConfirmSubmit } from '../Context/ConfirmSubmit';
import { SubmitProvider } from '../Context/SubmitResult';

export default function Layout() {

    return (
        <SubmitProvider>
            <ConfirmSubmitProvider>
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
                            // headerRight: () => {
                            //     const { SubmitAudit } = useConfirmSubmit();
                            //     return < Button
                            //         title='Complete'
                            //         onPress={() => {
                            //             SubmitAudit();
                            //         }} />
                            // }
                        }} />
                </Stack>
            </ConfirmSubmitProvider>
        </SubmitProvider>
    )
}

const styles = StyleSheet.create({
    headerTitle: {
        fontsize: 20,
    }
})