import { observer } from 'mobx-react-lite'
import React, { Fragment } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import AnecdoteDashboard from '../../features/anecdotes/dashboard/AnecdoteDashboard'
import AnecdoteDetails from '../../features/anecdotes/details/AnecdoteDetails'
import Homepage from '../../features/home/Homepage'
import NavBar from '../../features/nav/NavBar'

const App = () => {

  return (
    <Fragment>
      <Route path='/' component={Homepage} exact />
      <Route path={'/(.+)'} render={() => (
        <Fragment>
          <NavBar />
          <Switch>
            <Route path='/olay' component={AnecdoteDashboard} exact />
            <Route path='/olay/:slug' component={AnecdoteDetails}  />
          </Switch>
        </Fragment>
      )} />
    </Fragment>
  );
}

export default withRouter(observer(App))