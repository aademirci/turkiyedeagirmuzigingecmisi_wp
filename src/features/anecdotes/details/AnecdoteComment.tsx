import React, { useContext, useEffect, useState } from 'react'
import { Card, Comment, Header } from 'semantic-ui-react'
import parse from 'html-react-parser'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { RootStoreContext } from '../../../app/stores/rootStore'

interface IProps {
    anecdoteId: number
}

const AnecdoteComment: React.FC<IProps> = ({ anecdoteId }) => {
    const rootStore = useContext(RootStoreContext)
    const { loadComments, loadingInitial, commentArray } = rootStore.commentStore
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadComments(anecdoteId).then(() => setLoading(true))
    }, [loadComments, anecdoteId])

    if (loadingInitial) return <LoadingComponent content="Yorumlar yükleniyor..." />

    return (
        <div className="anecdote" id="comments">
            <Card>
                <Comment.Group>
                    <Header as="h2">Yorumlar</Header>
                    {loading && commentArray.length && commentArray.map(comment => (
                    <Comment key={comment.id}>
                        <Comment.Avatar src={comment.author_avatar_urls[96]} />
                        <Comment.Content>
                            <Comment.Author as='a'>{comment.author_name}</Comment.Author>
                            <Comment.Metadata>
                                <div>{format(new Date(comment.date), 'd MMMM yyyy, HH:mm', {locale: tr})}</div>
                            </Comment.Metadata>
                            <Comment.Text>{parse(comment.content.rendered)}</Comment.Text>
                        </Comment.Content>
                    </Comment>))}
                </Comment.Group>
            </Card>
        </div>
    )
}

export default AnecdoteComment
