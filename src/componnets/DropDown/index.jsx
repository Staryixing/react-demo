import React,{ Component } from 'react';
import Portal from '../../common/Portal'
import styl from './index.less'

class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }
  

  onOpen = ()=>{
    this.props.onOpen()
  }
  onClose =()=> {
    this.props.onCancel();
  }
  render() {
    const {hide,visible,style,className,title,onOK,onCancel} = this.props;
     //合并style
    let newStyle = Object.assign({},style,{
        display:visible?"block":"false",
    });
    return (
      <div style={newStyle} className={styl.modelContent} onMouseEnter={this.onOpen} onMouseLeave={this.onClose}>
        <h4>
          {title}
          <b>关闭</b>
        </h4>
        {this.props.children}
      </div>
    )
  }
}

export default Portal(DropDown)