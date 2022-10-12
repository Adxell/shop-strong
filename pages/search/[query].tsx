import type { GetServerSideProps, NextPage } from 'next'

import { ShopLayout } from '../../components/layout'
import { Typography } from '@mui/material'
import { ProductList } from '../../components/products'
import { useProducts } from '../../hooks'
import { FullScreenLoading } from '../../components/ui'
import { dbProducts } from '../../database'
import { IProduct } from '../../interfaces'

interface Props {
    products: IProduct[];
}

const QueryPage: NextPage<Props> = ({ products }) => {

  return (
    <ShopLayout title={'SHOP-Search'} pageDescription={'resultados de busqueda'}>
      <Typography variant='h1' component='h1'>Buscar</Typography> 
      <Typography variant='h2' sx={{ mb: 1}}>Todos los productos</Typography> 
        <ProductList products={ products } />
    </ShopLayout>
  )
}

export const getServerSideProps:GetServerSideProps = async({ params }) =>{

  const { query = '' } = params as { query: string }
  if ( query.length === 0 ) {
    return {
        redirect: {
            destination: '/',
            permanent: true
        }
    }
  }

  let products = await dbProducts.getProductByTerm( query )
  
  // TODO: retornar otros productos
  
  return {
    props:{
        products
    }
  }

}
export default QueryPage
