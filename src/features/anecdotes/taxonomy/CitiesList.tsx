import { observer } from 'mobx-react-lite'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { RootStoreContext } from '../../../app/stores/rootStore'

const CitiesList: React.FC<{cityId: number}> = ({cityId}) => {
    const rootStore = useContext(RootStoreContext)
    const {getCity, city} = rootStore.taxonomyStore
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        getCity(cityId).then(() => {setLoaded(true)})
    }, [getCity, cityId, setLoaded])

    return (
        <Fragment>
            {loaded && <Fragment>, {city?.name}</Fragment>}
        </Fragment>
    )
}

export default observer(CitiesList)
