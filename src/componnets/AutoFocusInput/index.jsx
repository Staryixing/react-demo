/**
 * 管理焦点 ref的使用
 * 点击button获取焦点
 * 可以在调用时挂载之后立即调用被点击的事件
 * eg：
    this.textInput = React.createRef(); 

    <CustomTextInput ref={this.textInput}/> 
    
    componentDidMount() {
      this.textInput.current.focusTextInput();
    }
 */

import React,{ Component } from 'react';

export default class CustomTextInput extends React.Component{
  constructor(props) {
    super(props);
    // 创建一个 ref 来存储 textInput 的 DOM 元素
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }
  
  focusTextInput(){
    this.textInput.current.focus()
  }

  render(){
    return (
      <div>
        <input type="text" ref={this.textInput} />
        <input type="button" value="Focus the text input" onClick={this.focusTextInput}/>
      </div>
    )
  }
}