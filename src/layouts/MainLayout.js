import React, { useState } from 'react'
import {Switch, Route} from 'react-router-dom'
import {Account} from '../views/Account'
import {Works} from '../views/Works'
import { Navbar } from '../components/Navbar'
import { NavBarContext } from '../context/context'
import { Sidebar } from '../components/Sidebar'
import { Activity } from '../views/Activity'
import { Bookmarks } from '../views/Bookmarks'
import { Profile } from '../views/Profile'
import { InSection } from '../views/InSection'


export const MainLayout = () => {

    const [content, setContent] = useState('null')

    const changeSidebar = id => {
        setContent(id)
    }
    
    const [currentId, setCurrentId] = useState(null)

    const [isHide, setIsHide] = useState(false)
    
    const hideSidebar = () => {
        const sidebar = document.querySelector('.sidebar')
        const layout = document.querySelector('.main-layout')

        if (sidebar.classList.contains('hide-sidebar') && layout.classList.contains('without-sidebar')) {
            setIsHide(false)
            sidebar.classList.remove('hide-sidebar')
            layout.classList.remove('without-sidebar')
        } else {
            sidebar.classList.add('hide-sidebar')
            layout.classList.add('without-sidebar')
            setIsHide(true)
        }
    }

    return (
        <NavBarContext.Provider value={{
            changeSidebar, hideSidebar, isHide, setCurrentId, currentId
        }}>
        <div className='main-layout with-sidebar '>
            
            <div className='navbar'>
                <Navbar />
            </div>

            <div className='sidebar'>
                <div className='sidebar-content'>
                    <Sidebar content = {content} />
                </div>
            </div>

            <div className='content'>
                <div className='content-inner'>
                    <Switch> 
                        <Route path='/account/works' component={Works} />
                        <Route path='/account/activity' component={Activity} />
                        <Route path='/account/bookmarks' component={Bookmarks} />
                        <Route path='/account/user' component={Profile} />
                        <Route path='/account/section/:id' component={InSection} />
                        <Route path='/account' component={Account} />
                    </Switch>
                </div>
            </div>
        </div>
        </NavBarContext.Provider>
    )
}