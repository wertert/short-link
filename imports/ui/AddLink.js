import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Links } from './../api/links';
import Modal from 'react-modal'

export default class AddLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url:'',
            isOpen: false,
            error: ''
        };
    }
    onSubmit(e) {
        const {url} = this.state
        e.preventDefault()
        //const url = this.refs.url.value.trim()
        //console.log(url)
        if (url) {
            Meteor.call('links_insert', url, (err,res)=>{
                if(!err) {
                    this.setState({url:'', isOpen:false, error: ''})
                } else { // is there is an error
                    this.setState({error:err.reason})
                }
            })
            //Links.insert({url, userId : Meteor.userId() })     // ES6 same as url : url
            //this.refs.url.value = ''
        }
    }
    onChange(e){
        this.setState({
            url: e.target.value
        })
    }
    handleModalClose() {
        this.setState({
            isOpen: false,
            url: '',
            error: ''
        });
    }

    render() {
        return (
            <div >
                <button className="button" onClick={()=>this.setState({isOpen:true})}>+ Add Link</button>
                <Modal 
                    isOpen={this.state.isOpen}
                    contentLabel="Add link"
                    onAfterOpen={() => this.refs.url.focus()}
                    onRequestClose={this.handleModalClose.bind(this)}
                    className="boxed-view__box"
                    overlayClassName="boxed-view boxed-view--modal">
                    <h1>Add a new link</h1>
                    {this.state.error ? <p>{this.state.error}</p> : undefined }
                    <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
                        <input type="text" ref="url" placeholder="URL" value={this.state.url} onChange={this.onChange.bind(this)}/>
                        <button className="button">Add Link</button>
                        <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>Cancel</button>
                    </form>
                    
                </Modal>
            </div>

        )
    }

}