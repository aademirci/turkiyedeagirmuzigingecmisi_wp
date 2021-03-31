import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { RouteComponentProps } from 'react-router-dom'
import parse from 'html-react-parser'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { RootStoreContext } from '../../../app/stores/rootStore'
import AnecdoteListItem from '../dashboard/AnecdoteListItem'
import AnecdoteComment from './AnecdoteComment'

interface DetailParams {
    slug: string
}

const AnecdoteDetails: React.FC<RouteComponentProps<DetailParams>> = ({match}) => {
    const rootStore = useContext(RootStoreContext)
    const { loadAnecdote, anecdote, loadingInitial } = rootStore.anecdoteStore
    const [loading, setLoading] = useState(false)
    const ref = useRef(anecdote)

    useEffect(() => {
        loadAnecdote(match.params.slug).then(result => ref.current = result[0]).then(() => {setLoading(true); document.title = parse(ref.current!.title.rendered).toString()})
        
    }, [loadAnecdote, match.params.slug, setLoading])

    if(loadingInitial || !loading) return <LoadingComponent content='Anekdot yükleniyor...' />

    return (
        <Fragment>
            {loading &&
                <Fragment>
                    <AnecdoteListItem anecdote={ref.current!} />
                    <AnecdoteComment anecdoteId={ref.current!.id} />
                </Fragment>
            }
        </Fragment>
    )
}

export default observer(AnecdoteDetails)
