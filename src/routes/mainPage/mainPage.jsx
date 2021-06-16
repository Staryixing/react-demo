import React from 'react';
import {Route, Switch} from 'dva/router';
import PublicSecurity from '@routes/publicSecurity/publicSecurity.jsx';
import BascDemo from '@routes/traveService/traveService.jsx';
import CameraPage from '@routes/lotteryService/lotteryService.jsx';
import D3Page from '@routes/otherServices/otherServices';
import SlideAnimation from '@routes/slideAnimation/index.jsx';
import UserList from '@routes/userList/userList';
import ReactHook from '@routes/reackHook/reactHook.jsx';
import Three  from '@routes/3D/three.jsx';
import SlideUP from '@routes/slideUp/slideup.jsx';
import KeepAlive from '@routes/keepalive/index.jsx';

import style from './mainPage.less'


const navList = [
  { name: 'HOOK', pathName: '/mainpage/publicSecurity' },
  { name: 'JS基本测试',pathName:'/mainpage/bascdemo' },
  { name: '摄像头',pathName: '/mainpage/camera' },
  { name:'d3作图',pathName: '/mainpage/d3page' },
  { name: '轮播',pathName: '/mainpage/slide' },
  { name: 'HOOK基本测试',pathName: '/mainpage/hook'},
  { name: 'ThreeJs',pathName: '/mainpage/three' },
  { name: '向上滑动',pathName: '/mainpage/slideup' },
  { name: 'keepAlive',pathName: '/mainpage/keepalive' },
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
        </div>
    }

    render() {
        return (
            <div style={{ height: '100%', width: '100%' }}>
              <header className = {style.titleBarRoot} >{ this.renderTitleBar() }</header>
              <div className={style.content}>
                <nav className={style.nav_cont}>
                  {
                    navList.map((item, index) => {
                      return <div key={index} onClick={() => this.jumpToFunctionPage(item.pathName)} 
                      >{item.name}</div>
                    })
                  }
                </nav>
                <main style={{ width: '100%' }}>
                  <Switch>
                    <Route path="/mainpage/publicSecurity" component={PublicSecurity}/>
                    <Route path="/mainpage/bascdemo" component={BascDemo}/>
                    <Route path="/mainpage/camera" component={CameraPage}/>
                    <Route path="/mainpage/d3page" component={D3Page}/>
                    <Route path="/mainpage/slide" component={SlideAnimation} />
                    <Route path="/mainpage/userlist" component={UserList}/>
                    <Route path="/mainpage/hook" component={ReactHook} />
                    <Route path="/mainpage/three" component={Three} />
                    <Route path="/mainpage/slideup" component={SlideUP} />
                    <Route path="/mainpage/keepalive" component={KeepAlive} />
                    <Route path="/mainpage" />
                    {/* <Redirect to="/mainpage" /> */}
                  </Switch>
                </main>
              </div>
            </div>
        )
    }
}

export default MainPage