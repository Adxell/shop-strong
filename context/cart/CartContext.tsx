import { createContext } from 'react'
import { ICartProduct } from '../../interfaces'


interface ContextProps {
   cart: ICartProduct[]

   addProduct: (product: ICartProduct) => void
}


export const CartContext = createContext({} as ContextProps)