import React from 'react' 
import NextLink from 'next/link'
import { Box, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material'
import { CartList, OrdenSummary } from '../../components/cart'
import { ShopLayout } from '../../components/layout'
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material'

const OrderPage = () => {
  return (
    <ShopLayout title='Resumen de la orden 123456' pageDescription='Resumen de la orden'>
        <Typography variant='h1' component='h1'>
            Orden: 12345
        </Typography>
        {/* <Chip 
            sx={{ my: 2 }}
            label="Pendiente de pago"
            variant="outlined"
            color="error"
            icon={<CreditCardOffOutlined />}
        /> */}
        <Chip 
            sx={{ my: 2 }}
            label="Pagada"
            variant="outlined"
            color="success"
            icon={<CreditScoreOutlined />}
        />
        <Grid container>
            <Grid item xs={12} sm={ 7 }>
                <CartList editable={false} />
            </Grid>
            <Grid item xs={12} sm={ 5 }>
                <Card>
                    <CardContent>
                        <Typography variant='h2'>Resulmen (3 productos)</Typography>
                        <Divider sx={{ my: 1 }}/>
                        <Box display='flex' justifyContent='end'>
                            <NextLink href='/checkout/address' passHref>
                                <Link underline='always' className='a'>
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>
                        <Typography variant='subtitle1'>Direccion de entrega</Typography>
                        <Typography>Adxell Aranago</Typography>
                        <Typography>Barranquilla-Colombi</Typography>
                        <Typography>Kr 28 # 12-08</Typography>
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
                            {/* TODO */}
                            <Typography variant='h1' component='h1'>Pagar</Typography>
                        </Box>
                        <Chip 
                            sx={{ my: 2 }}
                            label="Pagada"
                            variant="outlined"
                            color="success"
                            icon={<CreditScoreOutlined />}
                        />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default OrderPage