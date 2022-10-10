import { Box, Typography } from '@mui/material'
import React from 'react'
import {ShopLayout} from '../components/layout'

const Default404 = () => {
  return (
    <ShopLayout title={'Page not found'} pageDescription={'page no fount'}>
        <Box 
            display='flex' 
            justifyContent={'center'} 
            alignItems='center' 
            height='calc(100vh - 200px)'
            sx={{flexDirection:{ xs: 'column', sm: 'row'}}}
        >
                <Typography variant='h3' component='h3' fontSize={80} fontWeight={100}>
                    404
                </Typography>
                <Typography variant='h3' component='h3'>
                   | Page no found
                </Typography>
        </Box>
    </ShopLayout>
  )
}

export default Default404