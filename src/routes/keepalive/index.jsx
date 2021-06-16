import React from 'react';
import {Route, Switch, Redirect} from 'dva/router';
import { Link } from 'react-router-dom'
import Home from './components/Home';
import UserList from './components/UserList';
import UserAdd from './components/UserAdd';
import { KeepAliveProvider,withKeepAlive } from './alive/index';
import { Pagination }  from 'pagination';

let KeepAliveHome = withKeepAlive(Home, { cacheId: 'Home'});
let KeepAliveUserList = withKeepAlive(UserList, { cacheId: 'UserList',scroll:true});
let KeepAliveUserAdd = withKeepAlive(UserAdd, { cacheId: 'UserAdd' });

/**
 * context 共享那些对于一个组件树而言全局的数据 缓存dom
 *     全局数据 mount、cacheState、dispatch、handleScroll
 *     
 * keepAliveProvider 使用context.Provider
 *     使用useReducer，比setState能处理逻辑复杂且包含多个子值或者下一个state依赖之前的state的逻辑，也会触发深更新的组件做性能优化。
 *     每个context对象都会返回一个Provider React组件，它允许消费组件订阅context的变化
 *     使用useCallback，把内联的回调函数及依赖项，数组作为参数传入useCallBack，他将返回该回调函数的memozied版本，该回调仅在某个依赖项改变时才会更新。
 *     cacheState里存有 cacheId element status doms
 *     插入 props.children ，且生成 cache_${cacheId} 的div
 *      
 *     
 * withKeepAlive 高阶组件函数，经全局数据处理后返回的组件 返回keepalive_${cacheId}的div， 在里面appendChild dom
 *     获取cacheState  将全局的cacheState的doms 拿出来 append到keepalive_${cacheId}的div
 *     使用useRef 返回一个可变的ref对象，其.current属性值被初始化为传入的参数，返回的ref对象在组件的整个生命周期不变
 * 
 * cacheReducer 使用useReducer 
 *       
 * 
 * 
 * 
 */
export default function KeepAlive (){
    return (
        <KeepAliveProvider>
            <div>
                <ul>
                    <li><Link to="/mainpage/keepalive/home">首页</Link></li>
                    <li><Link to="/mainpage/keepalive/list">用户列表</Link></li>
                    <li><Link to="/mainpage/keepalive/add">添加用户</Link></li>
                </ul>
                <Switch>
                    <Route path="/mainpage/keepalive/home" component={KeepAliveHome}/>
                    <Route path="/mainpage/keepalive/list" component={KeepAliveUserList}/>
                    <Route path="/mainpage/keepalive/add" component={KeepAliveUserAdd}/>
                </Switch>
                <Pagination />
            </div>
        </KeepAliveProvider>
    )
}
