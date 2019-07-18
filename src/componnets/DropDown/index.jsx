import React,{ Component } from 'react';
import DropdownPortal from '../../common/DropdownPortal'
import styl from './index.less'

class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  onShow = ()=>{
    this.props.onShow()
  }
  onClose =()=> {
    this.props.onClose();
  }
  render() {
    const { visible,style } = this.props;
     //合并style
    let newStyle = Object.assign({},style,{
        display: visible?"block":"false",
    });
    return (
      <div style={newStyle} className={styl.modelContent} onMouseEnter={this.onShow} onMouseLeave={this.onClose}>
        {this.props.children}
      </div>
    )
  }
}

export default DropdownPortal(DropDown)