import React from 'react'
import {Route, Switch, Redirect} from 'dva/router';

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
                  <li onClick={() => this.props.history.push('/mainpage/traveServicesMenu/backend')}>推荐</li>
                  <li onClick={() => this.props.history.push('/mainpage/traveServicesMenu/following')}>关注</li>
                  <li onClick={() => this.props.history.push('/mainpage/traveServicesMenu/recommend')}>后端</li>
              </ul>
              123
              <Switch>
                  <Route path="/mainpage/traveServicesMenu/backend" component={Backend} />
                  {/* <Route exact path="/mainpage/traveServicesMenu/following" component={Following}/>
                  <Route exact path="/mainpage/traveServicesMenu/recommend" component={Recommend}/>
                  <Redirect to="/mainpage/traveServicesMenu" /> */}
              </Switch>
            </div>
        )
    }
}

export default TraveService