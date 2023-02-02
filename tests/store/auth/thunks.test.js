import { loginWithEmailAndPassword, logOutFirebase, registerWithEmailAndPassword, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuthentication, startCreatingUserWithEmailAndPassword, startGoogleSignIn, startLoginWithEmailAndPassword, startLogOut } from "../../../src/store/auth/thunks"
import { clearNotesLogOut } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock('../../../src/firebase/providers');

describe('Pruebas en AuthThunks', () => { 
    
    const dispatch = jest.fn();
    beforeEach(() => jest.clearAllMocks());
    
    test('debe de invocar el checking-credentials', async() => { 
        await checkingAuthentication()(dispatch);
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
     })

     test('startGoogleSignIn debe de llamar checkingCredentials y login - Éxito ',
      async() => { 
            const loginData = {ok: true, ...demoUser };
            await signInWithGoogle.mockResolvedValue(loginData);
            await startGoogleSignIn()(dispatch);    

            expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
            expect( dispatch ).toHaveBeenCalledWith( login(loginData) );

       })

       test('startGoogleSignIn debe de llamar checkingCredentials y logout - Error ',
      async() => { 
            const loginData = {ok: false, errorMessage: 'Google error' };  
            await signInWithGoogle.mockResolvedValue(loginData);  
            await startGoogleSignIn()(dispatch);    
            expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
            expect( dispatch ).toHaveBeenCalledWith( logout(loginData.errorMessage));

       })


       test('startLoginWithEmailAndPassword debe de llamar checkingCredentials y login - Éxito ', 
       async() => { 
            const loginData = {ok: true, ...demoUser };
            const formData = {email: demoUser.email, password: '123456'};
            await loginWithEmailAndPassword.mockResolvedValue( loginData );
            await startLoginWithEmailAndPassword(formData)(dispatch);

            expect( dispatch ).toHaveBeenCalledWith( checkingCredentials());
            expect( dispatch ).toHaveBeenCalledWith( login( loginData ));
        })

        
       test('startLoginWithEmailAndPassword debe de llamar checkingCredentials y logout - Error ', 
       async() => { 
            const loginData = {ok: false, errorMessage: 'Error de Login' };
            const formData = {email: demoUser.email, password: '123456'};
            await loginWithEmailAndPassword.mockResolvedValue( loginData );
            await startLoginWithEmailAndPassword(formData)(dispatch);

            expect( dispatch ).toHaveBeenCalledWith( checkingCredentials());
            expect( dispatch ).toHaveBeenCalledWith(logout(loginData.errorMessage));
        })

        test('startCreatingUserWithEmailAndPassword debe de llamar checkingCredentials y login - Éxito ', 
        async() => { 
             const loginData = {ok: true, ...demoUser };
             const formData = {email: demoUser.email, password: '123456', displayName: 'Demo User'};
             await registerWithEmailAndPassword.mockResolvedValue( loginData );
             await startCreatingUserWithEmailAndPassword(formData)(dispatch);
 
             expect( dispatch ).toHaveBeenCalledWith( checkingCredentials());
             expect( dispatch ).toHaveBeenCalledWith( login( loginData ));
         })

         test('startCreatingUserWithEmailAndPassword debe de llamar checkingCredentials y logout - Error ', 
        async() => { 
            const loginData = {ok: false, errorMessage: 'Error de Creación' };
             const formData = {email: demoUser.email, password: '123456', displayName: 'Demo User'};
             await registerWithEmailAndPassword.mockResolvedValue( loginData );
             await startCreatingUserWithEmailAndPassword(formData)(dispatch);
 
             expect( dispatch ).toHaveBeenCalledWith( checkingCredentials());
             expect( dispatch ).toHaveBeenCalledWith( logout(loginData.errorMessage));
         })


         test('startLogout debe de llamar logoutFirebase, clearNotes y logout', 
         async() => { 
            await startLogOut()(dispatch);
            expect(logOutFirebase).toHaveBeenCalled();
            expect( dispatch ).toHaveBeenCalledWith(clearNotesLogOut());
            expect( dispatch ).toHaveBeenCalledWith(logout({}));
          })
 })