import React,{ Component } from 'react';
import Portal from '../../common/Portal'
import styl from './index.less'

class Model extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }
  onOK = ()=>{
      this.props.onOK();
      this.props.hide();
  };
  onCancel = ()=>{
      this.props.onCancel();
      this.props.hide();
  };
  

  render() {
    const {hide,visible,style,className,title,onOK,onCancel} = this.props;
     //合并style
    let newStyle = Object.assign({},style,{
        display:visible?"block":"false",
    });
    return (
      <div style={newStyle} className={styl.modelContent}>
        <h4>
          {title}
          <b onClick={hide}>关闭</b>
        </h4>
        {this.props.children}
        <div>
          {onCancel? <span onClick={this.onCancel}>取消</span> : null}
          {onOK ? <span onClick={this.onOK}>确定</span> : null}
        </div>
      </div>
    )
  }
}

export default Portal(Model)
