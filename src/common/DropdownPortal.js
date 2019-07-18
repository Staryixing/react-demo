import React,{ Component } from 'react';
import ReactDOM from 'react-dom';

export default function DropdownPortal(WrappedComponent){
  return class extends Component{
    constructor(props){
      super(props)
      if(!this.node){
        this.node = document.createElement('div');
        document.body.appendChild(this.node)
      }
    }
    componentWillUnmount(){
      this.node && this.node.remove()
    }
    renderContent(){
      return (
        <div>
          <WrappedComponent {...this.props}/>
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