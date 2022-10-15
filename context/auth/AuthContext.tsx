import { createContext } from 'react'
import { IUser } from '../../interfaces';


interface ContextProps {
   isLoggedIn: boolean;
   user?: IUser;
   logout: () => void;
   loginUser: (email: string, password: string) => Promise<Boolean>;
   registerUser: (name: string, email: string, password: string) => Promise<{ hasError: boolean; message?: string; }>;
}


export const AuthContext = createContext({} as ContextProps)