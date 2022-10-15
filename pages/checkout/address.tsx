import React, { useContext } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { ShopLayout } from '../../components/layout'
import { countries, jwt } from '../../utils'
import { useForm } from 'react-hook-form'
import Cookies from 'js-cookie'
import { CartContext } from '../../context'

type FormData = {
    firstName : string;
    lastName  : string;
    address   : string;
    address2? : string;
    zip       : string;
    city      : string;
    country   : string;
    phone     : string;
}

const getAddresFromCookie = (): FormData => {
    return {
        firstName:  Cookies.get('firstName') || '',
        lastName:   Cookies.get('lastName')  || '',
        address:    Cookies.get('address')   || '',
        address2:   Cookies.get('address2')  || '',
        zip:        Cookies.get('zip')       || '',
        city:       Cookies.get('city')      || '',
        country:    Cookies.get('country')   || '',
        phone:      Cookies.get('phone')     || '',
    }
}
const AddressPage = () => {

    const router = useRouter()

    const { updateAddres, shippingAddress } = useContext(CartContext)

    const { register, handleSubmit, formState: { errors }} = useForm<FormData>({
        defaultValues: getAddresFromCookie()
    })
    const onSubmitAddress = ( data: FormData ) => {
        updateAddres(data)
        router.push('/checkout/summary')
    } 
  return (
    <ShopLayout title='Direccion' pageDescription='Confinar direccion del destino'>
        <form onSubmit={handleSubmit(onSubmitAddress)}>
            <Typography variant='h1' component='h1'>
                Direccion 
            </Typography>
            <Grid container spacing={ 2 } sx={{ mt: 2}}>
                <Grid item xs={12} sm={ 6 }>
                    <TextField 
                     label='Nombre'
                     variant='filled'
                     fullWidth
                     {
                        ...register('firstName', {
                            required: 'Este campo es obligatorio',
                        })
                     }
                     error = {!!errors.firstName}
                     helperText = { errors.firstName?.message}
                     />
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <TextField 
                        label='Apellido'
                        variant='filled'
                        fullWidth
                        {
                        ...register('lastName', {
                            required: 'Este campo es obligatorio',
                        })
                        }
                        error = {!!errors.lastName}
                        helperText = { errors.lastName?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <TextField 
                        label='Direccion'
                        variant='filled'
                        fullWidth
                        {
                        ...register('address', {
                            required: 'Este campo es obligatorio',
                        })
                        }
                        error = {!!errors.address}
                        helperText = { errors.address?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <TextField 
                        label='Direccion 2 (opcional)' 
                        variant='filled'
                        fullWidth
                        {
                        ...register('address2', {
                            required: false,
                        })
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <TextField 
                        label='Codigo postal'
                        variant='filled'
                        fullWidth
                        {
                            ...register('zip', {
                                required: 'Este campo es obligatorio',
                            })
                        }
                        error = {!!errors.zip}
                        helperText = { errors.zip?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <TextField 
                        label='Ciudad'
                        variant='filled'
                        fullWidth
                        {
                            ...register('city', {
                                required: 'Este campo es obligatorio',
                            })
                        }
                        error = {!!errors.city}
                        helperText = { errors.city?.message}
                    />
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <FormControl fullWidth>
                        <TextField
                            key={ Cookies.get('country')  || countries[0].code }
                            select
                            variant='filled'
                            label='Pais'
                            defaultValue={Cookies.get('country')  || countries[0].code}
                            {
                                ...register('country', {
                                    required: 'Este campo es obligatorio',
                                })
                            }
                            error = {!!errors.country}
                            // helperText = { errors.country?.message}
                        >
                            {
                                countries.map((country)=>(
                                    <MenuItem 
                                        key={ country.code } 
                                        value={country.code}
                                    > {country.name} </MenuItem>
                                ))
                            }
                        </TextField>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <TextField 
                        label='Telefono'
                        variant='filled'
                        fullWidth
                        {
                            ...register('phone', {
                               required: 'Este campo es obligatorio',
                                })
                        }
                        error = {!!errors.phone}
                        helperText = { errors.phone?.message}
                        />
                </Grid>
            </Grid>

            <Box sx={{ mt: 5}} display='flex' justifyContent='center' >
                <Button 
                    color='secondary' 
                    className='circular-btn' 
                    size='large'
                    type='submit'
                >
                    Revisar pedido
                </Button>
            </Box>
        </form>
    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// export const getServerSideProps: GetServerSideProps = async ({req}) => {

//     const { token = '' } = req.cookies;
//     let isvalidToken = false
//     try {
//         await jwt.isValidToken( token )
//         isvalidToken=true
//     } catch (error) {
//         isvalidToken=false
//     }

//     if( !isvalidToken ){
//         return {
//             redirect: {
//                 destination: '/auth/login?p=/checkout/address',
//                 permanent: false
//             }
//         }
//     }
//     return {
//         props: {
            
//         }
//     }
// }

export default AddressPage