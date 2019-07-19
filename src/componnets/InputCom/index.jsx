import React,{Component} from 'react';
import NewComponent from '@common/Input.js';

class InputCom extends Component{
  constructor(props){
    super(props)
    this.state ={
      
    }
  }

  render(){
    return (
      <div>
        <label>用户名<input value={this.props.data} onChange={this.props.save} placeholder="请输入"/></label>
        <span>{}</span>
      </div>
    )
  }
}

export default NewComponent(InputCom)