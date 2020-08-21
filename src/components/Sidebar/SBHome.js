import React, { useState, useCallback, useEffect, useContext } from 'react'
import {useHistory} from 'react-router-dom'
import {useFetch} from '../../hooks/fetch.hook'
import { Loader } from '../Loader'
import {NavBarContext} from '../../context/context'


export const SbHome = ()=> {

    const {changeSidebar} = useContext(NavBarContext)
    

    const history = useHistory()
    const {request, load} = useFetch()
    const [homeBar] = useState([
        {id: 1, name: 'Активность', route: '/account/activity'},
        {id: 2, name: 'Ваши работы', route: '/account/works'},
        {id: 3, name: 'Закладки', route: '/account/bookmarks'}
    ])

    const [sections, setSections] = useState([])

    const fetchSections = useCallback( async ()=> {
        const token = localStorage.getItem('token')
        const team = localStorage.getItem('team')

        const url = new URL(
            `https://api.itl.wiki/team/${team}/section`
        )

        let headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + token,
        }

        const data = await request(url, 'GET',null, headers )
        if (data) {
        let array = []
        data.map(section => {
            if (section.level === 1) {
                array.push(section)
            }
        })
        
        
        setSections(array)
    }
        
    }, [request])

    useEffect(()=> {
        fetchSections()
    }, [fetchSections])

    const clickHandler = ({route, id}) => {
        history.push(route)
    }
    const insectionHandler = ({id}) => {
        changeSidebar(5)
        history.push(`/account/section/${id}`)
    }

    if (load) {
        return <Loader /> 
    }

    return (
        <div className='sidebar-home'>
            <h3 className='main-title sidebar-title'>Ваша компания</h3>

            <div className='sidebar-navigation'>  

                {
                    homeBar.map((item, index) => {
                        return (
                            <div className = 'sidebar-nav-item' key={index} onClick = {() => clickHandler(item)}>
                                <p className= 'sidebar-item-name'>• {item.name}</p>
                            </div>
                        )
                    })
                }

            </div>

            <h3 className='main-title sidebar-title'>Статьи</h3>
            <div className='sidebar-navigation'>  

                { !load && sections &&
                    sections.map((item, index) => {
                        return (
                            <div className = 'sidebar-nav-item' key={`sec${index}`} onClick={() => {insectionHandler(item)}}>
                                <p className= 'sidebar-item-name'>• {item.name}</p>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}