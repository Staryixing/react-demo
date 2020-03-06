import React from 'react';
import { Button } from 'antd';
import  Model from '@componnets/Mask/index';
import style from './traveService.less';
import InputCom from '@componnets/InputCom/index.jsx';
import { debounce,throttle } from '@utils/util.js';
import StaticMethodParent from '../../common/PrivateMethod.js';
import Header from '@componnets/Select/Header.tsx';
import DropDown from '@componnets/DropDown/DropDown.jsx';
// import { DropDown } from 'xdropdown'

const net = require('net');
// import net from 'net'

const ThemeContext = React.createContext({
  theme: 'red',
  toggle: () => {} // 设定一个回调方法
})

// 接受组件1(没有回调函数)
class ThemeButton extends React.Component{
  static contextType = ThemeContext;
  render(){
    return <Button type = {this.context} />
  }
}

// 接受组件2
function Btm() {
  return (
    <ThemeContext.Consumer>
      {
        ({theme, toggle}) => (
          <button
            onClick={toggle}
            style={{ backgroundColor: theme }}>
            Context
          </button>
        )
      }
    </ThemeContext.Consumer>
  )
}

// 中间组件
function Toolbar(){
  return (
    <div>
      <Btm />
    </div>
  )
}

const menu = (
  <ul className={style.menuClass}>
    <li>菜单一</li>
    <li>菜单二</li>
    <li>菜单三</li>
  </ul>
)
// 静态方法
class StaticMethod extends StaticMethodParent{
  constructor(){
    super();
    this.width = '40cm'
  }
  getWidth(){
    return this.width;
  }
  static getAge(){
    // console.log(super.getCommon())
    return '获取Age的静态方法'
  }
}

class TraveService extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = () => {
      this.setState(state => ({
        theme: state.theme === "red" ? "blue" : "red"
      }));
    };

    this.state = {
      theme: "red",
      toggle: this.toggle,
      name: 'yx',
      modelVisible: false
    };
  }

  componentDidMount() {
    this.connectApp()
    this.foo()
    this.getNode({
      'a': '123',
      'b': '234'
    }, function(nodes){
      console.log('nodes', nodes)
    })
    let staticMethod = new StaticMethod(); 
    // console.log(staticMethod.getWidth()); 
    




  }

  connectApp(){
    // console.log(net, 'net')
    // const port = 8888;
    // const socket = net.connect({port}, () => {
    //   console.log('client connected');
    //   socket.write('aaaaaaa');
    //   socket.write('bbbbbbb');
    //   socket.write('ccccccc');
    // })
    // socket.on('end', () => console.log('socket ended'))
    // .on('close', () => console.log('sorket closed'))
    // .on('error', err => {
    //   console.error(`socket error: ${err.stack}`);
    // })
    var ws = new WebSocket("ws://localhost:8888");
    ws.onopen = function(){
      // console.log('打开')
      ws.send('发送数据')
      // alert("数据发送中...");
    }
    ws.onmessage = function (evt) 
    { 
      var received_msg = evt.data;
      // alert("数据已接收...");
    };
    
    ws.onclose = function()
    { 
      // 关闭 websocket
      // alert("连接已关闭..."); 
    };
  }

  submit = () => {
    console.log(this.props, 'porps')
  }
  /**防抖 */
  preventDebounce = () => {
    console.log('打印')
  }

  foo(){
    var mapfoo = Array.prototype.map? function(a, f){
      return a.map(f)
    } : function(a, f){
      var results = [];
      for(var i=0,len = a.length;i<len; i++ ){
        if(i in a) results[i] = f.call(null, a[i], i, a)
      }
      return results;

    }

      // 高阶函数
    function not(f){
      return function() {
        var result = f.apply(this, arguments);
        return !result;
      }
    }
    var even = function(x){
      return x % 2 === 0
    }
    
    var odd = not(even)
    let arr3 = [1,2,3,4,5,6]
    arr3.every(odd);


    let arr1 = [1,2,3,4];
    let f = function(item){
        return item*3
    }
    arr1 = mapfoo(arr1, f);
  }

  handleValue = (value) => {
    
  }
  
  modelShow = ()=>{
    this.setState({
      modelVisible: true
    })
  }
  
  hide = ()=> {
    this.setState({
      modelVisible: false
    })
  }
  ok = () => {
    // 确定弹框
    console.log('确定事件')
  }
  cancel = () => {
    // 取消弹框
    console.log('取消事件')
  }
  // 回调函数 将函数作为参数来传递
  // A callback is a function that is passed as an argument to another function and is executed after its parent function has completed.
  getNode(params, callback) {
    console.log('list', params)
    var list = JSON.stringify(params)
    typeof(callback) === 'function'&&callback(list)
  }

  render() {
      const menu = (
        <ul className={style.menuStyle}>
          <li>苹果</li>
          <li>香蕉</li>
          <li>梨子</li>
        </ul>
      )
      return (
        <div>
          <hr/>
          <div onClick={this.modelShow}>模态框</div>
          <Model
              // 自定义的style
            style={{
                color:"#666",
                padding:10,
                paddingTop:0,
                borderRadius:8,
                display:"block"
            }}
            visible={this.state.modelVisible}
            hide={this.hide}
            onOK={this.ok}
            onCancel={this.cancel}
            title="温馨提示"
            >
              <p>这是弹框组件</p>
          </Model>
          <div>
            <InputCom 
              value='yx'
              getValue={this.handleValue}>
            </InputCom>
          </div>
          <hr/>
          <div> 
            <ThemeContext.Provider value={this.state}>
              <Toolbar />
            </ThemeContext.Provider>
          </div>
          <br/>
          <Button onClick={throttle(this.preventDebounce, 1000)}>防抖</Button>
          <section>
            <DropDown overlay={menu}>
              <span>请选择</span>
            </DropDown>
          </section>
          <Header>

          </Header>
        </div>
      )
  }
}

export default TraveService