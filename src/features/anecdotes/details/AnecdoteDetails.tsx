import React, { Fragment, useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { RouteComponentProps } from 'react-router-dom'
import parse from 'html-react-parser'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { RootStoreContext } from '../../../app/stores/rootStore'
import AnecdoteListItem from '../dashboard/AnecdoteListItem'
import AnecdoteComment from './AnecdoteComment'
import AnecdoteList from '../dashboard/AnecdoteList'
import ScrollContainer from 'react-indiana-drag-scroll'

interface DetailParams {
    slug: string
}

const AnecdoteDetails: React.FC<RouteComponentProps<DetailParams>> = ({match}) => {
    const rootStore = useContext(RootStoreContext)
    const { loadAnecdote, loadNextAnecdotes, anecdote, nextFive, loadingInitial } = rootStore.anecdoteStore
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadAnecdote(match.params.slug)
            .then(result => loadNextAnecdotes(result?.next_five!).then(() => setLoading(true)))
    }, [loadAnecdote, loadNextAnecdotes, match.params.slug, setLoading])

    if (anecdote) document.title = parse(anecdote.title.rendered).toString()

    if (loadingInitial || !loading) return <LoadingComponent content='Anekdot yükleniyor...' />

    return (
        <Fragment>
            {loading &&
                <ScrollContainer className='main-section scroll-container'>
                    <AnecdoteListItem anecdote={anecdote} />
                    <AnecdoteComment anecdoteId={anecdote?.id} />
                    <div className="anecdote" id="sonraki">
                        <h2>Sonraki 5'li</h2>
                    </div>
                    <AnecdoteList array={nextFive} />
                </ScrollContainer>
            }
        </Fragment>
    )
}

export default observer(AnecdoteDetails)
