import { ScrollView } from 'native-base';
import React from 'react';
import { SignoutButton } from '../authentication';
import { AccountBalances } from '../financials/account-balances';


export const HomeScreen = () => {

    return (
        <React.Fragment>
            <SignoutButton />
            <ScrollView>
                <AccountBalances />
            </ScrollView>
        </React.Fragment>
    );
};