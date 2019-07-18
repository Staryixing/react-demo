import React from 'react';
import { Button } from 'antd';
import DropDownCom from '@componnets/DropDown/DropDown.jsx';

import NewComponent from '@common/Input.js';
import { debounce,throttle } from '@utils/util.js';

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
  <ul>
    <li>菜单一</li>
    <li>菜单二</li>
    <li>菜单三</li>
  </ul>
)

class TraveService extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = () => {
      this.setState(state => ({
        theme: state.theme === "red" ? "blue" : "red"
      }));
    };

    this.state = {
      modelVisible: false,
      showMask: false,
      dialogVisible: false,
      hello: "hello world",
      dtop: 0,
      dleft: 0,
      delay: false,
      theme: "red",
      toggle: this.toggle
    };
  }

  componentDidMount() {
    this.foo()
  }
  fooreduce(){
    var reducefoo = Array.prototype.reduce
      ? function(a, f, initial) {
        if (arguments.length > 2) return a.reduce(f, initial);
        else return a.reduce(f);
      }
    : function(a, f, initial) {
        var i = 0,
          len = a.length,
          accumulator;
        if (arguments.length > 2) accumulator = initial;
        else {
          if (len == 0) throw TypeError();
          while (i < len) {
            if (i in a) {
              accumulator = a[i++];
              break;
            } else i++;
          }
          if (i == len) throw TypeError();
        }
        while (i < len) {
          if (i in a) {
            accumulator = f.call(undefined, accumulator, a[i], i, a);
          }
        }
        return accumulator;
    };
    
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
    console.log(arr1,'arr1')
  }
  /**防抖 */
  preventDebounce = () => {
    console.log("打印");
  };

  render() {
    return (
      <div>
        <DropDownCom overlay={menu}>
          <span>显示</span>
        </DropDownCom>

        <ThemeContext.Provider value={this.state}>
          <Toolbar />
        </ThemeContext.Provider>

        <br />
        <Button onClick={throttle(this.preventDebounce, 1000)}>防抖</Button>
      </div>
    );
  }
}

export default NewComponent(TraveService)