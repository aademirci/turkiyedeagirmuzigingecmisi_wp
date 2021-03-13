import axios from 'axios'
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
    const [array, setArray] = useState<IAnecdote[]>(anecdoteArray)

    useEffect(() => {
        const CancelToken = axios.CancelToken
        const source = CancelToken.source()
        loadAnecdotes().then(() => {setLoaded(true); document.title = 'Anekdotlar'})

        return () => {
            source.cancel()
        }
    }, [loadAnecdotes, setLoaded])

    const callback = (childData:IAnecdote[]) => {
        setArray(childData)
    }

    if (loadingInitial) return <LoadingComponent content='Anekdotlar yükleniyor...' />

    return (
        <Fragment>
            {
                loaded && <div>
                <AnecdoteNav callback={callback} />
                <ScrollContainer className='main-section scroll-container'>
                    <AnecdoteList array={array} />
                </ScrollContainer>
                </div>
            }
            
        </Fragment>
    )
}

export default observer(AnecdoteDashboard)