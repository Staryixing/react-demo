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

  constructor(props){
    super(props);
    
    this.toggle= ()=> {
      this.setState(state => ({
        theme: state.theme === "red" ? "blue" : "red"
      }))
    }

    this.state = {
      modelVisible: false,
      showMask:false,
      dialogVisible:false,
      hello:"hello world",
      dtop:0,
      dleft: 0,
      delay: false,
      theme: "red",
      toggle: this.toggle
    }
  } 

  
    
    /**防抖 */
    preventDebounce = () => {
      console.log('打印')
    }
    

    render() {
      return (
        <div>
          <DropDownCom overlay={menu}>
            <span>显示</span>
          </DropDownCom>

          <ThemeContext.Provider value={this.state}>
            <Toolbar />
          </ThemeContext.Provider>
          
          <br/>
          <Button onClick={throttle(this.preventDebounce, 1000)}>防抖</Button>
        </div>
      )
    }
}

export default NewComponent(TraveService)