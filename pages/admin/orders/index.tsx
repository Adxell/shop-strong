import { ConfirmationNumberOutlined } from '@mui/icons-material'
import { Chip, Grid } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React, { useMemo } from 'react'
import useSWR from 'swr'
import { AdminLayout } from '../../../components/layout'
import { FullScreenLoading } from '../../../components/ui'
import { IOrder, IUser } from '../../../interfaces'

const columns: GridColDef[] = [
    {field: 'id', headerName: 'Order ID', width: 250},
    {field: 'email', headerName: 'Correo', width: 250},
    {field: 'name', headerName: 'Nombre completo', width: 250},
    {field: 'total', headerName: 'Order total', width: 150},
    {
        field: 'isPaid',
        headerName: 'Pagada',
        width: 150,
        renderCell: ({row})=>{
            return row.isPaid
            ? ( <Chip variant='outlined' label='Pagada' color='success' />)
            : ( <Chip variant='outlined' label='Pendiente' color='error' />)
        }
    },
    {field: 'noProducts', headerName: 'No. Prductos', align: 'center'},
    {
        field: 'check',
        headerName: 'Ver orden',
        renderCell: ({row})=>{
            return (
                <a href={`/admin/orders/${row.id}`} target='_blank' rel='noreferrer'>
                    ver order
                </a>
            )
        }
    },
    {field: 'createAt', headerName: 'Fecha de creación', width: 300},

]


const OrderPage = () => {

    const {data, error} = useSWR<IOrder[]>('/api/admin/orders')

    const rows = useMemo(()=> { 
        if ( data ) {
            return (
                data.map( order => ({
                id: order._id,
                email: (order.user as IUser).email,
                name: (order.user as IUser).name,
                total: order.total,
                isPaid: order.isPaid,
                noProducts: order.numberOfItems,
                createAt: order.createdAt}))
            )
        }
    }, [data])
  return ( 
    <AdminLayout
        title='Ordenes'
        subTitle='Mantenimiento de ordenes'
        icon={<ConfirmationNumberOutlined/>}
    >
        {!data && !error 
            ? (<FullScreenLoading />) 
            : ( <Grid item xs={12} sx={{ height:650, width: '100%' }}>
                    <DataGrid
                        rows={ rows }
                        columns={ columns }
                        pageSize={10}
                        rowsPerPageOptions={ [10] }
                    />
                </Grid>)}
        
    </AdminLayout>
  )
}

export default OrderPage