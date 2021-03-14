import React, { Fragment, useState } from 'react'
import { Button, Image, Modal } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import { IMedia } from '../../app/models/media'

const FeaturedImage:React.FC<{image: IMedia}> = ({image}) => {
    const [open, setOpen] = useState(false)
    
    return (
        <Fragment>
            {(image.media_details.sizes.medium?.source_url !== undefined) ? 
                <Image src={image.media_details.sizes.medium.source_url} ui={false} onClick={() => {setOpen(true)}} />
                :
                <Image src={image.media_details.sizes.full.source_url} ui={false} onClick={() => {setOpen(true)}} />
            }
            <Modal onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open} centered={false} >
                <Modal.Header>
                    Upload image
                </Modal.Header>
                <Modal.Content image scrolling>
                    <Image src={image.media_details.sizes.full.source_url} wrapped />
                    <Modal.Description>
                    <p>Would you like to upload this image?</p>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                </Modal.Actions>
            </Modal>                      
        </Fragment>
    )
}

export default observer(FeaturedImage)