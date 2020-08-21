import React, {useState, useEffect} from 'react'
import {useRoutes} from './router/routes'
import {BrowserRouter} from 'react-router-dom'
import {Context} from './context/context'
import {useAuth} from './hooks/auth.hook'

function App() {

  const {login, logout, token, auth} = useAuth()

    const [actual, setActual] = useState(auth)

    useEffect(()=> {
        setActual(auth)
    }, [login, logout, auth, actual])

  const routes = useRoutes(actual)  

  return (
    <Context.Provider value = {{
      login, logout, token
    }}>
      <div className='app'> 
        <BrowserRouter>
          {routes}
        </BrowserRouter>
      </div>
    </Context.Provider>
  )
}

export default App;
