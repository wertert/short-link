import { Meteor } from 'meteor/meteor'
// import React from 'react'
import ReactDOM from 'react-dom'  // import DEFAULT export from node module and name as ReactDOM
// import { Router, Route, browserHistory } from 'react-router';
import { Tracker } from 'meteor/tracker';
import { routes,onAuthChange } from '../imports/routes/routes'  // import named exports from file
import { Links } from './../imports/api/links';
import './../imports/startup/simple-scheme-configuration'
//import { Session } from 'inspector';
import { Session } from 'meteor/session'

//import createHistory from 'history/createBrowserHistory';
//import { Router, Route, browserHistory } from 'react-router-dom' 




//const history = createHistory()

//import './main.html'    // what is this about !?!?!

//window.browserHistory = browserHistory


Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId()
  onAuthChange(isAuthenticated)
  
})

Tracker.autorun(() => {
  let links = Links.find().fetch();
  links.map((e)=>{
    console.log(e.url)
  })
})

Meteor.startup(() => {
  Meteor.call('addNumber',11,4,(err,res)=>{
    console.log(`returns from addNumber method ${res} and ${err}`)
  })
  Session.set('showVisible',true)
  ReactDOM.render(routes, document.getElementById('app'))
})
