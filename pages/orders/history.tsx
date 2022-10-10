import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Chip, Grid, Link, Typography } from '@mui/material'
import { ShopLayout } from '../../components/layout'
import NextLink from 'next/link'
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
                <NextLink href={`/orders/${ params.value }`} passHref>
                    <Link underline='always'>
                        Ver orden
                    </Link>
                </NextLink>
            )
        }
    },
]
const rows = [
    {id: 1, paid: false, orden: 'asdu12asdhgy1',fullname: 'Lucas'},
    {id: 2, paid: true , orden: 'asdu12asdhgy1',fullname: 'Adxell Arango'},
    {id: 3, paid: true , orden: 'asdu12asdhgy1',fullname: 'Adxell Arango'},
    {id: 4, paid: false, orden: 'asdu12asdhgy1',fullname: 'Adxell Arango'},
    {id: 5, paid: true , orden: 'asdu12asdhgy1',fullname: 'Adxell Arango'},
    {id: 6, paid: true , orden: 'asdu12asdhgy1',fullname: 'Adxell Arango'},
    {id: 7, paid: true , orden: 'asdu12asdhgy1',fullname: 'Adxell Arango'},
    {id: 8, paid: true , orden: 'asdu12asdhgy1',fullname: 'Adxell Arango'},
    {id: 9, paid: false, orden: 'asdu12asdhgy1',fullname: 'Adxell Arango'},
    {id: 10, paid: true , orden: 'asdu12asdhgy1',fullname: 'Adxell Arango'},
    {id: 11, paid: true , orden: 'asdu12asdhgy1',fullname: 'Adxell Arango'},
    {id: 12, paid: true , orden: 'asdu12asdhgy1',fullname: 'Adxell Arango'},
    {id: 13, paid: false , orden: 'asdu12asdhgy1',fullname: 'Adxell Arango'},
]

const HistoryPage = () => {
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

export default HistoryPage