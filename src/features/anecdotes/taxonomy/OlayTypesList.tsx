import { observer } from 'mobx-react-lite'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { RootStoreContext } from '../../../app/stores/rootStore'

const OlayTypesList: React.FC<{typeId: number}> = ({typeId}) => {
    const rootStore = useContext(RootStoreContext)
    const {getType, type} = rootStore.taxonomyStore
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        getType(typeId).then(() => {setLoaded(true)})
    }, [getType, typeId, setLoaded])

    return (
        <Fragment>
            {loaded && type?.name}
        </Fragment>
    )
}

export default observer(OlayTypesList)
