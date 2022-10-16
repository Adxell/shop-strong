import type { NextPage } from 'next'

import { ShopLayout } from '../components/layout'
import { Typography } from '@mui/material'
import { ProductList } from '../components/products'
import { useProducts } from '../hooks'
import { FullScreenLoading } from '../components/ui'

const Home: NextPage = () => {

  const { products, isLoading, isError } = useProducts('products')

  return (
    <ShopLayout title={'SHOP-COM'} pageDescription={'Tus soluciones'}>
      <Typography variant='h1' component='h1'>Tienda</Typography> 
      <Typography variant='h2' sx={{ mb: 1}}>Todos los productos</Typography> 
      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList products={ products } />
      }
    </ShopLayout>
  )
}

export default Home
