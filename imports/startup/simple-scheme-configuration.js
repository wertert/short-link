import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'

// register a callback on method defineValidationErrorTransform
SimpleSchema.defineValidationErrorTransform((e) => {    
    return new Meteor.Error(400,e.message)
})