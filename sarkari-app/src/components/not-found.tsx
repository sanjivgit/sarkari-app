import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { ThemedView } from './ui/themed-view';
import { ThemedText } from './ui/themed-text';

interface NotFoundShap {
    message?: string;
    children?: React.ReactNode;
}

const NotFound: FC<NotFoundShap> = ({ children, message = "Not Found" }) => {
    return (
        <ThemedView className='items-center' style={{ flex: 1 }}>
            {children ? (children) : <ThemedText>{message}</ThemedText>}
        </ThemedView>
    )
}

export default NotFound

const styles = StyleSheet.create({})