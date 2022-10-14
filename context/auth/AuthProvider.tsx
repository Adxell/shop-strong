import axios from 'axios';
import Cookies from 'js-cookie';
import { FC, PropsWithChildren, useReducer } from 'react'
import { tesloApi } from '../../api';
import { IUser } from '../../interfaces';
import { AuthContext, authReducer } from './'


export interface AuthState {
   isLoggedIn: boolean;
   user?: IUser
}


const Auth_INITIAL_STATE: AuthState = {
   isLoggedIn: false,
   user: undefined,
}


export const AuthProvider:FC<PropsWithChildren> = ({ children }) => {

   const [state, dispatch] = useReducer( authReducer, Auth_INITIAL_STATE );
   const loginUser = async(email: string, password: string): Promise<Boolean> =>{
      try {
         const { data } = await tesloApi.post('/user/login', {email, password})
         const { token, user } = data
         Cookies.set('token', token);
         dispatch({ type: '[Auth] - Login', payload: user })
         return true
      } catch (error) {
         return false
      }
   }
   const registerUser = async( name: string, email: string, password: string): Promise<{hasError: boolean; message?: string}> => {
      try {
         const { data } = await tesloApi.post('/user/register', {name, email, password})
         const { token, user } = data
         Cookies.set('token', token);
         dispatch({ type: '[Auth] - Login', payload: user })
         return {
            hasError: false,
         }
      } catch (error) {
         if ( axios.isAxiosError(error) ) {
            return {
               hasError: true,
               message: error.response?.data.message
            }
         }
         return {
            hasError: true,
            message: 'No se pudo crear el usuario - intente de nuevo'
         }
      }
   }
   return (
      <AuthContext.Provider value={{
         ...state,
         loginUser,
         registerUser
      }}>
            { children }
      </AuthContext.Provider>
   )
}