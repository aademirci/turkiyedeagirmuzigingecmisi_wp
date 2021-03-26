import React, { Fragment, useState } from 'react'
import { Button, Image, Modal } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import parse from 'html-react-parser'
import { IMedia } from '../../app/models/media'

const FeaturedImage:React.FC<{image: IMedia, gallery: IMedia[]}> = ({image, gallery}) => {
    const [open, setOpen] = useState(false)
    const [index, setIndex] = useState(gallery.indexOf(image))
    const [disabledNext, setDisabledNext] = useState(false)
    const [disabledPrev, setDisabledPrev] = useState(false)
    
    return (
        <Fragment>
            {(image.media_details.sizes.medium?.source_url !== undefined) ? 
                <Image src={image.media_details.sizes.medium.source_url} ui={false} onClick={() => {setOpen(true)}} />
                :
                <Image src={image.media_details.sizes.full.source_url} ui={false} onClick={() => {setOpen(true)}} />
            }
            <Modal open={open} centered={false} onMount={() => {
                if (index === 0) setDisabledPrev(true)
                if (index === gallery.length - 1) setDisabledNext(true)
            }}>
                <Modal.Header>
                    {parse(gallery[index].title.rendered)}
                </Modal.Header>
                <Modal.Content image scrolling>
                    <Image src={gallery[index].media_details.sizes.full.source_url} wrapped fluid />
                    <Modal.Description>
                        {parse(gallery[index].description.rendered)}
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button disabled={disabledPrev} onClick={() => {
                        if (index > 0) {
                            setIndex(index - 1)
                            setDisabledNext(false)
                            if (index === 1) setDisabledPrev(true)
                        } 
                    }}>Önceki</Button>
                    <Button disabled={disabledNext} onClick={() => {
                        if (index < gallery.length - 1) {
                            setIndex(index + 1)
                            setDisabledPrev(false)
                            if (index === gallery.length - 2) setDisabledNext(true)
                        }
                    }}>Sonraki</Button>
                    <Button onClick={() => {
                        setIndex(gallery.indexOf(image))
                        setDisabledPrev(false)
                        setDisabledNext(false)
                        setOpen(false)
                    }}>Kapat</Button>
                </Modal.Actions>
            </Modal>                      
        </Fragment>
    )
}

export default observer(FeaturedImage)