import { Typography } from '@mui/material'
import React from 'react'
import { ShopLayout } from '../../components/layout'
import { ProductList } from '../../components/products'
import { FullScreenLoading } from '../../components/ui'
import { useProducts } from '../../hooks'

const KidPage = () => {
  const { products, isLoading, isError } = useProducts('products?gender=kid')
  return (
    <ShopLayout title='Kid page' pageDescription='this page is about kid products'>
      <Typography variant='h1' component='h1'>Tienda</Typography> 
      <Typography variant='h2' sx={{ mb: 1}}>Productos de hombre</Typography> 
      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={ products } />
      }
    </ShopLayout>
  )
}

export default KidPage