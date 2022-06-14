import { HStack, VStack, Text, Box, ScrollView, Divider } from 'native-base';
import React from 'react';

type Width = Parameters<typeof Box>[0]['width'];

type DataListColumn<T> = {
    header: JSX.Element | string;
    width?: Width;
    dataExtractor: (item: T, index: number) => JSX.Element | string | number;
}

type DataListProps<T> = {
    data: T[];
    keyExtractor: (item: T) => string;
    columns: DataListColumn<T>[];
    condensed?: boolean;
}

export const DataList = <T,>({ condensed, keyExtractor, columns, data }: DataListProps<T>) => {
    const padding = condensed ? "2" : "3";

    return (
        <VStack
            flex={1}>
            <HStack>
                {columns.map(({ header, width }, index) => (
                    <Box
                        key={index}
                        width={width ?? 'sm'}
                        p={padding}>
                        {header}
                    </Box>
                ))}
            </HStack>
            <Divider
                thickness="2" />
            {
                data.map((item, rowIndex) => (
                    <VStack
                        key={keyExtractor(item)}>
                        <HStack>
                            {columns.map((column, columnIndex) => (
                                <Box
                                    key={columnIndex}
                                    w={column.width ?? 'sm'}
                                    p={padding}>
                                    {column.dataExtractor(item, rowIndex)}
                                </Box>
                            ))}
                        </HStack>
                        <Divider />
                    </VStack>
                ))}
        </VStack>
    );
};