import { observer } from 'mobx-react-lite'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import { Button } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { IAnecdote } from '../../../app/models/anecdote'
import { RootStoreContext } from '../../../app/stores/rootStore'
import AnecdoteNav from '../../nav/AnecdoteNav'
import AnecdoteList from './AnecdoteList'

const AnecdoteDashboard: React.FC = () => {
    const rootStore = useContext(RootStoreContext)
    const {loadAnecdotes, loadAnecdotesByYear, loadingInitial, anecdoteArray} = rootStore.anecdoteStore
    const [loaded, setLoaded] = useState(false)
    const [page, setPage] = useState(1)
    const [year, setYear] = useState(0)
    const [yearly, setYearly] = useState(false)
    const [array, setArray] = useState<IAnecdote[]>([])
    const [position, setPosition] = useState(0)

    useEffect(() => {
        document.title = 'Anekdotlar'
        if ((yearly === false)) {
            loadAnecdotes(page).then(result => {
                if (page <= result) 
                    setArray([...array, ...anecdoteArray])
                setLoaded(true)
            })
        } else if (yearly === true) {
            loadAnecdotesByYear(page, year).then(result => {
                if (page <= result?.maxPages) 
                    setArray([...array, ...result?.anecdoteArray!])
                setLoaded(true)
            })
        }
    }, [loadAnecdotes, loadAnecdotesByYear, page, year, yearly, setLoaded, setArray])

    const callback = (b: boolean) => {
        setLoaded(false)
        setArray([])
        setYearly(b)
        setPage(1)
    }

    const infiniteScroll = () => {
        const anecdoteWidth = document.getElementById(anecdoteArray[0].slug)?.offsetWidth! + 20
        let screenSize = window.innerWidth - 40
        let windowWidth = anecdoteWidth * anecdoteArray.length * page
        let containerPosition = document.getElementsByClassName('main-section')[0].scrollLeft

        setPosition(containerPosition)
        if (position + screenSize >= windowWidth - screenSize) 
            setPage(page + 1)
    }
    
    if (loadingInitial) return <LoadingComponent content='Anekdotlar yükleniyor...' />

    return (
        <Fragment>
            {
                loaded && <div>
                <AnecdoteNav callback={callback} setYear={setYear} />
                <Button onClick={() => {setPage(page + 1);}} />
                <ScrollContainer className='main-section scroll-container' onEndScroll={infiniteScroll}>
                    <AnecdoteList array={array} />
                </ScrollContainer>
                </div>
            }
            
        </Fragment>
    )
}

export default observer(AnecdoteDashboard)