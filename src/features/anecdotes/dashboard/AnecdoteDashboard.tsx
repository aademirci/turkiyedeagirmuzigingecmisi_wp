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

    useEffect(() => {
        document.title = 'Anekdotlar'
        if (yearly === false) {
            loadAnecdotes(page).then(() => {
                setArray([...array, ...anecdoteArray])
                setLoaded(true)
            })
        } else {
            loadAnecdotesByYear(page, year).then(result => {
                setArray([...array, ...result!])
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
    
    if (loadingInitial) return <LoadingComponent content='Anekdotlar yükleniyor...' />

    return (
        <Fragment>
            {
                loaded && <div>
                <AnecdoteNav callback={callback} setYear={setYear} />
                <Button onClick={() => {setPage(page + 1);}} />
                <ScrollContainer className='main-section scroll-container'>
                    <AnecdoteList array={array} />
                </ScrollContainer>
                </div>
            }
            
        </Fragment>
    )
}

export default observer(AnecdoteDashboard)