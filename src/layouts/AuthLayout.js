import React from 'react'

import {Switch, Route} from 'react-router-dom'
import {SignIn} from '../views/SignIn'
import {SignUp} from '../views/SignUp'

export const AuthLayout = () => {
    return (
        <div className='auth-layout'>
            <div className='auth-navbar'>
                <img src='https://itl.wiki/assets/img/logo.svg' alt='logo' className='logotype' />
            </div>
            
            <div className='auth-content'>
                <div className='auth-content-inner'>
                    <Switch>
                        <Route exact path='/signin' component={SignIn}/>
                        <Route exact path='/signup' component={SignUp}/>
                    </Switch>
                </div>
            </div>
        </div> 
    )
}