import React from 'react'
import Clipboard from 'clipboard'
import { Meteor } from 'meteor/meteor';
import moment from 'moment'

export default class LinkListItem extends React.Component {
    constructor(props) {
        super(props)    // you need to do this if you want to access this.props in a constructor.  We are actually calling parent element with props
        this.state = {    // note this is NOT in props !
            buttonText: "Copy!",
        }
    }
    componentDidMount() {
        this.clipboard = new Clipboard(this.refs.copy)  // passing in copy ref from button     
        this.clipboard.on('success',() => {
            this.setState({ buttonText:"Copied!"})
            setTimeout(() => {
                this.setState({ buttonText: "Copy!" })
            }, 1000);
        })       // add a listener
        //this.clipboard.on('error', () => { alert('Failed') })       // add another listner
    }
    componentWillUnmount() {
        this.clipboard.destroy()
    }
    onVisit(e) {
        console.log('onVisit',e)
    }
    renderStats(){
        let visitedMessage=null
        const t = this.props.lastVisitedAt
        const s = this.props.visitedCount === 1 ? '' : 's'
        if (t) {
            visitedMessage = `( visited ${moment(t).fromNow()} )`
        }
        return (<div> {this.props.visitedCount} visit{s} {visitedMessage}</div>)
    }
    render() {
        return (
            <div className="item">
                <h2>{this.props.url}</h2>
                <p className="item__message">{this.props.shortUrl}</p>
                {this.renderStats()}
                <a className="button button--pill button--link" href={this.props.shortUrl} target="_blank">Visit</a>
                <button className="button button--pill" ref="copy" id="copy" data-clipboard-text={this.props.shortUrl}>{this.state.buttonText}</button>
                <button className="button button--pill" onClick={() => {
                    Meteor.call('links_setVisibility', this.props._id, !this.props.visible)
                }}>{this.props.visible ? 'Hide' : 'UnHide'}</button>         
            </div>
        )
    }
}

LinkListItem.prototypes = {
    url: React.PropTypes.string.isRequired,
    shortUrl: React.PropTypes.string.isRequired,
    userId: React.PropTypes.string.isRequired,
    _id: React.PropTypes.string.isRequired,
    visible: React.PropTypes.bool.isRequired,
}
