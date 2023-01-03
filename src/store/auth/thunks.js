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
        const {ok, uid, photoURL, errorMessage} = await registerWithEmailAndPassword({email, password, displayName});
        if(!ok) return dispatch(logout({errorMessage}));

        dispatch( login({uid, displayName, email ,photoURL}));
    }
}

export const startLoginWithEmailAndPassword = ({email, password}) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
        const {ok, uid, photoUrl, displayName ,errorMessage} = await loginWithEmailAndPassword({email, password});
        if(!ok) return dispatch(logout({errorMessage}));

        dispatch( login({uid,displayName, email, photoUrl}));
    }
}

export const startLogOut = () => {
    return async( dispatch ) => {
        await logOutFirebase();

    dispatch(clearNotesLogOut());
    dispatch(logout({}));
    }
}