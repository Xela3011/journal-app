import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth,googleProvider);
        //const credentials = GoogleAuthProvider.credentialFromResult(result);
        const {displayName, email, photoURL, uid} = result.user;
        return {
            ok: true,
            //User Info
            displayName, email, photoURL, uid
        }
    } catch (error) {
        const errorMessage = error.message;
        return {
            ok: false,
            errorMessage
        }
    }
}


export const registerWithEmailAndPassword = async ({email, password, displayName}) => {
    try {
        
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email,password);
        const {uid, photoURL} = resp.user;
        await updateProfile( FirebaseAuth.currentUser, {displayName});
        return {
            ok: true,
            uid, photoURL,email, displayName
        }
    } catch (error) {
        const errorMessage = error.message;
        return {
            ok: false,
            errorMessage
        }
    }
}

export const loginWithEmailAndPassword = async({email, password}) => {
    try {
            //!signInWithEmailAndPassword
            const resp = await signInWithEmailAndPassword(FirebaseAuth,email, password);
            const {uid, displayName,photoURL} = resp.user;
            return {
                ok:true,
                uid, photoURL, displayName, email
            }
    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const logOutFirebase = async() => {
    return await FirebaseAuth.signOut();
}