import { Text, View, Button } from 'react-native';
import React, { Component } from 'react';
import { Drawer } from 'expo-router/drawer';
import { ConfirmSubmitProvider, useConfirmSubmit } from '../../Context/ConfirmSubmit';
import { SubmitProvider } from '../../Context/SubmitResult';

export default function Layout() {
    return (
        <SubmitProvider>
            <ConfirmSubmitProvider>
                <Drawer
                    options={{
                        headerShown: true,
                    }}>
                    <Drawer.Screen
                        name='log'
                        options={{
                            drawerLabel: 'Log Audit',
                            title: 'Log Audit',
                            headerRight: () => {
                                const { SubmitAudit } = useConfirmSubmit();
                                return < Button
                                    title='Complete'
                                    onPress={() => {
                                        SubmitAudit();
                                    }} />
                            }
                        }}
                    />
                    <Drawer.Screen
                        name='result'
                        options={{
                            drawerLabel: 'View Result',
                            title: 'View Result',
                        }}
                    />
                </Drawer>
            </ConfirmSubmitProvider>
        </SubmitProvider>
    )
} 