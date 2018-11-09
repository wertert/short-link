import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema'

Accounts.validateNewUser((user) => {
    const email = user.emails[0].address
    console.log('in validateNewUser! the user email is', user.emails[0].address)
    

        new SimpleSchema({
            email: {
                type: String,
                regEx: SimpleSchema.RegEx.Email
            }
        }).validate({ email }) // same as email: email
   
    //console.log('this is the user',user)
    return true // return true to client to allow client to be created
})