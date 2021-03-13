import { observer } from 'mobx-react-lite'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { RootStoreContext } from '../../../app/stores/rootStore'

const MediaList: React.FC<{mediaId: number}> = ({mediaId}) => {
    const rootStore = useContext(RootStoreContext)
    const {getMedia, medium} = rootStore.taxonomyStore
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        getMedia(mediaId).then(() => {setLoaded(true)})
    }, [getMedia, mediaId, setLoaded])

    return (
        <Fragment>
            {loaded && medium?.name}
        </Fragment>
        
        
    )
}

export default observer(MediaList)
