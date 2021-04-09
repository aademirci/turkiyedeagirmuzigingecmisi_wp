import { createMedia } from '@artsy/fresnel'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Button, Container, Header, Menu } from 'semantic-ui-react'

const NavBar = () => {
    const AppMedia = createMedia({
        breakpoints: {
          mobile: 320,
          tablet: 768,
          computer: 992,
          largeScreen: 1200,
          widescreen: 1920
        }
      });
      
      // const mediaStyles = AppMedia.createMediaStyle();
      const { Media, MediaContextProvider } = AppMedia;

    return (
        <MediaContextProvider>
            <Menu inverted>
                <Container fluid>
                    <Menu.Item header as={NavLink} exact to='/'>
                        <img className="ui" src="/tamg-logo.png" alt="logo" width={151} height={51} />
                        <Header as={Media} greaterThanOrEqual="computer" inverted className="tamg-title">Türkiye'de Ağır Müziğin Geçmişi</Header>
                    </Menu.Item>
                    <Menu.Item name='Anekdotlar' as={NavLink} to='/olay' />
                    <Menu.Item>
                        <Button as={Link} to='/create' positive content='Anekdot paylaş' />
                    </Menu.Item>
                </Container>
            </Menu>
        </MediaContextProvider>
    )
}

export default observer(NavBar)
