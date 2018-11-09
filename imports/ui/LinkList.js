import React from 'react'
import { Tracker } from 'meteor/tracker';
import { Links } from '../api/links'
import LinkListItem from './LinkListItem'
import { Session } from 'meteor/session'
import FlipMove from 'react-flip-move'

export default class LinkList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            links: []
        }
    }
    componentDidMount() {
        //console.log('componmentDidMount')
        this.linksTracker=Tracker.autorun(() => {
            Meteor.subscribe('links-channel')   // required to allow access to Links
            let links = Links.find({
                visible: Session.get('showVisible')         // note : this is in a tracker autorun so when showVisible changes this runs
            }).fetch();
            this.setState({links})      // same as links:links
            //console.log('New Links', links)
        })
    }

    componentWillUnmount() {
        //console.log('componentWillUnmount')
        this.linksTracker.stop()
    }
    renderLinkListItems() {
        if(!this.state.links.length) {
            return (<div className="item">
                <p className="item__status-message">No Links Found</p>
            </div>)
        } 
            return this.state.links.map((e) => {
                //console.log('>>>' + e)
                const shortUrl = Meteor.absoluteUrl(e._id) // gives URL of server + _id as a complete URL.  More like absoluteUrl() + e._id
                //console.log('fxfx')
                //return <p className="link" key={e._id}>{e.url}</p> ... spread operator ... clones object
                //return <linkListItem key={e._id} shortUrl={shortUrl} {...e}/>
                return <LinkListItem key={e._id} shortUrl={shortUrl} {...e} />
            })

    
    }

    render() {
        return(
            <div>
            <FlipMove maintainContainerHeight="true">
                {this.renderLinkListItems()}
            </FlipMove>
            </div>
        )
    }
}
