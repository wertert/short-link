import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'
import shortid from 'shortid'

//import './../startup/simple-scheme-configuration'

export const Links = new Mongo.Collection('links');
const isLoggedIn = (userId) => {
    //console.log('isLoggedIn',userId)
    if (!userId) {
        throw new Meteor.Error('Not Authorised')
    }  
}

if(Meteor.isServer) {
    Meteor.publish('links-channel',function () {
        return Links.find({ "userId" : this.userId})
    })
}

Meteor.methods({
    addNumber(a,b) {        // ES6 instead of addNumber : function (a,b)
        console.log(`in addNumber with ${a} and ${b}`)
        if(typeof a !== 'number' || typeof b !== 'number') {
            throw new Meteor.Error('*** Invalid Arguments ***','Expecting 2 numbers')
        }
        return a+b
    },
    links_trackVisit(_id){
        Links.update({_id},{
            $set:{
                lastVisitedAt: new Date().getTime()
            },
            $inc:{
                visitedCount: 1
            }
        })
    },
    links_setVisibility(_id,visible) {
        //console.log('in links_setVisibility with', _id, visible,this.userId )
        //console.log(Links.find({ "userId": this.userId, _id }))
        isLoggedIn(this.userId)
        //console.log('this user is', this.userId ? 'logged in' : 'not logged in')
        new SimpleSchema({
            visible: {
                type: Boolean,
            },
            _id: {
                type: String,
                min: 1,
            }
        }).validate({ _id,visible }) // 2 checks combined

        Links.update({
            _id,
                userId: this.userId,
            },{
                $set:{visible: visible},
            }
        )
    },
    links_insert(url) {
        // if(!this.userId) {
        //     throw new Meteor.Error('Not Authorised')
        // }
        isLoggedIn(this.userId)
        new SimpleSchema({
            url: {
                regEx: SimpleSchema.RegEx.Url,
                label: 'Your link',
                type: String,
            }
        }).validate({ url }) // same as email: email
       
        Links.insert({
            _id: shortid.generate(),
            url,
            userId : this.userId,
            visible: true,
            visitedCount: 0,
            lastVisitedAt: null
        })
    }
})