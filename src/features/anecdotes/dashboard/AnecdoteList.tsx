import { observer } from 'mobx-react-lite'
import React, { Fragment } from 'react'
import { IAnecdote } from '../../../app/models/anecdote'
import AnecdoteListItem from './AnecdoteListItem'

const AnecdoteList: React.FC<{array: IAnecdote[]}> = ({array}) => {


    return (
        <Fragment>
            
            {array.map(anecdote => (
                <AnecdoteListItem key={anecdote.id} anecdote={anecdote} />
            ))} 
            
        </Fragment>
    )
}

export default observer(AnecdoteList)
