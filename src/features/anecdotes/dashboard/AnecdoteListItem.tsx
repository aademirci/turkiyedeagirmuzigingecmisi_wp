import { format } from 'date-fns'
import { tr } from 'date-fns/locale'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Label, Icon } from 'semantic-ui-react'
import { IAnecdote } from '../../../app/models/anecdote'
import parse from "html-react-parser"
import BandsList from '../taxonomy/BandsList'
import PeopleList from '../taxonomy/PeopleList'
import MediaList from '../taxonomy/MediaList'
import CitiesList from '../taxonomy/CitiesList'
import OlayTypesList from '../taxonomy/OlayTypesList'
import FeaturedImage from '../FeaturedImage'
import { RootStoreContext } from '../../../app/stores/rootStore'
import { observer } from 'mobx-react-lite'
import ThumbImages from '../ThumbImages'
import axios from 'axios'

const AnecdoteListItem: React.FC<{anecdote: IAnecdote}> = ({anecdote}) => {
    const rootStore = useContext(RootStoreContext)
    const {getAttachedImages, attachedMedia} = rootStore.anecdoteStore
    const [loaded, setLoaded] = useState(false)
    
    useEffect(() => {
        const CancelToken = axios.CancelToken
        const source = CancelToken.source()
        getAttachedImages(anecdote.id).then(() => {setLoaded(true)})

        return () => {
            source.cancel()
        }
    }, [getAttachedImages, anecdote.id, setLoaded])
    
    
    return (
        <div className="anecdote">
            <Card>
                    <div className="mainImage">
                        {anecdote.featured_media ? <FeaturedImage imageId={anecdote.featured_media} /> : <div className="labelPush"></div> }
                        <Label.Group>
                            {loaded &&
                            <Label color='black'>
                                {anecdote['olay-tipleri'].map((typeId, index) => {
                                return (
                                        <Fragment key={typeId}>
                                            {(index ? ', ' : '')}
                                            <OlayTypesList key={typeId} typeId={typeId} />
                                        </Fragment>
                                    )
                                })}
                            </Label>
                            }
                            <Label color='black'>{format(new Date(anecdote.date), 'd MMMM yyyy', {locale: tr})}</Label>
                        </Label.Group>
                    </div>
                    
                    <Card.Content>
                        <Card.Header as={Link} to={`/olay/${anecdote.slug}`}>{anecdote.title.rendered}</Card.Header>
                        <Card.Meta>
                            <span className='date'><Icon name='map marker alternate' />
                                {anecdote.ortamlar.map(mediaId => (
                                    <MediaList key={mediaId} mediaId={mediaId} />
                                ))}
                                {anecdote.sehirler.map(cityId => (
                                    <CitiesList key={cityId} cityId={cityId} />
                                ))}
                            </span>
                        </Card.Meta>
                        <Card.Description>
                            {parse(anecdote.content.rendered)}
                        </Card.Description>
                        {loaded && (<Card.Group itemsPerRow={3}>
                            {attachedMedia.map(mid => {
                                if (mid.id !== anecdote.featured_media)
                                    return (
                                        <ThumbImages key={mid.id} attachedMedia={mid} />
                                    )
                                else
                                    return (<Fragment key={mid.id} />)
                            })} 
                        </Card.Group>)}
                    </Card.Content>
                    
                    {loaded &&
                    <Card.Content extra>
                        Oradaydilar:
                        <br />
                        {anecdote.gruplar.map(bandId => (
                            <BandsList key={bandId} bandId={bandId} />
                        ))}
                        {anecdote.kisiler.map(personId => (
                            <PeopleList key={personId} personId={personId} />
                        ))}
                    </Card.Content>
                    }
            </Card>

            
        </div>
    )
}

export default observer(AnecdoteListItem)
