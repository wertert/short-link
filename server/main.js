import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp'
import '../imports/api/users' // this runs the users.js file and 'attacheds the validateNewUser method' whatever that means
import { Links } from './../imports/api/links';   // why can we use import './../imports/api/links' here ? REQUIRED !!
import './../imports/startup/simple-scheme-configuration'

Meteor.startup(() => {
  // code to run on server at startup
WebApp.connectHandlers.use((req, res,next)=>{
  console.log('This is from my custom middleware !')
  const _id=req.url.slice(1) // id comes in on url. For example <url:port>/sdkljslkfjfslf slice removes the /
  const link=Links.findOne({_id})   // returns 
  if(link) {
    res.statusCode=302
    res.setHeader('Location',link.url)
    res.end()
    Meteor.call('links_trackVisit',_id)
  } else {
    next()
  }
  //res.statusCode=302
  //res.setHeader('Location','http://www.google.com')
  //res.end()
})

});
