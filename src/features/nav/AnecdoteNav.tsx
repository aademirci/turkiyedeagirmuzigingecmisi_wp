import React, { SyntheticEvent, useContext, useEffect, useState } from 'react'
import { Container, Button, Icon, Dropdown, DropdownProps } from 'semantic-ui-react'
import { IYears } from '../../app/models/anecdote'
import { RootStoreContext } from '../../app/stores/rootStore'

interface IProps {
    callback: Function,
    setYear: Function,
    scrollTo: Function,
    year: number,
    order: string,
    setOrder: Function
}

const AnecdoteNav: React.FC<IProps> = ({ callback, setYear, scrollTo, year, order, setOrder }) => {
    const rootStore = useContext(RootStoreContext)
    const {getYears} = rootStore.anecdoteStore
    const [text, setText] = useState<string | undefined>("Yıllar")
    const [years, setYears] = useState<IYears[] | undefined>([])

    const handleChange = (e:SyntheticEvent<HTMLElement, Event>, data:DropdownProps) => {
        if (data.value?.toString() === '1') {
            if (year !== 0) {
                setYear(0)
                callback()
            }
            return
        }
        const value = data.value?.toString()
        const selectedYear = parseInt(value!)
        const text = data.key
        setText(text)
        callback()
        setYear(selectedYear)
    }

    const handleToggle = () => {
        if (order === 'asc')
            setOrder('desc')
        else
            setOrder('asc')
        callback()
    }

    let yearOptions: {key: string, text: string, value: string}[] = []

    useEffect(() => {
        getYears().then((result) => {
            setYears(result)
        })
    }, [getYears, setYears])

    years?.map(year => {
        return yearOptions.push({key: year.year, text: `${year.year} (${year.posts})`, value: year.year})
    })

    return (
        <Container className='anecdote-nav' textAlign='center'>
            <Button.Group widths={3}>
                <Button onClick={() => scrollTo()}><Icon name='chevron left' />En başa dön</Button>
                <Dropdown button className='icon' floating scrolling options={[{key: 'notSelected', text: 'Tüm yıllar', value: 1}, ...yearOptions]} onChange={handleChange} icon='chevron down' text={text} style={{'textAlign': 'center'}} />
                <Button toggle onClick={handleToggle}>Sıralama: {order === 'asc' ? 'Geçmişten bugüne' : 'Bugünden geçmişe'}</Button>
            </Button.Group>
        </Container>
    )
}

export default AnecdoteNav