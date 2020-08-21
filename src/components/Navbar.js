import React, { useState, useContext } from 'react'
import { NavBarContext } from '../context/context'

export const Navbar = () => {
    
    const {changeSidebar, hideSidebar, isHide} = useContext(NavBarContext)

    const [state] = useState({
            topNav: [
                {id: 1, name: 'home'},
                {id: 2, name: 'add'},
                {id: 3, name: 'search'}
            ],
            bottomNav: [
                {id: 4, name: 'user'}
            ]
        })

        const clickHandler = id => {
            if(isHide) {
                hideSidebar()
            }
            changeSidebar(id)
        }
        const hideSidebarandler = () => {
            hideSidebar()
        }

    return (
        
        <div className='navbar-wrapper'>
            

            <div className='upper-navigation'>
                <div className='navbar-logo' onClick = {hideSidebarandler}>
                    <img src='https://itl.wiki/assets/img/logo.svg' alt='logo' className='logotype' />
                </div>
                <ul>
                    {
                        state.topNav.map((item, index) => {
                            return (
                                <li key={index} className='nav-item' onClick= {() => clickHandler(item.id)} >
                                    {item.name}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

            <div className='bottom-navigation'>
                <ul>
                    {
                        state.bottomNav.map((item, index) => {
                            return (
                                <li key={index} className='nav-item' onClick= {() => clickHandler(item.id)}>
                                    {item.name}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

        </div>

    )
}