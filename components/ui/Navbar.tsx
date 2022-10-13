import NextLink from 'next/link'
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { CartContext, UiContext } from '../../context'

export const Navbar = () => {

  const router =  useRouter()
  
  const { toggleSideMenu } = useContext(UiContext)
  const [searchTerm, setSearchTerm] = useState('')  
  const [isSearchVisible, setIsSearchVisible] = useState(false)

  const {numberOfItems} = useContext(CartContext)
  

  const onSearchTerms = () => {
      if( searchTerm.trim().length === 0 ) return
     router.push(`/search/${ searchTerm }`)
  }

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
            <Box 
                sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block'} }}
                className='fadeIn'
            >
                <NextLink href="/category/men" passHref>
                    <Link className='a'>
                        <Button color={ router.pathname === '/category/men' ? 'secondary' : 'primary'}>
                            Men
                        </Button>
                    </Link>
                </NextLink>
                <NextLink href="/category/women" passHref>
                    <Link className='a'>
                        <Button color={ router.pathname === '/category/women' ? 'secondary' : 'primary'}>
                            Women
                        </Button>
                    </Link>
                </NextLink>
                <NextLink href="/category/kid" passHref>
                    <Link className='a'>
                        <Button color={ router.pathname === '/category/kid' ? 'secondary' : 'primary'}>
                            Kid
                        </Button>
                    </Link>
                </NextLink>
            </Box>

            <Box flex={ 1 } />
            {/* Screen media */}
            
            {
                isSearchVisible
                    ? (<Input
                        autoFocus
                        sx={{ display: { xs: 'none', sm: 'flex' }}}
                        className='fadeIn'
                        value={ searchTerm }
                        onChange={(e)=>setSearchTerm(e.target.value)}
                        onKeyUp={ (e) => e.key === 'Enter' ? onSearchTerms() : null }
                        type='text'
                        placeholder="Buscar..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={ ()=>setIsSearchVisible(false) }
                                >
                                    <ClearOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />)
                    : (
                        <IconButton
                         sx={{ display: {xs: 'none', sm: 'block'}}}
                         onClick={()=>setIsSearchVisible(true)}
                         className='fadeIn'
                        >
                            <SearchOutlined/>
                        </IconButton>
                    )
            }
            
            {/* Screen small */}
            <IconButton
                sx={{ display: {xs: 'flex', sm: 'none'}}}
                onClick={toggleSideMenu}
            >
                <SearchOutlined/>
            </IconButton>
            <NextLink href="/cart" passHref>
                <Link className='a'>
                    <IconButton>
                        <Badge badgeContent={ numberOfItems > 9 ? '+9' : numberOfItems } color="secondary" >
                            <ShoppingCartOutlined />
                        </Badge>
                    </IconButton>
                </Link>
            </NextLink>
            <Button onClick={()=>toggleSideMenu()}>
                Menu
            </Button>
        </Toolbar>
    </AppBar>
  )
}
