import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { RouteComponentProps } from 'react-router-dom'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { RootStoreContext } from '../../../app/stores/rootStore'
import AnecdoteListItem from '../dashboard/AnecdoteListItem'

interface DetailParams {
    slug: string
}

const AnecdoteDetails: React.FC<RouteComponentProps<DetailParams>> = ({match}) => {
    const rootStore = useContext(RootStoreContext)
    const {loadAnecdote, anecdote, loadingInitial} = rootStore.anecdoteStore
    const [loading, setLoading] = useState(false)
    const ref = useRef(anecdote)

    useEffect(() => {
        loadAnecdote(match.params.slug).then(result => ref.current = result[0]).then(() => {setLoading(true); document.title = ref.current!.title.rendered})
        
    }, [loadAnecdote, match.params.slug, setLoading])

    if(loadingInitial || !ref.current) return <LoadingComponent content='Anekdot yükleniyor...' />

    return (
        <Fragment>{loading &&
            <AnecdoteListItem anecdote={ref.current} />
        }
            
            
        </Fragment>
    )
}

export default observer(AnecdoteDetails)
