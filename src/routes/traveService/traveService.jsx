import React from 'react';
import { Button } from 'antd';

import style from './traveService.less';
import Model from '@componnets/Mask/index.jsx';
import DropDown from '@componnets/DropDown/index.jsx';
import CustomTextInput from '@componnets/AutoFocusInput/index.jsx';
import NewComponent from '@common/Input.js';
import { debounce,throttle } from '@utils/util.js';

import PublicBackend from './backend/backend'
import PublicFollow from './following/following'
import PublicRecommend from './recommend/recommend'
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

class TraveService extends React.Component {

  constructor(props){
    super(props);
    this.textInput = React.createRef();
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

    componentDidMount() {
      this.textInput.current.focusTextInput();
    }
    /** ref*/
    focusTextInput(){
      this.textInput.current.focus()
    }
    /** 高阶与protals的模态框 */
    hide = ()=>{
      this.setState({
        modelVisible: false
      })
    };

    ok =() => {
      console.log('ok')
    };
    cancel=() => {
      console.log('取消')
    }
    handleModel = ()=> {
      this.setState({
        modelVisible:!this.state.modelVisible
      })
    }
    /**高阶与protals的提示框 */
    toggleVis = (e)=>{
      e.persist()
      this.setState({
          dialogVisible:!this.state.dialogVisible,
          dtop: e.clientY + 20,
          dleft: e.clientX
      })
    };

    open = ()=>{
      this.setState({
        delay: true
      })
    };

    close = ()=>{
      this.setState({
        dialogVisible:false
      })
    };

    onClose =()=> {
      this.setState({
        delay: false
      })
      setTimeout(() => {
        if(!this.state.delay){
          this.setState({
            dialogVisible:false
          })
        }
      }, 500)
    };
    submit = () => {
      console.log(this.props, 'porps')
    }
    /**防抖 */
    preventDebounce = () => {
      console.log('打印')
    }
    render() {
      return (
        <div>
          例子
          <div>
            <CustomTextInput ref={this.textInput}/>
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
                <button onClick={()=>{
                    alert(this.state.hello)
                }}>
                    say hello
                </button>
            </Model>
            <br/>
            <div onClick={this.handleModel}>显示/隐藏</div>
          </div>
          <div>
            <div>dropdown</div>
            <DropDown
                // 自定义的style
              style={{
                  color:"#666",
                  display:"block",
                  left: this.state.dleft,
                  top: this.state.dtop
              }}
              visible={this.state.dialogVisible}
              onOpen={this.open}
              onCancel={this.close}
              title="温馨提示"
              >
                <div>
                  弹框
                </div>
                
            </DropDown>
             <div onClick={this.toggleVis} style={{ padding: '4px 6px',background:'#333', display: 'inline-block' }} onMouseLeave={this.onClose}>显示/隐藏</div>
          </div>
          <div>
            <p>form表单</p>
            <label>用户名<input value={this.props.data} onChange={this.props.save} /></label>
          </div>
          <button onClick={this.submit}>提交</button>
          <hr/>
          {/* context */}

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