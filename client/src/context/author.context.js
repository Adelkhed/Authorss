import { createContext, useReducer } from 'react'

export const AuthorContext = createContext()

export const authorReducer = (state,action) => {
    switch (action.type) {
        case 'SET AUTHORS':
            return { authors: action.payload };
        default:
            return state
    }
}

export const AuthorContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authorReducer,{
        authors: null
    })
    return (
        <AuthorContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthorContext.Provider>
    )
}