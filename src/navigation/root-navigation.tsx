import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Box } from 'native-base';
import React from 'react';
import { SignInScreen } from '../components/authentication/sign-in';
import { HomeScreen } from '../components/home';
import { userAuthenticationState } from '../state/authentication.state';

export const Navigation = () => {
    return (
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    );
}

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
    const authenticationState = userAuthenticationState();

    switch (authenticationState) {
        case "authenticated": return <AuthenticatedStack />;
        case "unauthenticated": return <UnAuthenticatedStack />;
        case "unverified": return <LoadingStack />;
    }

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

const AuthenticatedStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="SignIn"
            component={HomeScreen}
            options={{ headerShown: false }} />
    </Stack.Navigator>
);

const UnAuthenticatedStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ headerShown: false }} />
    </Stack.Navigator>
);

const LoadingStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="SignIn"
            component={Loading}
            options={{ headerShown: false }} />
    </Stack.Navigator>
);

const Loading = () => {
    return <Box>Loading...</Box>
}