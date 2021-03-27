import React, { Fragment, useState } from 'react'
import { Button, Card, Modal, Image } from 'semantic-ui-react'
import parse from 'html-react-parser'
import { IMedia } from '../../app/models/media'

interface IProps {
    attachedMedia: IMedia, 
    gallery: IMedia[], 
    featured: boolean
}

const Attachment: React.FC<IProps> = ({ attachedMedia, gallery, featured }) => {
    const { medium, full, thumbnail } = attachedMedia.media_details.sizes
    const [open, setOpen] = useState(false)
    const [index, setIndex] = useState(gallery.indexOf(attachedMedia))
    const [disabledNext, setDisabledNext] = useState(false)
    const [disabledPrev, setDisabledPrev] = useState(false)
    

    const handlePrev = () => {
        if (index > 0) {
            setIndex(index - 1)
            setDisabledNext(false)
            if (index === 1) setDisabledPrev(true)
        } 
    }

    const handleNext = () => {
        if (index < gallery.length - 1) {
            setIndex(index + 1)
            setDisabledPrev(false)
            if (index === gallery.length - 2) setDisabledNext(true)
        }
    }

    const handleClose = () => {
        setIndex(gallery.indexOf(attachedMedia))
        setDisabledPrev(false)
        setDisabledNext(false)
        setOpen(false)
    }

    const handleMount = () => {
        if (index === 0) setDisabledPrev(true)
        if (index === gallery.length - 1) setDisabledNext(true)
    }

    return (
        <Fragment>
            {featured ? 
                <Image src={(medium?.source_url !== undefined) ? medium.source_url : full.source_url} ui={false} onClick={() => {setOpen(true)}} />
            :
                <Card className="attachment"><Image src={thumbnail.source_url} onClick={() => setOpen(true)} /></Card>
            }
            
            <Modal open={open} centered={false} onClose={handleClose} onMount={handleMount}>
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
                    <Button disabled={disabledPrev} onClick={handlePrev}>Önceki</Button>
                    <Button disabled={disabledNext} onClick={handleNext}>Sonraki</Button>
                </Modal.Actions>
            </Modal>
        </Fragment>
    )
}

export default Attachment
