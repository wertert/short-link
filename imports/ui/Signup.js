import React from 'react'
import { Link } from 'react-router'
import { Accounts } from 'meteor/accounts-base'

export default class Signup extends React.Component {   //Signup is inheriting from React.Component
    constructor(props){

        super(props)    // you need to do this if you want to access this.props in a constructor.  We are actually calling parent element with props
        console.log(this)
        this.state={    // note this is NOT in props !
            counter: 0,
            error: ''       // default is nothing
        }
        //console.log(this)
    }
    adder(n) {
//        console.log(n)
        this.setState({
            counter: this.state.counter+n
        })
    }
    onSubmit(e) {
        e.preventDefault()
        //this.setState({
        //    error: 'Something has gone wrong !!'
        //})
        let email = this.refs.email.value.trim()
        let password = this.refs.password.value.trim()
        if(password.length<4){
            this.setState({error:'Password must be greater than 4 characters'})
            return  // we never get to createUser and validateNewUser on server is never run.
        }

        Accounts.createUser({email,password },(err) => { // This seems to cause validateNewUser on server to run
            console.log('Create User Callback',err)
            if(err) {
                this.setState({error:'createUser on client:'+err.reason})
            } else {
                this.setState({ error: '' })
            }
        })
    }
    render() {
        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Signup page</h1>
                    <hr />
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <p>{this.state.counter}</p>    
                    <button onClick={() => { this.adder(1) }}>+1</button>
                    <button onClick={() => { this.adder(-1) }}>-1</button>
                    <button onClick={() => { this.setState({ counter: this.state.counter + 5 }) }}>+5</button>
                    <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
                        <input type="email" ref="email" name="email" placeholder="Email" />
                        <br />
                        <input type="password" ref="password" name="password" placeholder="Password" />
                        <br />
                        <button className="button">Create Account</button>
                    </form>
                    <Link to="/">Already have an account ?</Link>
                </div>
            </div>
        )
    }
}

// using arrow function sorts out the problem with bind(this)