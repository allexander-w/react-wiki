import {useCallback, useState} from 'react'


export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [auth, setAuth] =  useState(!!localStorage.getItem('token'))

    const login = useCallback( (token) => {
        setToken(token)
        localStorage.setItem ('token', token)
        const data = localStorage.getItem('token')
        setAuth(!!data)
    }, [])

    const logout = useCallback( ()=> {
        setToken(null)
        localStorage.clear()
        
        setAuth(false)
    },[])

    return {login, logout, token, auth}
}