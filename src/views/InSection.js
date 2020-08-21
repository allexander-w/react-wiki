import React, {useState, useCallback, useEffect, useContext} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import {useFetch} from '../hooks/fetch.hook'
import {NavBarContext} from '../context/context'
import {Loader} from '../components/Loader'

export const InSection = () => {
    const history = useHistory()

    const {changeSidebar, setCurrentId} = useContext(NavBarContext)
    

    const sectionHandler = ({id}) => {
        history.push(`/account/section/${id}`)
    }
    const id = useParams().id

    const {load, request} = useFetch()
    const [secData, setSecData] = useState([])
    const [artData, setArtData] = useState([])
    const [section, setSection] = useState({})
    const [creator, setCreator] = useState({})

    const fetchSectionData = useCallback(async () => {
        const token = localStorage.getItem('token')
        const team = localStorage.getItem('team')
        

        const url = new URL(
            `https://api.itl.wiki/team/${team}/section/${id}`
        )

        let headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Bearer " + token,
        }

        const data = await request(url, 'GET', null, headers)  
        setSecData(data.children)
        setArtData(data.articles)
        setSection(data.section)
        setCreator(data.section.creator)

    },[request, id])

    useEffect(() =>{
        setCurrentId(id)
        fetchSectionData()
        changeSidebar(5)
    }, [fetchSectionData, setCurrentId, id])

    if (load) {
        return <Loader />
    }
    console.log('ART DATA:',artData)
    return (
        
        <div className='insection'>
            
            { section && creator && 
                <>
                    <div className='main-title'>{section.name}</div>
                    <div className='about-section'>
                        <span className='author-name'>Автор: {creator.fullname} </span>
                        <span>Дата создания: {section.updated_at}</span>
                    </div>
                </>
            }
            
            
            <div className='sections-children'>
            { secData && 
                secData.map((section, index) => {
                    return (
                        <div className='insection-child' key={`section${index}`} onClick = {()=> {
                            sectionHandler(section)
                        }}>
                            <div className='insection-section-name' >
                                <span className='author-name'>•••</span>
                                <div className='section-info-wrapper'>
                                    <div className='section-name'>{section.name}</div> 
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            </div>

            
                {
                    artData &&
                    Array.from(artData).map((article, index) => {
                        return (
                            <div className='insection-child' key={`article${index}`}>
                                <div className='insection-section-name'>
                                    <span className='author-name'>•</span>
                                    <div className='section-info-wrapper'>
                                    <div className='section-name'>{article.name}</div> 
                                        <div className='section-info'><span className='author-name'>Автор: {article.creator.fullname}</span><span className='author-name'>Дата: {article.updated_at}</span></div> 
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            
        </div>
    )
}