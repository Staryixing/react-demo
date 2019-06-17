import React from 'react';
import style from './rootRoute.less';

import {Route,Switch,Redirect} from 'dva/router';
import lotteryServices from '@routes/lotteryService/lotteryService.jsx'
import otherServices from '@routes/otherServices/otherServices'
import publicServices from '@routes/publicSecurity/publicSecurity.jsx'
import traveServices from '@routes/traveService/traveService.jsx'


class RootContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.navList = [
            {
                name: '首页',
                pathName: '/publicSecurityServicesMenu'
            },{
               name: '二级路由',
               pathName:'/travelServicesMenu'
            },
            { name: '摄像头',pathName: '/lotteryServices'},
            { name:'d3作图',pathName: '/otherServicesMenu'}
        ];
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
                this.navList.map((item, index) => {
                  return <label key={index} onClick={() => this.jumpToFunctionPage(item.pathName)}>{item.name}</label>
                })
              }
            </div>
        </div>
    }
    render() {
        return (
            <div style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}>

               <div className = {style.titleBarRoot} >{ this.renderTitleBar() }</div>
               <div className={style.content}>
                    <Switch>
                        <Route path="/travelServicesMenu" component={traveServices}/>
                        <Route path="/lotteryServices" component={lotteryServices}/>
                        <Route path="/publicSecurityServicesMenu" component={publicServices}/>
                        <Route path="/otherServicesMenu" component={otherServices}/>
                        <Route exact path="/publicSecurityServicesMenu" component={publicServices}/>
                        <Redirect to="/publicSecurityServicesMenu" component={publicServices}/>
                    </Switch>
               </div>
            </div>
        )
    }
}
export default RootContainer