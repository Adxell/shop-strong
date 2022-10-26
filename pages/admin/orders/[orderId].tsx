import React from 'react'
import { GetServerSideProps, NextPage } from 'next'

import { Box, Card, CardContent, Chip, Divider, Grid, Typography } from '@mui/material'
import { CartList, OrdenSummary } from '../../../components/cart'
import { AdminLayout } from '../../../components/layout'
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material'
import { dbOrders } from '../../../database'
import { IOrder } from '../../../interfaces'


interface Props {
    order: IOrder;
}

const OrderDescription: NextPage<Props> = ({ order }) => {
    const { shippingAddress } = order;

    return (
        <AdminLayout 
            title='Resumen de la orden' 
            subTitle={`Orden ${order._id}`}>
            {
                order.isPaid
                    ? (
                        <Chip
                            sx={{ my: 2 }}
                            label="Pagada"
                            variant="outlined"
                            color="success"
                            icon={<CreditScoreOutlined />}
                        />
                    ) :
                    (
                        <Chip
                            sx={{ my: 2 }}
                            label="Pendiente de pago"
                            variant="outlined"
                            color="error"
                            icon={<CreditCardOffOutlined />}
                        />
                    )
            }
            <Grid container className="fadeIn">
                <Grid item xs={12} sm={7}>
                    <CartList editable={false} products={order.orderItems} />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card>
                        <CardContent>
                            <Typography variant='h2'>Resulmen ({order.numberOfItems} {order.numberOfItems > 1 ? 'productos' : 'producto'})</Typography>
                            <Divider sx={{ my: 1 }} />
                            <Typography variant='subtitle1'>Direccion de entrega</Typography>
                            <Typography>{shippingAddress.firstName} {shippingAddress.lastName}</Typography>
                            <Typography>{shippingAddress.city}-{shippingAddress.country}</Typography>
                            <Typography>{shippingAddress.address} {shippingAddress.address2 ? `${shippingAddress.address2}` : ''}</Typography>
                            <Typography>{shippingAddress.zip}</Typography>
                            <Typography>{shippingAddress.phone}</Typography>
                            <Divider sx={{ my: 1 }} />

                            <OrdenSummary
                                orderValues={{
                                    numberOfItems: order.numberOfItems,
                                    subTotal: order.subTotal,
                                    tax: order.tax,
                                    total: order.total
                                }}
                            />

                            <Box sx={{ mt: 3 }} display='flex' flexDirection="column">

                               

                                <Box
                                    flexDirection='column'
                                    sx={{ display: 'flex', flex: 1 }}>
                                {
                                    order.isPaid
                                        ? (
                                            <Chip
                                                sx={{ my: 2 }}
                                                label="Pagada"
                                                variant="outlined"
                                                color="success"
                                                icon={<CreditScoreOutlined />}
                                            />
                                        ) :
                                        (
                                             <Chip
                                                sx={{ my: 2 }}
                                                label="Cancelar pago"
                                                variant="outlined"
                                                color="error"
                                                icon={<CreditCardOffOutlined />}
                                            />
                                        )
                                }
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </AdminLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const { orderId = '' } = query;
    const order = await dbOrders.getOrderById(orderId.toString());


    if (!order) {
        return {
            redirect: {
                destination: `/admin/orders`,
                permanent: false
            }
        }
    }

    return {
        props: {
            order
        }
    }
}

export default OrderDescription