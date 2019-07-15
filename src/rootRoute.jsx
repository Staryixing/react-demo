import React from 'react';
import {connect} from 'dva';
import {Route,BrowserRouter ,Switch,Redirect} from 'dva/router';

import UserLayout from '@layouts/UserLayout.jsx';
import MainPage from '@routes/mainPage/mainPage.jsx';
import style from './rootRoute.less';



class RootContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      return (
        <div style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}>
            <Switch>
              <Route exact path="/" component={UserLayout} />
              <Route path="/mainpage" component={MainPage} />
              {/* <Redirect to="/login" /> */}
            </Switch>
        </div>
      )
    }
}
export default RootContainer