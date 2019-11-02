import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import style from './index.less'

export default function Portal(WrappedComponent){
  return class extends Component{
    constructor(props){
      super(props)
      this.state={
        hidefoo: true
      }
      if(!this.node){
        this.node = document.createElement('div');
        document.body.appendChild(this.node)
      }
    }
    componentWillUnmount(){
      this.node && this.node.remove()
    }
    componentWillReceiveProps(newProps){
      if(!newProps.visible){
        this.setState({
          hidefoo: true
        })
      }
    }
    modelHide =()=>{
      this.setState((prevState, props) =>{
        return {
          hidefoo: !prevState.hidefoo 
        }
      })
    }
    renderContent(){
      return (
          <div className={style.portal} onClick={this.modelHide}>
            {/*  高阶，形式上饮用地址为爷级组件，高阶为父级组件 */}
            <WrappedComponent {...this.props} hidefoo={this.state.hidefoo} />
          </div>
      )
    }
    render(){
      const { visible } = this.props;
      if(visible){
        return (
          this.node && ReactDOM.createPortal(this.renderContent(),this.node)
        )
      }else{
        return null
      }
    }
  }
}