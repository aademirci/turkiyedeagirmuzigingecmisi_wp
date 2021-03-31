import { observer } from 'mobx-react-lite'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { IAnecdote } from '../../../app/models/anecdote'
import { RootStoreContext } from '../../../app/stores/rootStore'
import AnecdoteNav from '../../nav/AnecdoteNav'
import AnecdoteList from './AnecdoteList'

const AnecdoteDashboard: React.FC = () => {
    const rootStore = useContext(RootStoreContext)
    const {loadAnecdotes, loadingInitial, anecdoteArray} = rootStore.anecdoteStore
    const [loaded, setLoaded] = useState(false)
    const [page, setPage] = useState(1)
    const [year, setYear] = useState(0)
    const [order, setOrder] = useState('desc')
    const [array, setArray] = useState<IAnecdote[]>([])
    const [position, setPosition] = useState(0)

    useEffect(() => {
        document.title = 'Anekdotlar'
        loadAnecdotes(page, year, order).then(result => {
            if (page <= result?.maxPages)
                setArray(a => [...a, ...result?.anecdoteArray!])
            setLoaded(true)
        })
    }, [loadAnecdotes, page, year, order, setLoaded, setArray])

    const callback = () => {
        setLoaded(false)
        setArray([])
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

    function scrollTo(){
        document.getElementsByClassName('main-section')[0].scrollTo({left: 0, behavior: 'smooth'});
    }
    
    if (loadingInitial || !array.length) return <LoadingComponent content='Anekdotlar yükleniyor...' />

    return (
        <Fragment>
            {
                loaded && <div>
                <AnecdoteNav callback={callback} setYear={setYear} scrollTo={scrollTo} year={year} order={order} setOrder={setOrder} />
                <ScrollContainer className='main-section scroll-container' onEndScroll={infiniteScroll}>
                    <AnecdoteList array={array} />
                </ScrollContainer>
                </div>
            }
            
        </Fragment>
    )
}

export default observer(AnecdoteDashboard)