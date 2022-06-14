import { Button } from "native-base";
import { IButtonComponentType } from "native-base/lib/typescript/components/primitives/Button/types";
import { useAuthenticationDispatch, userUserState } from "../state/authentication.state";

export const SignoutButton: Exclude<IButtonComponentType, "onPress"> = (props) => {
    const dispatch = useAuthenticationDispatch();

    return <Button onPress={() => dispatch({ type: 'SET_UNAUTHENTICATED' })} {...props}>Signout</Button>;
}