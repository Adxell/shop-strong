import React, { FC } from 'react'
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'

import { Box, Button, Grid, Typography } from '@mui/material'

import { ShopLayout } from '../../components/layout'
import { ProductSlideShow, SizeSelector } from '../../components/products'
import { ItemCounter } from '../../components/ui'
import { IProduct } from '../../interfaces'
import { dbProducts } from '../../database'
interface Props {
  product: IProduct
}
const ProductPage: FC<Props> = ({ product }) => {
  // const router = useRouter();
  // const {products: product, isLoading, isError} = useProducts<IProduct>(`/products/${ router.query.slug }`)
  
  return (
    <ShopLayout title={ product.title } pageDescription={ product.description }>
       <Grid container spacing={ 3 }>
            <Grid item xs={ 12 } sm={ 7 }>
                <ProductSlideShow images={ product.images }  />
            </Grid>
            <Grid item xs={ 12 } sm={ 5 }>
                <Box display='flex' flexDirection={'column'}>
                    <Typography variant='h1' component='h1'>{ product.title }</Typography>
                    <Typography variant='subtitle1' component='h2'>{ `$${product.price}` }</Typography>
                    <Box sx={{ my: 2 }}>
                        <Typography variant='subtitle2'>Cantidad</Typography>
                        <ItemCounter />
                        <SizeSelector sizes={ product.sizes } selectedSize={ product.sizes[0] } />
                    </Box>
                    <Button color="secondary" className='circular-btn'>
                      Agregar al carrito       
                    </Button>

                    {/* <Chip label="No hay disponibles" color="error"  variant="outlined" /> */}

                    <Box sx={{ mt: 3 }}>
                        <Typography variant='subtitle2'>Descripcion</Typography>
                        <Typography variant='body2'>{ product.description }</Typography>
                    </Box>
                </Box>
            </Grid>
       </Grid>
    </ShopLayout>
  )
}

// no usar server side rendering 
// export const getServerSideProps:GetServerSideProps = async({ params }) =>{

//   const {slug = '' } = params as { slug: string }
//   const product = await dbProducts.getProductBySlug( slug )
  
//   if ( !product ) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false
//       }
//     }
//   }
  
//   return {
//     props:{
//       product
//     }
//   }

// }

export const getStaticPaths: GetStaticPaths = async (ctx) =>{
  const slugs = await dbProducts.getAllProductSlugs()
  return{
    paths: slugs.map(({ slug })=>({
      params: {slug}
    })),
    fallback: 'blocking'
  }
}

export const getStaticProps:GetStaticProps = async({params}) =>{

  const {slug} = params as {slug: string}
  const product = await dbProducts.getProductBySlug(slug)
  if ( !product ) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  return {
    props:{
      product
    },
    revalidate: 60*60*24
  }
}
export default ProductPage