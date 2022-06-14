import axios from "axios";
import useSWR from "swr";
import { useMemo, useReducer, useState } from "react";
import { baseUrl } from "../configuration/url";
import { userAuthentication } from "../state/authentication.state";

type ODataParameters = {
    endpoint: string;
    orderBy?: string;
    filterBy?: string;
    expand?: string;
    top?: number;
    skip?: number;
    select?: string;
    count?: boolean;
};

type State = {
    orderByColumn: "";
    orderByDirection: "asc" | "desc";
    filterBy: string;
    page: number;
}

type Actions =
    | { type: "SET_ORDER_BY", payload: "" }

const reducer = (state: State, action: Actions) => {
    switch (action.type) {
        case "SET_ORDER_BY": return { ...state };
        default: return { ...state };
    }
}

export const useD = () => {
    const [state, dispatch] = useReducer(reducer, {} as State);

    return {
        nextPage: () => {
            
        }
    }
}

export const useOdata = <T,>({ endpoint, select, expand }: ODataParameters) => {
    const [orderBy, setOrderBy] = useState<{ column: string, direction: "asc" | "desc" }>();
    const [filterBy] = useState("undefined");

    const [page, setPage] = useState(0);
    const { token } = userAuthentication();

    const parameters = useMemo(() => {
        return [
            `$orderby=${orderBy?.column ? `${orderBy.column} ${orderBy.direction}` : undefined}`,
            `$filterby=${filterBy}`,
            `$expand=${expand}`,
            `$skip=${page * 15}`,
            `$top=${15}`,
            `$select=${select}`,
            `$count=true`,]
            .filter(value => value.split('=')[1] !== 'undefined')
            .join('&');
    }, [orderBy, page]);

    const url = `${baseUrl}/odata/${endpoint}?${parameters}`;

    const fetcher = (url: string) => axios.get(
        url,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(({ data }) => {
            return {
                results: data?.value as T,
                count: data?.['@odata.count']
            };
        });

    const results = useSWR(url, fetcher);

    return {
        nextPage: () => { setPage(page + 1); },
        prevPage: () => { if (page > 0) setPage(page - 1); },
        toggleOrderBy: (column: string) => {
            setOrderBy({ column, direction: orderBy?.direction === "asc" ? "desc" : "asc" })
        },
        data: results?.data?.results,
        count: results?.data?.count
    }
}
