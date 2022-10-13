import React, { FC, useState } from 'react'
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'

import { Box, Button, Chip, Grid, Typography } from '@mui/material'

import { ShopLayout } from '../../components/layout'
import { ProductSlideShow, SizeSelector } from '../../components/products'
import { ItemCounter } from '../../components/ui'
import { ICartProduct, IProduct, ISize } from '../../interfaces'
import { dbProducts } from '../../database'
import { ImageSearch } from '@mui/icons-material'

interface Props {
  product: IProduct
}
const ProductPage: FC<Props> = ({ product }) => {
  // const router = useRouter();
  // const {products: product, isLoading, isError} = useProducts<IProduct>(`/products/${ router.query.slug }`)

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[1],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  })

  const seletedSize = ( size: ISize) =>{
    setTempCartProduct( currentProduct => ({
      ...currentProduct,
      size
    }))
  }

  const seletedQuantity = ( quantity: number) =>{
    setTempCartProduct( currentProduct => ({
      ...currentProduct,
      quantity
    }))
  }

  const AddProduct = () => {
    if ( !tempCartProduct.size ) return
    console.log({tempCartProduct})
  }
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
                        <ItemCounter 
                          currentValue = {tempCartProduct.quantity}
                          onChangeQuantity = {seletedQuantity}
                          maxQuantity = { product.inStock }
                        />
                        <SizeSelector 
                          sizes={ product.sizes } 
                          selectedSize={ tempCartProduct.size }
                          onSelectedSize = {seletedSize}
                           />
                    </Box>


                    {
                      ( product.inStock > 0 )
                        ? (
                          <Button 
                            color="secondary" 
                            className='circular-btn'
                            onClick={AddProduct}
                          >
                           { tempCartProduct.size 
                              ?'Agregar al carrito'
                              :'Seleccione una talla'
                           }
                          </Button>
                        )
                        :(
                          <Chip label="No hay disponibles" color="error"  variant="outlined" />
                        )
                    }
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