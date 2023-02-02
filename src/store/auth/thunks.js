import { signInWithGoogle, registerWithEmailAndPassword, loginWithEmailAndPassword, logOutFirebase} from "../../firebase/providers";
import { clearNotesLogOut } from "../journal/journalSlice";
import { checkingCredentials, logout, login } from "./authSlice"


export const checkingAuthentication = (email, password) => {
    return async( dispatch) => {
        dispatch(checkingCredentials() );
    }
}

export const startGoogleSignIn = () => {
    return async( dispatch ) => {
        dispatch( checkingCredentials());
        const result = await signInWithGoogle();
        if( !result.ok) return dispatch(logout(result.errorMessage));

        dispatch(login(result));

    }
}

export const startCreatingUserWithEmailAndPassword = ({email,password, displayName}) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials());
        const result = await registerWithEmailAndPassword({email, password, displayName});
        if(!result.ok) return dispatch(logout(result.errorMessage));

        dispatch( login(result));
    }
}

export const startLoginWithEmailAndPassword = ({email, password}) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
        const result = await loginWithEmailAndPassword({email, password});
        if(!result.ok) return dispatch(logout(result.errorMessage));

        dispatch( login(result));
    }
}

export const startLogOut = () => {
    return async( dispatch ) => {
        await logOutFirebase();
        dispatch(clearNotesLogOut());
        dispatch(logout({}));
    }
}