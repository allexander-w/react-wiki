import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import {Home} from '../views/Main'
import {MainLayout} from '../layouts/MainLayout'
import { AuthLayout } from '../layouts/AuthLayout'

export const useRoutes = (actual) => {
    if (actual) {
        return (
            <Switch>
                <Route path='/account' >
                    <MainLayout />
                </Route>

                <Redirect to='/account' />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path='/' exact>
                <Home />
            </Route>

            <Route path='/signin' exact>
                <AuthLayout />
            </Route>

            <Route path='/signup' exact>
                <AuthLayout />
            </Route>

            <Redirect to='/' />
        </Switch>
    )
}