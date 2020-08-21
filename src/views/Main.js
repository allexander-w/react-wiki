import React from 'react'
import {useHistory} from 'react-router-dom'

export const Home = () => {

    const history = useHistory()
    
    return (
        <div>
            <button onClick = {() => {history.push('/signin')}}>Войти</button>
            <button>Регистарция</button>
        </div>
    )
}