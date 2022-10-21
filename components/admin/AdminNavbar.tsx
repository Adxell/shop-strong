import React, { useContext } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

import { AppBar, Box, Button, Link, Toolbar, Typography } from '@mui/material'

import { UiContext } from '../../context'

export const AdminNavbar = () => {

  const router =  useRouter()
  
  const { toggleSideMenu } = useContext(UiContext)


  return (
    <AppBar>
        <Toolbar>
            <NextLink href='/' passHref>
                <Link display='flex'  className='a' alignItems='center'>
                    <Typography variant='h6'>
                        Teslo |
                    </Typography>
                    <Typography sx={{ ml: 0.5 }}>
                        Shop
                    </Typography>
                </Link>
            </NextLink>

            <Box flex={ 1 } />
     
            {/* Screen media */}
            <Button onClick={()=>toggleSideMenu()}>
                Menu
            </Button>
        </Toolbar>
    </AppBar>
  )
}
