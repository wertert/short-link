import React from 'react'
import { Link } from 'react-router'
import { Meteor } from 'meteor/meteor'


export default class Login extends React.Component {
    constructor(props){

        super(props)    // you need to do this if you want to access this.props in a constructor.  We are actually calling parent element with props
        this.state = {    // note this is NOT in props !
            error: ''       // default is nothing
        }
    }
    onSubmit(e) {
        e.preventDefault()
        let email = this.refs.email.value.trim()
        let password = this.refs.password.value.trim()
        Meteor.loginWithPassword({email}, password, (err)=>{
            console.log('Login Callback', err)
            if (err) {
                this.setState({ error: err.reason })
            } else {
                this.setState({ error: '' })
            }
        })
    }


    render() {
        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                        <h1>Login page</h1>
                        <hr />
                        {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
                            <input type="email" ref="email" name="email" placeholder="Email" />
                            <br />
                            <input type="password" ref="password" name="password" placeholder="Password" />
                            <br />
                            <button className="button">Login</button>
                        </form>
                        <Link to="/signup">Need an account ?</Link>
                </div>
            </div>
        )
    }
}