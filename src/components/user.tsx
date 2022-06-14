import React from 'react';
import { userUserState } from '../state/authentication.state';
import { Text } from "native-base";


export const Username = () => {
    const user = userUserState();

    return (
        <Text>{user?.userName}</Text>
    );
};