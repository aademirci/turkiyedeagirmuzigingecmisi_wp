import { observer } from 'mobx-react-lite'
import React, { Fragment, useContext } from 'react'
import { IAnecdote } from '../../../app/models/anecdote'
import { RootStoreContext } from '../../../app/stores/rootStore'
import AnecdoteListItem from './AnecdoteListItem'

const AnecdoteList: React.FC<{array: IAnecdote[]}> = ({array}) => {
    const rootStore = useContext(RootStoreContext)
    const {anecdoteArray} = rootStore.anecdoteStore

    const hmmm = array

    return (
        <Fragment>
            {array ? 
            anecdoteArray.map(anecdote => (
                <AnecdoteListItem key={anecdote.id} anecdote={anecdote} />
            ))
            :
            hmmm.map(anecdote => (
                <AnecdoteListItem key={anecdote.id} anecdote={anecdote} />
            )) 
            }
        </Fragment>
    )
}

export default observer(AnecdoteList)
