import { Center, Container } from 'native-base';
import React from 'react';
import { SigninByEmail } from './sign-in-by-email';


export const SignInScreen = () => {

    return (
        <Center>
            <Container
                w="lg">
                <SigninByEmail />
            </Container>
        </Center>
    );
};