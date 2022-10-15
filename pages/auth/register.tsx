import NextLink from 'next/link';
import { useForm } from 'react-hook-form'
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../../components/layout';
import { validation } from '../../utils';
import { useContext, useState } from 'react';
import { ErrorOutline } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context';

type FormData = {
    name: string;
    email: string;
    password: string;
}
const RegisterPage = () => {
    const router = useRouter()
    const { registerUser } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } =  useForm<FormData>()
    const [showError, setShowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onRegisterForm = async ({name, email, password}: FormData ) => {
        setShowError(false)

        const { hasError, message } = await registerUser(name, email, password)
        
        if ( hasError ) {
            setShowError(true)
            setErrorMessage( message! )
            setTimeout(()=> setShowError(false), 3000)
            return 
        }
        const destination = router.query.p?.toString() || '/';
        router.replace(destination)
    }

  return (
    <AuthLayout title={'Ingresar'}>
        <form onSubmit={handleSubmit(onRegisterForm)}>
        <Box sx={{ width: 350, padding:'30px 20px', mt: 5 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component="h1">Crear cuenta</Typography>
                        <Chip 
                            label ="No se puede agregar usuario"
                            color="error"
                            icon={<ErrorOutline />}
                            className="fadeIn"
                            sx={{ display: showError? 'flex': 'none' }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField 
                            label="Nombre completo" 
                            variant="filled" 
                            fullWidth 
                            { ...register('name',{
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Minimo 2 caracteres'}
                            })}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            type="email"
                            label="Correo" 
                            variant="filled" 
                            fullWidth 
                            { ...register('email',{
                                required: 'Este campo es requerido',
                                validate: validation.isEmail
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            type='password' 
                            label="Contraseña" 
                            variant="filled" 
                            fullWidth 
                            { ...register('password',{
                                required: 'Este campo es requerido',
                                minLength: { value: 6, message: 'Minimo 6 caracteres'}
                            })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            type="submit" 
                            color="secondary" 
                            className='circular-btn' 
                            size='large' 
                            fullWidth
                        >
                            Ingresar
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12} display='flex' justifyContent='end'>
                    <NextLink 
                        href={ router.query.p ? `/auth/register?=${router.query.p}`: '/auth/register'} 
                        passHref
                    >
                        <Link underline='always'>
                            ¿Ya tienes cuenta?
                        </Link>
                    </NextLink>
                </Grid>
        </Box>
        </form>
    </AuthLayout>
  )
}

export default RegisterPage