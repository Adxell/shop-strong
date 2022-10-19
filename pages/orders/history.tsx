import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Chip, Grid, Link, Typography } from '@mui/material'
import { ShopLayout } from '../../components/layout'
import NextLink from 'next/link'
import { getSession } from 'next-auth/react'
import { dbOrders } from '../../database'
import { IOrder } from '../../interfaces'


const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', width: 100},
    {field: 'fullname', headerName: 'Nombre Completo', width: 300},
    {
        field: 'paid',
        headerName: 'Pagada',
        description: 'Muestra informacion so ests pagada la orden o no',
        width: 200,
        renderCell: (params) => {
            return (
                params.value
                    ? <Chip color="success" label="Pagada" variant='outlined' />
                    : <Chip color="error" label="No pagada" variant='outlined' />
            )
        }
    },
    {
        field: 'orden',
        headerName: 'Ver orden',
        description: 'Muestra informacion so ests pagada la orden o no',
        width: 200,
        sortable: false,
        renderCell: (params) => {
            return (
                <NextLink href={`/orders/${ params.row.order }`} passHref>
                    <Link underline='always'>
                        Ver orden
                    </Link>
                </NextLink>
            )
        }
    },
]

interface Props{
    orders: IOrder[]
}
const HistoryPage: NextPage<Props> = ({ orders }) => {
    console.log(orders)
    const rows = orders.map( (order, id) => ({
        id: id + 1,
        paid: order.isPaid,
        fullname: `${ order.shippingAddress.firstName } ${ order.shippingAddress.lastName }`,
        order: order._id
    }))
  return (
    <ShopLayout title={'Historial de compras'} pageDescription={'Historial de ordenes del cliente'}>
        <Typography variant='h1' component='h1'>Historial de ordenes</Typography>
        <Grid container>
            <Grid item xs={12} sx={{ height:650, width: '100%' }}>
            <DataGrid
                rows={ rows }
                columns={ columns }
                pageSize={10}
                rowsPerPageOptions={ [10] }
            />
            </Grid>
        </Grid>
    </ShopLayout>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session: any = await getSession({ req }) 

    if ( !session ) {
        return {
            redirect: {
                destination: '/auth/login?p=/orders/history',
                permanent: false
            }
        }
    }

    const orders = await dbOrders.getOrderByUser( session.user.id )

    return {
        props: {
            orders
        }
    }
}
export default HistoryPage