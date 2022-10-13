import type { GetServerSideProps, NextPage } from 'next'

import { ShopLayout } from '../../components/layout'
import { Box, Typography } from '@mui/material'
import { ProductList } from '../../components/products'
import { dbProducts } from '../../database'
import { IProduct } from '../../interfaces'

interface Props {
    products: IProduct[];
    foundProducts: boolean;
    query: string;
}

const QueryPage: NextPage<Props> = ({ products, foundProducts, query }) => {

  return (
    <ShopLayout title={'SHOP-Search'} pageDescription={'resultados de busqueda'}>
      <Typography variant='h1' component='h1'>Buscar</Typography> 
      {
        foundProducts 
            ? <Typography variant='h2' sx={{ mb: 1}}>Busqueda: { query }</Typography> 
            : (
                <Box display='flex' >
                    <Typography variant='h2' sx={{ mb: 1}} textTransform='capitalize'>No se encontro ningun producto</Typography> 
                    <Typography variant='h2' sx={{ ml: 1}} color='secondary' textTransform='capitalize'>{ query }</Typography> 
                </Box>
            )
      }
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
  const foundProducts = products.length > 0; 
  // TODO: retornar otros productos
  if ( !foundProducts ) {
    products = await dbProducts.getAllProducts()
  }
  return {
    props:{
        products,
        foundProducts,
        query
    }
  }

}
export default QueryPage
