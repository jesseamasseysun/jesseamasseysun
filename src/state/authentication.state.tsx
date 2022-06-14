import { FunctionComponent, createContext, useReducer, useContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from "react";

export type User = {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
}

export type Authentication = {
    refreshToken: string;
    token: string;
}

type State = {
    user: User;
    authentication: Authentication;
    authenticationState: 'authenticated' | 'unauthenticated' | 'unverified';
};

type Actions =
    | { type: 'SET_USER', payload: User }
    | { type: 'SET_AUTHENTICATION', payload: Authentication }
    | { type: 'SET_UNAUTHENTICATED' }

const reducer = (state: State, action: Actions): State => {
    switch (action.type) {
        case 'SET_USER': return { ...state, user: action.payload };
        case 'SET_AUTHENTICATION': return { ...state, authentication: action.payload, authenticationState: 'authenticated' };
        case 'SET_UNAUTHENTICATED': return { authenticationState: 'unauthenticated' } as State;
        default: return state;
    }
}

const AppStateContext = createContext({} as State);
const AppDispatchContext = createContext({} as React.Dispatch<Actions>);

export const AuthenticationStateProvider: FunctionComponent = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, {
        authenticationState: 'unverified'
    } as State);

    useEffect(() => {
        if (state?.authentication) persisteState('authentication', state?.authentication);
        if (state?.user) persisteState('user', state?.user);

        if (state.authenticationState === 'unverified') {
            retrieveState<Authentication>('authentication')
                .then(payload => {
                    if (payload) dispatch({ type: 'SET_AUTHENTICATION', payload });
                });

            retrieveState<User>('user')
                .then(payload => {
                    if (payload) dispatch({ type: 'SET_USER', payload })
                });
        } else if (state.authenticationState === 'unauthenticated') {
            clearState('authentication');
            clearState('user');
        }
    }, [state, persisteState, retrieveState, dispatch]);

    return (
        <AppDispatchContext.Provider value={dispatch}>
            <AppStateContext.Provider value={state}>{children}</AppStateContext.Provider>
        </AppDispatchContext.Provider>
    );
}

export const userUserState = () => useContext(AppStateContext)?.user;
export const userAuthentication = () => useContext(AppStateContext)?.authentication;
export const userAuthenticationState = () => useContext(AppStateContext)?.authenticationState;
export const useAuthenticationDispatch = () => useContext(AppDispatchContext);

const persisteState = async <T,>(key: string, state: T) => {
    await AsyncStorage.setItem(key, JSON.stringify(state));
}

const retrieveState = async <T,>(key: string): Promise<T> => {
    return JSON.parse((await AsyncStorage.getItem(key) ?? '{}'));
}

const clearState = async (key: string): Promise<void> => {
    await AsyncStorage.removeItem(key);
}