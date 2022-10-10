import React from 'react' 
import NextLink from 'next/link'
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material'
import { CartList, OrdenSummary } from '../../components/cart'
import { ShopLayout } from '../../components/layout'

const SummaryPage = () => {
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