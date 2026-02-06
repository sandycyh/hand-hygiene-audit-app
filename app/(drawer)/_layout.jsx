import 'react-native-gesture-handler';
import { Text, View, Button } from 'react-native';
import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { SubmitProvider } from '../../Context/SubmitResult';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export default function Layout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <SafeAreaProvider>
                    <SubmitProvider>
                        <Drawer
                            options={{
                                headerShown: true,
                            }}>
                            <Drawer.Screen
                                name='login'
                                options={{
                                    drawerLabel: 'Auditor Login',
                                    title: 'Auditor Login'
                                }}
                            />
                            <Drawer.Screen
                                name='log'
                                options={{
                                    drawerLabel: 'Log Audit',
                                    title: 'Log Audit'
                                }}
                            />
                            <Drawer.Screen
                                name='result'
                                options={{
                                    drawerLabel: 'View Result',
                                    title: 'View Result',
                                }}
                            />
                            <Drawer.Screen
                                name='codingClassificationSheet'
                                options={{
                                    drawerLabel: 'Coding Classification Sheet',
                                    title: 'Coding Classification Sheet',
                                }}
                            />
                        </Drawer>
                    </SubmitProvider>
                </SafeAreaProvider>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    )
} 