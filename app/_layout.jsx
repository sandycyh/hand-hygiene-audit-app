import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, StyleSheet } from 'react-native';
import { useSubmit } from '../Context/SubmitResult';
import { ConfirmSubmitProvider, useConfirmSubmit } from '../Context/ConfirmSubmit';
import { SubmitProvider } from '../Context/SubmitResult';

export default function Layout() {

    return (
        <SubmitProvider>
            <ConfirmSubmitProvider>
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
                                const { SubmitAudit } = useConfirmSubmit();
                                return < Button
                                    title='Complete'
                                    onPress={() => {
                                        SubmitAudit();
                                    }} />
                            }
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