import React, { useState, useCallback, useEffect, useContext } from 'react'
import {useFetch} from '../../hooks/fetch.hook'
import {useHistory} from 'react-router-dom'
import {NavBarContext} from '../../context/context'
import {Loader} from '../Loader'

export const SbInSection = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [sections, setSections] = useState([])
    const [secName, setSecName] = useState('')

    const {load, request} = useFetch()
    const history = useHistory()
    const {currentId} = useContext(NavBarContext)
    
    const insectionHandler = ({id}) => {
        setIsOpen(false)
        history.push(`/account/section/${id}`)
    }
    const fetchDropdownName = useCallback(async () => {
        const token = localStorage.getItem('token')
        const team = localStorage.getItem('team')

        const url = new URL(
            `https://api.itl.wiki/team/${team}/section/${currentId}`
        )

        let headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + token,
        }

        const data = await request(url, 'GET', null, headers)
        
        if (data.section.name){
            setSecName(data.section.name)
        }

    }, [request, currentId] )

    const fetchDropdown = useCallback(async () => {
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

        const data = await request(url, 'GET', null, headers)
        if (data) {
            setSections(data)
        }
    }, [request] )


    useEffect(()=> {
        fetchDropdownName()
        fetchDropdown()
    }, [fetchDropdown, fetchDropdownName])

    if (load) {
        return <Loader />
    }

    return (
        <div className='sidebar-insection'>
            <div className='sidebar-dropdown-wrapper'>
                <div className='sidebar-dropdown' onClick = {()=> {setIsOpen(!isOpen)}}>
                    {   !load && secName !== '' &&
                        <div className='dropdown-title'>{secName}</div>
                    }
                </div>
            {   sections && isOpen &&
                <>
                <div className='dropdown-body'>
                    <div className='dropdown-search'><input type='text' placeholder='Фраза для поиска' /></div>
                {
                    sections.map((section, index) => {
                        return (
                            <div className='dropdown-item' key={`section${index}`} onClick = {()=> {insectionHandler(section)}}>
                                <div className='dropdown-item-title'>{section.name}</div>
                            </div>
                        )
                    })
                }
                    
                </div>
                </>
            }
            </div>
        </div>
    )
}