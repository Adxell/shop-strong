import { FC, PropsWithChildren, useEffect, useReducer } from 'react'
import { CartContext, cartReducer } from './'
import { ICartProduct } from '../../interfaces'
import Cookie from 'js-cookie'

export interface CartState {
   cart: ICartProduct[]
}


const CART_INITIAL_STATE: CartState = {
   cart: []
}


export const CartProvider:FC<PropsWithChildren> = ({ children }) => {

  const [state, dispatch] = useReducer( cartReducer, CART_INITIAL_STATE );
  useEffect(() => {
    Cookie.set('cart', JSON.stringify(state.cart))
  }, [state.cart])
  
  const addProduct = ( product: ICartProduct ) => {
   const productInCart = state.cart.some( p => p._id === product._id )
   if ( !productInCart ) return dispatch( {type: '[Cart] - Update products in cart', payload: [...state.cart, product]})
   
   const productInCartButDifferentSize = state.cart.some( p => p._id === product._id && p.size === product.size)
   if ( !productInCartButDifferentSize ) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product]})

   const updatedProducts = state.cart.map( p => {
      if ( p._id !== product._id ) return p
      if ( p.size !== product.size ) return p

      p.quantity += product.quantity

      return p

   })
   dispatch({ type: '[Cart] - Update products in cart', payload: updatedProducts})

  }
 
  return (
    <CartContext.Provider value={{
        ...state,
        addProduct
    }}>
          { children }
    </CartContext.Provider>
 )
}