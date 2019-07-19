import React from 'react';
import { Button } from 'antd';
import DropDownCom from '@componnets/DropDown/DropDown.jsx';
import InputCom from '@componnets/InputCom/index.jsx'
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
      theme: "red",
      toggle: this.toggle,
      name: 'yx'
    };
  }
    submit = () => {
      console.log(this.props, 'porps')
    }
    /**防抖 */
    preventDebounce = () => {
      console.log('打印')
    }

    componentDidMount() {
      this.foo()
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
    handleValue = (value) => {
      console.log(value,'123')
    }
    render() {
      return (
        <div>
          <div>
            <DropDownCom overlay={menu}>
              <span>显示</span>
            </DropDownCom>
          </div>
          <hr/>

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
        </div>
      )
  }
}

export default TraveService