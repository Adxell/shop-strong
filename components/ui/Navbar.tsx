import NextLink from 'next/link'
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'

export const Navbar = () => {
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
            <Box sx={{ display: { xs: 'none', sm: 'block'} }}>
                <NextLink href="/category/men" passHref>
                    <Link className='a'>
                        <Button>
                            Men
                        </Button>
                    </Link>
                </NextLink>
                <NextLink href="/category/women" passHref>
                    <Link className='a'>
                        <Button>
                            Women
                        </Button>
                    </Link>
                </NextLink>
                <NextLink href="/category/kid" passHref>
                    <Link className='a'>
                        <Button>
                            Kid
                        </Button>
                    </Link>
                </NextLink>
            </Box>

            <Box flex={ 1 } />

            <IconButton>
                <SearchOutlined/>
            </IconButton>
            <NextLink href="/cart" passHref>
                <Link className='a'>
                    <IconButton>
                        <Badge badgeContent={ 2 } color="secondary" >
                            <ShoppingCartOutlined />
                        </Badge>
                    </IconButton>
                </Link>
            </NextLink>
            <Button>
                Menu
            </Button>
        </Toolbar>
    </AppBar>
  )
}
