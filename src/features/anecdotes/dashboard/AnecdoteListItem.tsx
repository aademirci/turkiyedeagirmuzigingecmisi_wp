import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Label, Icon } from 'semantic-ui-react'
import { IAnecdote } from '../../../app/models/anecdote'
import parse from "html-react-parser"
import FeaturedImage from '../FeaturedImage'
import { RootStoreContext } from '../../../app/stores/rootStore'
import { observer } from 'mobx-react-lite'
import ThumbImages from '../ThumbImages'
import LoadingComponent from '../../../app/layout/LoadingComponent'

const AnecdoteListItem: React.FC<{anecdote: IAnecdote}> = ({anecdote}) => {
    const rootStore = useContext(RootStoreContext)
    const {getAttached, attachedMedia, loadingInitial} = rootStore.anecdoteStore
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        getAttached(anecdote.id).then(() => setLoaded(true))
    }, [getAttached, anecdote.id])

    if (loadingInitial) return <LoadingComponent content='Anekdotlar yükleniyor...' />
    return (
        
        <div className="anecdote" id={anecdote.slug}>
            <Card>
                    <div className="mainImage">
                        {loaded && anecdote.featured_media ? attachedMedia.map(mid => {
                            if (mid.id === anecdote.featured_media){
                                return <FeaturedImage key={mid.id} image={mid} />
                            } else {
                                return <Fragment key={mid.id}></Fragment>
                            }
                        }) : <div className="labelPush"></div>}
                        <Label.Group>
                            
                            <Label color='black'>
                                {anecdote['olay-tipleri'].map((type, index) => {
                                    return (
                                        <Fragment key={type.term_id}>
                                            {(index ? ', ' : '')}
                                            {type.name}
                                        </Fragment>
                                    )
                                })}
                            </Label>
                            
                            <Label color='black'>{format(new Date(anecdote.date), 'd MMMM yyyy', {locale: tr})}</Label>
                        </Label.Group>
                    </div>
                    
                    <Card.Content>
                        <Card.Header as={Link} to={`/olay/${anecdote.slug}`}>{parse(anecdote.title.rendered)}</Card.Header>
                        <Card.Meta>
                            <span className='date'>{anecdote.ortamlar && <Icon name='map marker alternate' />}
                                {anecdote.ortamlar && 
                                anecdote.ortamlar[0].name}
                                {anecdote.sehirler && `, ${anecdote.sehirler[0].name}`}
                            </span>
                        </Card.Meta>
                        <Card.Description>
                            {parse(anecdote.content.rendered)}
                        </Card.Description>
                        <Card.Group itemsPerRow={3}>
                            {loaded && attachedMedia.map(mid => {
                                if (mid.id !== anecdote.featured_media)
                                    return (
                                        <ThumbImages key={mid.id} attachedMedia={mid} />
                                    )
                                else
                                    return (<Fragment key={mid.id} />)
                            })} 
                        </Card.Group>
                    </Card.Content>
                    
                    
                    <Card.Content extra>
                        Oradaydilar:
                        <br />
                        {anecdote.gruplar && anecdote.gruplar.map(band => (
                            <Label key={band.term_id} color="orange" className="bandLabel">{band.name}</Label>
                        ))}
                        {anecdote.kisiler && anecdote.kisiler.map(person => (
                            <Label key={person.term_id} color="grey" className="personLabel">{person.name}</Label>
                        ))}
                    </Card.Content>
            </Card>

            
        </div>
    )
}

export default observer(AnecdoteListItem)
