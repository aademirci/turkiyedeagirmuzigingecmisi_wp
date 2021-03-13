import { observer } from 'mobx-react-lite'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Label } from 'semantic-ui-react'
import { RootStoreContext } from '../../../app/stores/rootStore'

const PeopleList: React.FC<{personId: number}> = ({personId}) => {
    const rootStore = useContext(RootStoreContext)
    const {getPerson, person} = rootStore.taxonomyStore
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        getPerson(personId).then(() => {setLoaded(true)})
    }, [getPerson, personId, setLoaded])

    return (
        <Fragment>
            {loaded && <Label color="grey" className="personLabel">
                {person?.name}
            </Label>
        }
        </Fragment>
        
        
    )
}

export default observer(PeopleList)
