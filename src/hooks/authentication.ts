import { useState } from "react";
import { signin } from "../services/authentication";
import { useAuthenticationDispatch } from "../state/authentication.state";

export
    const useSignin = () => {
        const dispatch = useAuthenticationDispatch();
        const [username, setUsername] = useState('jesse.massey@sunoco.com');
        const [password, setPassword] = useState('POIUqwer-10');
        const [isBusy, setIsBusy] = useState(false);

        return {
            username,
            password,
            isBusy,
            setUsername,
            setPassword,
            handleOnSignin: async () => {
                setIsBusy(true);

                const results = await signin(username, password);

                setIsBusy(false);
                
                if (results) {
                    const { token, user: { firstName, lastName, userId, userName } } = results;
                    dispatch({
                        type: 'SET_AUTHENTICATION', payload: {
                            token,
                            refreshToken: token,
                        }
                    });

                    dispatch({
                        type: 'SET_USER',
                        payload: {
                            userName,
                            firstName,
                            lastName,
                            id: userId
                        }
                    });
                }
            }
        }
    }