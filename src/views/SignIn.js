import React, { useState, useContext} from 'react'
import {useFetch} from '../hooks/fetch.hook' 
import {Context} from '../context/context'

export const SignIn = () => {
    
    const auth = useContext(Context)

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const createForm = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const {request} = useFetch() 
    const loginHandler = async (e) => {
        e.preventDefault()

        const url = new URL(
            "https://api.itl.wiki/user/login"
        )
        
        let headers = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }

        const token = await request(url, 'POST', { ...form }, headers )
        
        auth.login(token.data.token)
    }

    

    return (
        <div className='sign-in'>
            <h3 className='main-title'>Авторизация</h3>

            <form>
                <div className='form-empty'>
                    <input type='text' className='form-input'
                        onChange = {createForm}
                        value={form.email} 
                        placeholder='Email' 
                        name = 'email' />
                </div> 

                <div className='form-empty'>
                    <input type='text' className='form-input' 
                        onChange = {createForm} 
                        value={form.password} 
                        placeholder='Password' 
                        name = 'password' />
                </div> 

                <button className='blue-button' onClick={loginHandler}>Войти</button>
            </form>
        </div>
    )
}