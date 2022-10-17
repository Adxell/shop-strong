import React, { useContext, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { Box, Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { ShopLayout } from '../../components/layout'
import { countries, jwt } from '../../utils'
import { Controller, useForm } from 'react-hook-form'
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

const getAddressFromCookies = (cleanRender: boolean): FormData => {
    return {
        firstName: cleanRender ? '' : Cookies.get('firstName') || '',
        lastName:  cleanRender ? '' :  Cookies.get('lastName')  || '',
        address:   cleanRender ? '' :  Cookies.get('address')   || '',
        address2:  cleanRender ? '' :  Cookies.get('address2')  || '',
        zip:       cleanRender ? '' :  Cookies.get('zip')       || '',
        city:      cleanRender ? '' :  Cookies.get('city')      || '',
        country:   cleanRender ? '' :  Cookies.get('country')   || '',
        phone:     cleanRender ? '' :  Cookies.get('phone')     || '',
    }
}
const AddressPage = () => {

    const router = useRouter()

    const { updateAddres, shippingAddress } = useContext(CartContext)

    const { register, reset, control, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: {...getAddressFromCookies(true)}
    })

    useEffect(() => {
		reset(getAddressFromCookies(false));
	}, [reset]);

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
                    <Controller
							name='firstName'
							control={control}
							rules={{ required: 'Este campo es requerido' }}
							defaultValue={''}
							render={({ field }) => (
								<TextField
									label='Nombre'
									variant='filled'
									value={field.value}
									onChange={field.onChange}
									fullWidth
									error={!!errors.firstName}
									helperText={errors.firstName?.message}
								/>
							)}
						/>
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <Controller
							name='lastName'
							control={control}
							rules={{ required: 'Este campo es requerido' }}
							defaultValue={''}
							render={({ field }) => (
								<TextField
									label='Apellido'
									variant='filled'
									value={field.value}
									onChange={field.onChange}
									fullWidth
									error={!!errors.lastName}
									helperText={errors.lastName?.message}
								/>
							)}
						/>
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <Controller
							name='address'
							control={control}
							rules={{ required: 'Este campo es requerido' }}
							defaultValue={''}
							render={({ field }) => (
								<TextField
									label='Dirección'
									variant='filled'
									value={field.value}
									onChange={field.onChange}
									fullWidth
									error={!!errors.address}
									helperText={errors.address?.message}
								/>
							)}
						/>
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <Controller
							name='address2'
							control={control}
							defaultValue={''}
							render={({ field }) => (
								<TextField
									label='Dirección 2 (opcional)'
									variant='filled'
									value={field.value}
									onChange={field.onChange}
									fullWidth
								/>
							)}
						/>
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                   <Controller
							name='zip'
							control={control}
							rules={{ required: 'Este campo es requerido' }}
							defaultValue={''}
							render={({ field }) => (
								<TextField
									label='Código Postal'
									variant='filled'
									value={field.value}
									onChange={field.onChange}
									fullWidth
									error={!!errors.zip}
									helperText={errors.zip?.message}
								/>
							)}
						/>
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                        <Controller
							name='city'
							control={control}
							rules={{ required: 'Este campo es requerido' }}
							defaultValue={''}
							render={({ field }) => (
								<TextField
									label='Ciudad'
									variant='filled'
									value={field.value}
									onChange={field.onChange}
									fullWidth
									error={!!errors.city}
									helperText={errors.city?.message}
								/>
							)}
						/>
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    {/* <FormControl fullWidth>
                        <TextField
                            key={ Cookies.get('country')  || countries[0].code }
                            select
                            variant='filled'
                            label='Pais'
                            defaultValue={Cookies.get('country')}
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
                    </FormControl> */}
                   <Controller
							name='country'
							control={control}
							rules={{ required: 'Este campo es requerido' }}
							defaultValue={''}
							render={({ field }) => (
								<FormControl fullWidth error={!!errors.country}>
									<InputLabel>Country</InputLabel>
									<Select {...field} label='Country'>
										{countries.map(country => (
											<MenuItem key={country.code} value={country.code}>
												{country.name}
											</MenuItem>
										))}
									</Select>
									<FormHelperText>{errors.country?.message}</FormHelperText>
								</FormControl>
							)}
						/>
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                        <Controller
							name='phone'
							control={control}
							rules={{ required: 'Este campo es requerido' }}
							defaultValue={''}
							render={({ field }) => (
								<TextField
									label='Teléfono'
									variant='filled'
									value={field.value}
									onChange={field.onChange}
									fullWidth
									error={!!errors.phone}
									helperText={errors.phone?.message}
								/>
							)}
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