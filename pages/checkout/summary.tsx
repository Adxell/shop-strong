import React, { useContext, useEffect } from 'react' 
import Cookies from 'js-cookie'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material'
import { CartList, OrdenSummary } from '../../components/cart'
import { ShopLayout } from '../../components/layout'
import { CartContext } from '../../context'
import { countries } from '../../utils'

const SummaryPage = () => {
    const router = useRouter()
    const { shippingAddress, numberOfItems } = useContext(CartContext)
    useEffect(()=>{
        if(!Cookies.get('firstName')){
        router.push('/checkout/address')
        }
    }, [router])
    if ( !shippingAddress ) {
        return (<></>)
    }
  return (
    <ShopLayout title='Resumen de la orden' pageDescription='Resumen de la orden'>
        <Typography variant='h1' component='h1'>
            Resumen de la orden
        </Typography>

        <Grid container>
            <Grid item xs={12} sm={ 7 }>
                <CartList editable={false} />
            </Grid>
            <Grid item xs={12} sm={ 5 }>
                <Card>
                    <CardContent>
                        <Typography variant='h2'>Resumen ( {numberOfItems}  {numberOfItems > 1 ? `productos`:  `producto`} )</Typography>
                        <Divider sx={{ my: 1 }}/>
                        <Box display='flex' justifyContent='end'>
                            <NextLink href='/checkout/address' passHref>
                                <Link underline='always' className='a'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>
                        <Typography variant='subtitle1'>Direccion de entrega</Typography>
                        <Typography>{`${shippingAddress?.firstName} ${shippingAddress?.lastName}`}</Typography>
                        <Typography>{`${countries.find( c => c.code === shippingAddress?.country )?.name } - ${shippingAddress?.city}`}</Typography>
                        <Typography>{`${shippingAddress?.address}`}</Typography>
                        <Typography>{`${shippingAddress?.zip}`}</Typography>
                        <Typography>{`${shippingAddress?.phone}`}</Typography>
                        <Divider sx={{ my: 1 }}/>
                        <Box display='flex' justifyContent='end'>
                            <NextLink href='/cart' passHref>
                                <Link underline='always' className='a'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>
                        <OrdenSummary/>

                        <Box sx={{ mt: 3 }}>
                            <Button color='secondary' className='circular-btn' fullWidth>
                                Confimar orden
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default SummaryPage