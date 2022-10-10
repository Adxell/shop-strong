import NextLink from 'next/link'
import { RemoveShoppingCartOutlined } from '@mui/icons-material'
import { Box, Link, Typography } from '@mui/material'
import React from 'react'
import { ShopLayout } from '../../components/layout'

const EmptyPage = () => {
  return (
    <ShopLayout title='Cart empty' pageDescription='No hay articulos para comprar'>
        <Box 
            display='flex' 
            justifyContent={'center'} 
            alignItems='center' 
            height='calc(100vh - 200px)'
            sx={{flexDirection:{ xs: 'column', sm: 'row'}}}
        >
            <RemoveShoppingCartOutlined sx={{ fontSize: 100 }}/>
            <Box display='flex' flexDirection='column' alignItems='center'>
                <Typography>
                    Su carrito esta vacio
                </Typography>
                <NextLink href="/" passHref>
                    <Link className='a' typography='h4' color='secondary'>
                        Regresar
                    </Link>
                </NextLink>
            </Box>
        </Box> 
    </ShopLayout>
  )
}

export default EmptyPage