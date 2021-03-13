import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { RootStoreContext } from '../../app/stores/rootStore'
import { Button, Image, Modal } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import axios from 'axios'

const FeaturedImage:React.FC<{imageId: number}> = ({imageId}) => {
    const rootStore = useContext(RootStoreContext)
    const {getFeaturedImage, media} = rootStore.anecdoteStore
    const [open, setOpen] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const real = useRef(media)
    useEffect(() => {
        const CancelToken = axios.CancelToken
        const source = CancelToken.source()

        getFeaturedImage(imageId).then((result) => {real.current = result}).then(() => {setLoaded(true)})

        return () => {
            source.cancel()
        }
    }, [getFeaturedImage, imageId, setLoaded])

    return (
        <Fragment>
            {loaded && (real.current?.media_details.sizes.medium?.source_url !== undefined) ? 
                <Image src={real.current?.media_details.sizes.medium.source_url} ui={false} onClick={() => {setOpen(true)}} />
                :
                <Image src={real.current?.media_details.sizes.full.source_url} ui={false} onClick={() => {setOpen(true)}} />
        }
        <Modal onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open} centered={false} >
                                                <Modal.Header>
                                                    Upload image
                                                </Modal.Header>
                                                <Modal.Content image scrolling>
                                                    <Image src={real.current?.media_details.sizes.full.source_url} wrapped />
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