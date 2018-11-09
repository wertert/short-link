import { Meteor } from 'meteor/meteor'
import React from 'react'
import { Router, Route, browserHistory } from 'react-router';

import Signup from '../ui/Signup'
import Link from '../ui/Link'
import NotFound from '../ui/NotFound'
import Login from '../ui/Login'

unauthenticatedPages = ['/', '/signup']
authenticatedPages = ['/links']

const onEnterPublicPage = () => {
    if (Meteor.userId()) {
        browserHistory.replace('/links')
    }
}
const onEnterPrivatePage = () => {
    if (!Meteor.userId()) {
        browserHistory.replace('/')
    }
}

export const onAuthChange = (isAuthenticated) => {
    const pathName = browserHistory.getCurrentLocation().pathname
    const isAuthenticatedPage = authenticatedPages.includes(pathName)
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathName)
    console.log("isAuthenticated:", isAuthenticated)
    console.log(pathName)
    if (isUnauthenticatedPage && isAuthenticated) {
        browserHistory.replace('/links')
    }
    else if (isAuthenticatedPage && !isAuthenticated) {
        browserHistory.replace('/')
    }

}

export const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={Login} exact={true} onEnter={onEnterPublicPage} />
        <Route path="/signup" component={Signup} onEnter={onEnterPublicPage} />
        <Route path="/links" component={Link} onEnter={onEnterPrivatePage} />
        <Route path="*" component={NotFound} />
    </Router>
)