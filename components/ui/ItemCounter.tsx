import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import React, { FC } from 'react'

interface Props {
  currentValue: number;
  maxQuantity: number;
  onChangeQuantity: (quantity: number) => void;
}
export const ItemCounter: FC<Props> = ({ currentValue, maxQuantity, onChangeQuantity }) => {
  
  return (
    <Box display={'flex'} alignItems='center'>
        <IconButton>
          { currentValue <= 1
            ? (
              <RemoveCircleOutline  />
            )
            : (
              <RemoveCircleOutline  
                onClick={() => onChangeQuantity( currentValue - 1 )} 
              />
            )
        }
        </IconButton>
        <Typography sx={{ width: 40, textAlign: 'center' }}> {currentValue} </Typography>
         {
          currentValue >= maxQuantity
            ?(
              <IconButton>
                <AddCircleOutline />
              </IconButton>
            )
            :(
              <IconButton>
                <AddCircleOutline  onClick={() => onChangeQuantity( currentValue + 1 )} />
              </IconButton>
            )
         }
         
          
    </Box>
  )
}
