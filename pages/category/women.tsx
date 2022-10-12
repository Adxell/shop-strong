import { Typography } from '@mui/material'
import React from 'react'
import { ShopLayout } from '../../components/layout'
import { ProductList } from '../../components/products'
import { FullScreenLoading } from '../../components/ui'
import { useProducts } from '../../hooks'

const WomenPage = () => {
  const { products, isLoading, isError } = useProducts('products?gender=women')
  return (
    <ShopLayout title='Women page' pageDescription='this page is about women products'>
      <Typography variant='h1' component='h1'>Tienda</Typography> 
      <Typography variant='h2' sx={{ mb: 1}}>Productos de mujer</Typography> 
      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={ products } />
      }
    </ShopLayout>
  )
}

export default WomenPage