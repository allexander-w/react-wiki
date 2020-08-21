import React, { useCallback, useState, useEffect } from 'react'
import {useFetch} from '../hooks/fetch.hook'
import { Loader } from '../components/Loader'

export const Profile = ()=> {

    const {request, load} = useFetch()

    const [state, setState] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        newPassword: ''
    })
    


    const getUser = useCallback( async () => {
        const token = localStorage.getItem('token')

        const url = new URL(
            "https://api.itl.wiki/user"
        )

        let headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer "+ token,
        }

        const data = await request(url, 'GET', null, headers)
        
        setState({...state, name: data.first_name, surname: data.last_name, email: data.email})

    } , [request])

    useEffect(()=> {
        getUser()
    },[getUser])
    
    const userDataSubmitHandler = e => {
        e.preventDefault()

        if (state.name === '' || state.surname === '' || state.email === '') {
            console.log('Ошибка')
            return
        }
        
        const userData = {
            first_name: state.name,
            last_name: state.surname,
            email: state.email
        }

        const token = localStorage.getItem('token')
        const url = new URL(
            "https://api.itl.wiki/user/common/edit"
        )
        let headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + token,
        }

        request(url, "POST", {...userData}, headers)
    }

    const securitySubmitHandler = e => {
        e.preventDefault()

        if (state.password.trim() === '', state.newPassword.trim() === '') {
            console.log('error')
            return
        }

        const securityData = {
            password: state.password,
            new_password: state.newPassword
        }
        const token = localStorage.getItem('token')
        const url = new URL(
            "https://api.itl.wiki/user/password/edit"
        )
        
        let headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + token,
        }

        request(url, 'POST', {...securityData}, headers)
        console.log(securityData)

        setState({...state, password: '', newPassword: ''})
        
    }

    if(load) {
        return <Loader />
    }

    return (
        <div className='profile'>
                <div className='main-title profile-title'>Настройки</div>

                <form className='profile-user-data' onSubmit = {userDataSubmitHandler}>
                    <input type='text' placeholder ='Имя' className='profile-input' name='name' value={state.name} onChange= {e => {setState({...state, name: e.target.value})}}  />
                    <input type='text' placeholder ='Фамилия' className='profile-input' name='surname' value={state.surname} onChange= {e => {setState({...state, surname: e.target.value})}} />
                    <input type='text' placeholder ='Email' className='profile-input' name='email' value={state.email} onChange= {e => {setState({...state, email: e.target.value})}} />

                    <button type='submit' className='blue-button'>Сохранить</button>
                </form>

                <div className='main-title profile-title'>Безопасность</div>
                <form className='user-security' onSubmit={securitySubmitHandler}>
                    <input type='password' placeholder ='Текущий пароль' className='profile-input'
                        name='password' value={state.password} onChange= {e => {setState({...state, password: e.target.value})}}
                    />
                    <input type='password' placeholder ='Новый пароль' className='profile-input' 
                        name='newPassword' value={state.newPassword} onChange= {e => {setState({...state, newPassword: e.target.value})}}
                    />

                    <button type='submit' className='blue-button'>Обновить пароль</button>
                </form>
        </div> 
    )
}