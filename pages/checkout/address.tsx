import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React from 'react'
import { ShopLayout } from '../../components/layout'

const AddressPage = () => {
  return (
    <ShopLayout title='Direccion' pageDescription='Confinar direccion del destino'>
            <Typography variant='h1' component='h1'>
                Direccion 
            </Typography>
            <Grid container spacing={ 2 } sx={{ mt: 2}}>
                <Grid item xs={12} sm={ 6 }>
                    <TextField  label='Nombre' variant='filled' fullWidth/>
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <TextField  label='Apellido' variant='filled' fullWidth/>
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <TextField  label='Direccion' variant='filled' fullWidth/>
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <TextField  label='Direccion 2 (opcional)' variant='filled' fullWidth/>
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <TextField  label='Codigo postal' variant='filled' fullWidth/>
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <TextField  label='Ciudad' variant='filled' fullWidth/>
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <FormControl fullWidth>
                        <Select
                            variant='filled'
                            label='Pais'
                            value={2}
                        >
                            <MenuItem value={1}> Colombia </MenuItem>
                            <MenuItem value={2}> Mexico </MenuItem>
                            <MenuItem value={3}> Brasil </MenuItem>
                            <MenuItem value={4}> USA </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={ 6 }>
                    <TextField  label='Telefono' variant='filled' fullWidth/>
                </Grid>
            </Grid>

            <Box sx={{ mt: 5}} display='flex' justifyContent='center' >
                <Button color='secondary' className='circular-btn' size='large'>
                    Revisar pedido
                </Button>
            </Box>
    </ShopLayout>
  )
}

export default AddressPage