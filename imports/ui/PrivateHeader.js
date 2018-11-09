import React from 'react'
import { Accounts } from 'meteor/accounts-base'


// stateless functional component - slightly different as we are using proptypes

const PrivateHeader = (props) => {
 return ( 
     <div className="header">
         <div className="header__content">
             <h1 className="header__title">{props.title}</h1>
             <button className="button button--link-text" onClick={() => Accounts.logout()}>Logout</button>
         </div>
     </div>
 )
}


// export default class PrivateHeader extends React.Component {
//     onLogout() {
//         //this.props.history.push('/') v4
//         Accounts.logout()
//     }
//     render() {
//         return (
//             <div className="privateheader">
//                 <h1>*** {this.props.title} ***</h1><br/>
//                 <button onClick={this.onLogout.bind(this)}>Logout</button>
//             </div>
//         )
//     }

// }

PrivateHeader.prototypes = {
    title: React.PropTypes.string.isRequired,
}

export default PrivateHeader