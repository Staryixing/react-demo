import React from 'react';
import {Route, Switch, Redirect} from 'dva/router';

import lotteryServices from '@routes/lotteryService/lotteryService.jsx'
import otherServices from '@routes/otherServices/otherServices'
import publicServices from '@routes/publicSecurity/publicSecurity.jsx'
// import traveServices from '@routes/traveService/traveService.jsx'
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
            <div>
              <div className = {style.titleBarRoot} >{ this.renderTitleBar() }</div>
              <div className={style.content}>
                <Switch>
                  {/* <Route exact path="/mainpage/travelServicesMenu" component={traveServices}/> */}
                  <Route exact path="/mainpage/lotteryServices" component={lotteryServices}/>
                  <Route exact path="/mainpage/publicSecurityServicesMenu" component={publicServices}/>
                  <Route exact path="/mainpage/otherServicesMenu" component={otherServices}/>
                  <Redirect to="/mainpage" />
                </Switch>
              </div>
            </div>
        )
    }
}

export default MainPage