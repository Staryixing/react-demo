import React from 'react';
import {Route, Switch, Redirect} from 'dva/router';

import LotteryService from '@routes/lotteryService/lotteryService.jsx';
import OtherServices from '@routes/otherServices/otherServices';
import PublicSecurity from '@routes/publicSecurity/publicSecurity.jsx';
import TraveService from '@routes/traveService/traveService.jsx';
import UserList from '@routes/userList/userList';
import style from './mainPage.less'


const navList = [
  { name: '首页', pathName: '/mainpage/publicSecurityServicesMenu' },
  { name: '二级路由',pathName:'/mainpage/travelServicesMenu' },
  { name: '摄像头',pathName: '/mainpage/lotteryServices' },
  { name:'d3作图',pathName: '/mainpage/otherServicesMenu' }
]

class MainPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
        this.jumpToFunctionPage = this.jumpToFunctionPage.bind(this)
    }
    jumpToFunctionPage(pathName){
      console.log('pathName',pathName)
      this.props.history.push(pathName)
    }
     // 顶部导航栏
    renderTitleBar(){
        return <div className={style.titleBar}>
            <div className={style.title}>
              DEMO
            </div>
            <div className={style.navList}>
              {
                navList.map((item, index) => {
                  return <label key={index} onClick={() => this.jumpToFunctionPage(item.pathName)}>{item.name}</label>
                })
              }
            </div>
        </div>
    }

    render() {
        return (
            <div style={{ height: '100%', width: '100%' }}>
              <div className = {style.titleBarRoot} >{ this.renderTitleBar() }</div>
              <div className={style.content}>
                <Switch>
                  <Route path="/mainpage/travelServicesMenu" component={TraveService}/>
                  <Route path="/mainpage/publicSecurityServicesMenu" component={PublicSecurity}/>
                  <Route path="/mainpage/lotteryServices" component={LotteryService}/>
                  <Route path="/mainpage/otherServicesMenu" component={OtherServices}/>
                  <Route path="/mainpage/userlist" component={UserList}/>
                  <Route path="/mainpage" />
                  {/* <Redirect to="/mainpage" /> */}
                </Switch>
              </div>
            </div>
        )
    }
}

export default MainPage