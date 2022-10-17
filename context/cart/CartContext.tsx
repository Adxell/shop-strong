import { createContext } from 'react'
import { ICartProduct, ShippingAddress } from '../../interfaces'


interface ContextProps {
   isLoaded: boolean;
   cart: ICartProduct[]
   numberOfItems: number;
   subTotal: number;
   tax: number;
   total: number;
   shippingAddress?: ShippingAddress;

   addProduct: (product: ICartProduct) => void
   updateCartQuantity: (product: ICartProduct) => void
   removeProductInCart: (product: ICartProduct) =>  void
   updateAddres: (address: ShippingAddress) => void
   createOrder: () => Promise<{hasError: boolean; message: string;}>
}


export const CartContext = createContext({} as ContextProps)