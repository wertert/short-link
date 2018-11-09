import React from 'react'
import { Session } from 'meteor/session'
import { Tracker } from 'meteor/tracker'

export default class LinksListFilters extends React.Component{
    constructor(props){
        super(props)
        this.state={      // don't really to have a state element if we just calling this.setState(this.state) to rerender
        //    showVisible: 0
        }
        //Session.set('showVisible', true)
    }
     componentDidMount(){
         this.tracker = Tracker.autorun(()=>{    // we catch the return result from tracker autorun to cancel it later in componentWillUnmount
             Session.get('showVisible')     // remember this is the SESSION variable ! not the state.  This is required to watch for changes in the showVisible session variable
             //console.log('the session value for showVisible has changed to ', tmp)
             this.setState(this.state)      // this is what causes the component to rerender !
             //this.setState({      // or this ! We can track an individual state element if required
             //    showVisible: true
             //})
         })
     }
    componentWillUnmount(){
        this.tracker.stop()
    }
    
    render() {
        //console.log('in render and showVisible is ', Session.get('showVisible'))
        console.log('in render and showVisible is ', Session.get('showVisible'))
        return (<div>
            <label className="checkbox">
                <input className="checkbox__box" type="checkBox" checked={!Session.get('showVisible')} onChange={(e)=>{       
                    console.log('session get is ', Session.get('showVisible'), 'ill change it to', e.target.checked )
                    Session.set('showVisible', !e.target.checked)
                    //this.setState({
                    //    showVisible: !this.state.showVisible,
                    //})
            }}></input>
                show hidden links
        </label>
    </div>)
    }
}
