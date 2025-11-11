import React, { createContext, useState } from 'react'

export const GlobalContext = createContext() ;

export const GlobalProvider = ({children}) =>{
    const [isAuth,setIsAuth] = useState(null) ;
    
    return(
        <GlobalContext.Provider value={{isAuth,setIsAuth}}>
            {children}
        </GlobalContext.Provider>
    ) ;
} ;