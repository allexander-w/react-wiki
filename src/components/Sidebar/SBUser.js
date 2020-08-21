import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Context } from '../../context/context'

export const SbUser = () => {

    const history = useHistory()

    const auth = useContext(Context)
    

    const logoutHandler = () => {
        auth.logout()
    }

    const [user] = useState([
        {id: 1, name: 'Редактировать', route: '/account/user'},
        {id: 2, name: 'Сменить компанию', route: '/account'}
    ])

    const clickHandler = ({route, id}) => {
        history.push(route)
    }

    return (
        <div className='sidebar-user'>
            <h3 className='main-title sidebar-title'>Пользователь</h3>

            <div className='sidebar-navigation'>  

                {
                    user.map((item, index) => {
                        return (
                            <div className = 'sidebar-nav-item' key={index} onClick = {() => clickHandler(item)}>
                                <p className= 'sidebar-item-name'>• {item.name}</p>
                            </div>
                        )
                    })
                }
                <div className = 'sidebar-nav-item' onClick = {logoutHandler}>
                    <p className= 'sidebar-item-name'>• Выйти</p>
                </div>
            </div>
        </div>
    )
}