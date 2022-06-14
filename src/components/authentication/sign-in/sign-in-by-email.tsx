import { Button, Input, VStack } from 'native-base';
import React from 'react';
import { TextInput } from 'react-native'
import { useSignin } from '../../../hooks/authentication';

export const SigninByEmail = () => {
    const {
        username,
        password,
        isBusy,
        setUsername,
        setPassword,
        handleOnSignin } = useSignin();

    return (
        <VStack
            w="100%">
            <Input
                value={username}
                onChangeText={setUsername} />
            <Input
                value={password}
                onChangeText={setPassword} />
            <Button
                disabled={isBusy}
                onPress={handleOnSignin}>Signin</Button>
        </VStack>
    );
};