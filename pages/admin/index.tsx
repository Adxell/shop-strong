import React, { useEffect, useState } from 'react'

import useSWR from 'swr'

import { AccessTimeOutlined, AttachMoneyOutlined, CancelPresentationOutlined, CategoryOutlined, CreditCardOffOutlined, DashboardOutlined, GroupOutlined, ProductionQuantityLimitsOutlined } from '@mui/icons-material'
import { Grid, Typography } from '@mui/material'

import { AdminLayout } from '../../components/layout'
import { SummaryTile } from '../../components/admin'
import { DashboarSummaryResponse } from '../../interfaces'
import { FullScreenLoading } from '../../components/ui'

const DashBoradPage = () => {
  const {data, error} = useSWR<DashboarSummaryResponse>('/api/admin/dashboard', {
    refreshInterval: 30 * 1000
  })
  const [refreshIn, setrefreshIn] = useState(30)
  useEffect(() => {
    const interval = setInterval(()=>{
      setrefreshIn(refreshIn => refreshIn > 0 ? refreshIn - 1: 30)
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  

  if ( !error && !data ) {
    return <FullScreenLoading />
  }

  if ( error ) {
    console.log(error);
    return <Typography>Error on load data</Typography>
  }

  const {
    notPaidOrders,
    numberOfOrder,
    paidOrders,
    numberOfCLients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory
  } = data

  return (
    <AdminLayout
        title='Dashboard'
        subTitle='Estadisticas generales'
        icon={<DashboardOutlined />}
    >
        <Grid container spacing={2}>
          <SummaryTile 
            title={numberOfOrder}
            subTitle="Ordenes totales"
            icon={<CreditCardOffOutlined color='secondary' sx={{ fontSize: 40 }} />}
          />
          <SummaryTile 
            title={paidOrders}
            subTitle="Ordenes Pagadas"
            icon={<AttachMoneyOutlined color='secondary' sx={{ fontSize: 40 }} />}
          />
          <SummaryTile 
            title={notPaidOrders}
            subTitle="Ordenes Pendientes"
            icon={<CreditCardOffOutlined color='error' sx={{ fontSize: 40 }} />}
          />
          <SummaryTile 
            title={numberOfCLients}
            subTitle="Clientes"
            icon={<GroupOutlined color='primary' sx={{ fontSize: 40 }} />}
          />
          <SummaryTile 
            title={numberOfProducts}
            subTitle="Productos"
            icon={<CategoryOutlined color='warning' sx={{ fontSize: 40 }} />}
          />
          <SummaryTile 
            title={productsWithNoInventory}
            subTitle="Sin existencias"
            icon={<CancelPresentationOutlined color='error' sx={{ fontSize: 40 }} />}
          />
          <SummaryTile 
            title={lowInventory}
            subTitle="Bajo inventario"
            icon={<ProductionQuantityLimitsOutlined color='warning' sx={{ fontSize: 40 }} />}
          />
          <SummaryTile 
            title={refreshIn}
            subTitle="Actualizacion en:"
            icon={<AccessTimeOutlined color='primary' sx={{ fontSize: 40 }} />}
          />
        </Grid>
    </AdminLayout>
  )
}

export default DashBoradPage