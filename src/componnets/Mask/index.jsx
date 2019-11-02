/** 
 * @module 模态框
 * @param {Boolean}  visible 显示隐藏名 
 * @param {Func} hide 隐藏模态框函数 
 * @param {Func}  ok  确定函数 
 * @param {Func}  cancel 取消函数
 * @param {String} title 标题
 * 
 * eg
 * <Model
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
 * 
*/
import React,{ Component } from 'react';
import { Button } from 'antd';
import Portal from './Portal';
import originalStyle from './index.less';

class Model extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }
  componentWillReceiveProps(newProps){
    if(!newProps.hidefoo){
      this.onCancel();
    }
  }
  onOK = ()=>{
      this.props.onOK();
      this.props.hide();
  };
  onCancel = ()=>{
      this.props.onCancel();
      this.props.hide();
  };

  handleClick(e){
    e.stopPropagation()
  }
    
  render() {
    const {hide,visible,style,title,onOK,onCancel} = this.props;
     //合并style
    let newStyle = Object.assign({},style,{
        display:visible?"block":"false",
    });
    return (
      <div style={newStyle} className={originalStyle.modelContent} onClick={(e)=>this.handleClick(e)}>
        <header className={originalStyle.header}>
          <h4>
            {title}
            <b onClick={hide} className={originalStyle.close}>X</b>
          </h4>
        </header>
        <section className={originalStyle.content}>
          {this.props.children}
        </section>
        <footer>
          {onCancel? <Button onClick={this.onCancel} style={{ marginRight: 10 }}>取消</Button> : null}
          {onOK ? <Button type="primary" onClick={this.onOK}>确定</Button> : null}
        </footer>
      </div>
    )
  }
}

export default Portal(Model)
