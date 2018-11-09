import React from 'react'
import LinkList from './LinkList';      // import default export and label as LinkList
import PrivateHeader from './PrivateHeader'
import AddLink from './AddLink'
import LinksListFilters from './LinksListFilters';

//stateless functional component version.
// For basic/simple components 

export default () => {
    return (
        <div>
            <PrivateHeader title="Your Links" />
            <div className="page-content">
                <LinksListFilters />
                <AddLink />
                <LinkList />
            </div>
        </div>
    )
}


//import createHistory from 'history/createBrowserHistory';

// export default class Link extends React.Component {
//     render() {
//         return (
//             <div>
//                 <PrivateHeader title="Your Links"/>
//                 <LinkList/>
//                 <AddLink/>
//             </div>
//             )
//     }
// }

//<button onClick={() => this.props.history.push('/')}>Logout</button>