import { StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { ThemedView } from './ui/themed-view';
import { ThemedText } from './ui/themed-text';
import Button from './ui/button';

interface ErrorShap {
    message?: string;
    children?: React.ReactNode;
    retry: () => void;
}

const Error: FC<ErrorShap> = ({ children, retry, message = "Something went wrong" }) => {
    return (
        <ThemedView className='items-center' style={{ flex: 1 }}>
            {children ? (children) : <ThemedText>{message}</ThemedText>}
            <Button
                variant='danger'
                onPress={retry}
                buttonText="Retry"
            />
        </ThemedView>
    )
}

export default Error

const styles = StyleSheet.create({})