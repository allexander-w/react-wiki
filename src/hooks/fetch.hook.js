import {useCallback, useState} from 'react'

export const useFetch = ()=> {
    
    const [load, setLoad] = useState(false)

    const request = useCallback(async (url, method = 'GET', body = null, headers) => {
        setLoad(true)
        if (body !== null){
            const data = await (await fetch(url, {
                method,
                headers,
                body: JSON.stringify(body)
            })).json()
            
            console.log(data)
            setLoad(false)
            return data
        }
        const data = await (await fetch(url, {
            method,
            headers
        })).json()

        console.log(data.data)
        setLoad(false)
        return data.data
    }, [])

    return {request, load}
}