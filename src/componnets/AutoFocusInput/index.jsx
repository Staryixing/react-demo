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