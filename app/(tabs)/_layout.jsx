import { Tabs } from 'expo-router';
import { Button, StyleSheet } from 'react-native';

export default function Layout() {

    return (
        <Tabs>
            <Tabs.Screen name='login'
                options={{
                    title: 'Login',
                }} />
            <Tabs.Screen name='createAcc'
                options={{
                    title: 'Create Account',
                }} />
            <Tabs.Screen name='resources'
                options={{
                    title: 'Resources',
                }} />
        </Tabs>
    )
}

const styles = StyleSheet.create({
    headerTitle: {
        fontsize: 20,
    }
})