import React from 'react'
import {Router,Route,Switch,Redirect} from 'dva/router';

import Backend from './backend/backend'
import Following from './following/following'
import Recommend from './recommend/recommend'
class TraveService extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    
    render() {
        return (
            <div>
                <ul>
                    <li onClick={() => this.props.history.push('/travelServicesMenu/backend')}>推荐</li>
                    <li onClick={() => this.props.history.push('/travelServicesMenu/following')}>关注</li>
                    <li onClick={() => this.props.history.push('/travelServicesMenu/recommend')}>后端</li>
                </ul>
                   <Switch>
                       <Route path="/mainpage/travelServicesMenu/backend" component={Backend} />
                       <Route path="/mainpage/travelServicesMenu/following" component={Following}/>
                       <Route path="/mainpage/travelServicesMenu/recommend" component={Recommend}/>
                       <Redirect to="/mainpage/travelServicesMenu" />
                   </Switch>
            </div>
        )
    }
}

export default TraveService