import React, {useEffect, useState, useCallback, useContext} from 'react'
import { useFetch } from '../hooks/fetch.hook'
import {Loader} from '../components/Loader'

import { useHistory } from 'react-router-dom'
import { NavBarContext } from '../context/context'

export const Account = () => {
    const history = useHistory()
    const {request, load} = useFetch()

    const {changeSidebar} = useContext(NavBarContext)

    const [team, setTeam] = useState(null)

    const getCompanies = useCallback( async () => {
        const token = localStorage.getItem('token')
        
        const url = new URL(
            "https://api.itl.wiki/user"
        );

        let headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer "+ token,
        };

        const data = await request(url, 'GET',null, headers )
        if(data){
            setTeam(data.teams)
        }
        
    }, [request])

    useEffect(()=> {
        getCompanies()
    }, [getCompanies])

    if (load) {
        return <Loader />
    }

    const companyHandler = id => {
        localStorage.setItem('team', id)
        changeSidebar(1)

        history.push('/account/works')
    }
    return (

        <div className='account'>
            <div className='main-title account-title'>
                Ваши компании
            </div>
            <div className='company-wrapper'>
                { !load && team &&
                    team.map((item, index) => {
                        return (
                            <div className='company-item' key = {index} onClick = {() => {companyHandler(item.id)} }>
                                <div className='company-name'>
                                    {item.name}
                                </div>

                                <div className='company-employees'>
                                    Количество участников: {item.employees_count}
                                </div>
                            </div>
                        )
                    })
                }

                <div className='company-item company-add'>
                    <div className='company-name'>
                        Добавить компанию
                    </div>
                </div>
            </div>
        </div>
    )
}