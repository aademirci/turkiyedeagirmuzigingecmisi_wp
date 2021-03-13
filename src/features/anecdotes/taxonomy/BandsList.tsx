import { observer } from 'mobx-react-lite'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Label } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { RootStoreContext } from '../../../app/stores/rootStore'



const BandsList: React.FC<{bandId: number}> = ({bandId}) => {
    const rootStore = useContext(RootStoreContext)
    const {getBand, band, loadingTaxonomy} = rootStore.taxonomyStore
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        getBand(bandId).then(() => {setLoaded(true)})
    }, [getBand, bandId, setLoaded])

    if (loadingTaxonomy) return <LoadingComponent content='Anekdotlar yükleniyor...' />

    return (
        <Fragment>
            {loaded && <Label color="orange" className="bandLabel">
                {band?.name}
            </Label>
        }
        </Fragment>
        
        
    )
}

export default observer(BandsList)
