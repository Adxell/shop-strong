import { Grid, Typography } from '@mui/material'
import React from 'react'

export const OrdenSummary = () => {
  return (
    <Grid container>
        <Grid item xs={ 6 }>
            <Typography>No. porductos</Typography>
        </Grid>
        <Grid item xs={ 6 } display='flex' justifyContent='end'>
            <Typography>3 productos</Typography>
        </Grid>
        <Grid item xs={ 6 }>
            <Typography>SubTotal</Typography>
        </Grid>
        <Grid item xs={ 6 } display='flex' justifyContent='end'>
            <Typography>{ `$${ 200.56 }` }</Typography>
        </Grid>
        <Grid item xs={ 6 }>
            <Typography>Impuestos(15%)</Typography>
        </Grid>
        <Grid item xs={ 6 } display='flex' justifyContent='end'>
            <Typography>{ `$${ 20.56 }` }</Typography>
        </Grid>
        <Grid item xs={ 6 } sx={{ mt: 2 }}>
            <Typography variant='subtitle1'>Total</Typography>
        </Grid>
        <Grid item xs={ 6 } sx={{ mt: 2 }} display='flex' justifyContent='end'>
            <Typography variant='subtitle1'>{ `$${ 220.56 }` }</Typography>
        </Grid>
    </Grid>
  )
}
