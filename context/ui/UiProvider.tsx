import { FC, PropsWithChildren, useReducer } from 'react'
import { UiContext, uiReducer } from './'


export interface UiState {
   isMenuOpen: boolean
}


const Ui_INITIAL_STATE: UiState = {
   isMenuOpen: true
}


export const UiProvider:FC<PropsWithChildren> = ({ children }) => {

 const [state, dispatch] = useReducer( uiReducer, Ui_INITIAL_STATE );

 return (
    <UiContext.Provider value={{
        ...state
    }}>
          { children }
    </UiContext.Provider>
 )
}