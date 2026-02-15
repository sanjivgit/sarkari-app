import { StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { ThemedView } from './ui/themed-view';
import { ThemedText } from './ui/themed-text';

interface LoaderShap {
    message?: string;
    children?: React.ReactNode;
}

const Loader: FC<LoaderShap> = ({ children, message = "Loading..." }) => {
    return (
        <ThemedView className='items-center' style={{ flex: 1 }}>
            {children ? (children) : <ThemedText>{message}</ThemedText>}
        </ThemedView>
    )
}

export default Loader

const styles = StyleSheet.create({})