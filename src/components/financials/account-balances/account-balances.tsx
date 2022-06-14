import { VStack, Text, Button, HStack } from "native-base";
import React from "react";
import { useOdata } from "../../../services/odata";
import { DataList } from "../../data-list";

type AccountBalance = {
    balance: number;
    businessUnitId: number;
    charges: number;
    credits: number;
    effectiveDate: string;
    id: number,
    businessUnit: {
        customerName: string;
    }
}


const dollars = (number: number) => new Intl.NumberFormat(`en-US`, {
    currency: `USD`,
    style: 'currency',
}).format(number);

export const AccountBalances = () => {
    const {
        nextPage,
        prevPage,
        data,
        toggleOrderBy
    } = useOdata<AccountBalance[]>({
        expand: "businessUnit",
        endpoint: 'AccountBalances'
    });

    if (!data)
        return <></>

    return (
        <VStack>
            <HStack>
                <Button
                    onPress={prevPage}>Previous</Button>
                <Button
                    onPress={nextPage}>Next</Button>
            </HStack>
            <DataList
                data={data}
                keyExtractor={(item) => `${item.id}`}
                columns={[
                    { header: 'Customer', dataExtractor: (item) => item.businessUnit.customerName, width: 'sm' },
                    {
                        header: (
                            <Text
                                onPress={() => toggleOrderBy('credits')}
                                textAlign="right">Credits</Text>
                        ), dataExtractor: (item) => (
                            <Text
                                textAlign="right">{dollars(item.credits)}</Text>
                        ), width: 'sm'
                    },
                    {
                        header: (
                            <Text
                                onPress={() => toggleOrderBy('charges')}
                                textAlign="right">Charges</Text>
                        ), dataExtractor: (item) => (
                            <Text
                                textAlign="right">{dollars(item.charges)}</Text>
                        ), width: 'sm'
                    },
                    {
                        header: (
                            <Text
                                textAlign="right">Balances</Text>
                        ), dataExtractor: (item) => (
                            <Text
                                textAlign="right">{dollars(item.balance)}</Text>
                        ), width: 'sm'
                    },
                ]}
            />
        </VStack>
    );
}