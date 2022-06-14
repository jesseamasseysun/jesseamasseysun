import { Center, Container, ScrollView, Text, VStack } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { View } from '../components/Themed';
import { SignoutButton } from '../src/components/authentication';
import { DataList } from '../src/components/data-list';
import { Username } from '../src/components/user';
import { SigninByEmail } from '../src/components/authentication/sign-in/sign-in-by-email';
import { userAuthentication } from '../src/state/authentication.state';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <Container>
      <SigninByEmail />
      <AuthenticatedView>
        <Username />
        <SignoutButton />
        <ScrollView>
          
        </ScrollView>
      </AuthenticatedView>
    </Container>
  );
}


export const AuthenticatedView: React.FunctionComponent = ({ children }) => {
  const token = userAuthentication();

  if (token) return <>{children}</>
  return <></>
}