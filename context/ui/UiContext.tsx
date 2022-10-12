import { createContext } from 'react'


interface ContextProps {
   isMenuOpen: boolean
}


export const UiContext = createContext({} as ContextProps)