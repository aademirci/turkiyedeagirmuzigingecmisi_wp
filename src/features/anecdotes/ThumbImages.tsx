import React, { Fragment, useState } from 'react'
import { Button, Card, Modal, Image } from 'semantic-ui-react'
import { IMedia } from '../../app/models/media'

const ThumbImages: React.FC<{attachedMedia: IMedia}> = ({attachedMedia}) => {
    const [open, setOpen] = useState(false)
    
    return (
        <Fragment key={attachedMedia.id}>
            <Card><Image src={attachedMedia.media_details.sizes.thumbnail.source_url} onClick={() => setOpen(true)} /></Card>
            <Modal open={open} centered={false} >
                <Modal.Header>
                    Upload image
                </Modal.Header>
                <Modal.Content image scrolling>
                    <Image src={attachedMedia.media_details.sizes.full.source_url} wrapped />
                    <Modal.Description>
                        <p>{attachedMedia.id}</p>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                </Modal.Actions>
            </Modal>
        </Fragment>
    )
}

export default ThumbImages
