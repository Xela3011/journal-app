import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material"
import { Button, Grid, Link, TextField, Typography,Alert } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { startGoogleSignIn, startLoginWithEmailAndPassword } from "../../store/auth/thunks";
import { useMemo } from "react";


const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {

  const { status, errorMessage } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const {email,password, onInputChange} = useForm(formData);

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch( startLoginWithEmailAndPassword({email,password}));
  }

  const onGoogleSignIn = () => {
    dispatch( startGoogleSignIn());
  }

  return (

    <AuthLayout title="Login">
          <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster"
              aria-label="submit-form">
              <Grid container>
                  <Grid item xs={12} sx={{mt:2}}>
                    <TextField label="Correo" type="email" name="email" placeholder="example@email.com" fullWidth 
                    onChange={onInputChange}/>
                  </Grid>

                  <Grid item xs={12} sx={{mt:2}}>
                    <TextField label="Contraseña" type="password" name="password" placeholder="Contraseña" fullWidth
                    inputProps={{'data-testid': 'password'}}
                    onChange={onInputChange}/>
                  </Grid>


                  <Grid container spacing={2} sx={{mt: 1, mb: 2}}>
                      <Grid item xs={12} sm={12} display={!!errorMessage ? '' : 'none'}>
                          <Alert severity="error">{errorMessage}</Alert>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                          <Button type="submit" variant='contained' fullWidth disabled={isAuthenticating}
                          >Login</Button>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                          <Button variant='contained' fullWidth disabled={isAuthenticating} onClick={onGoogleSignIn}
                            aria-label="google-btn">
                            <Google />
                            <Typography sx={{ml: 1}}>Google</Typography>
                          </Button>
                      </Grid>
                  </Grid>


                  <Grid container direction="row" justifyContent="end">
                      <Link component={RouterLink} color='inherit' to='/auth/register'>     
                          Crear una cuenta
                      </Link>
                  </Grid>
              </Grid>
          </form>
    </AuthLayout>

  )
}
