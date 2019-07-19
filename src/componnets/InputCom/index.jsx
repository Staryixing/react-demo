import React,{Component} from 'react';
import NewComponent from '@common/Input.js';

class InputCom extends Component{
  constructor(props){
    super(props)
    
  }

  render(){
    return (
      <div>
        <label>用户名<input type="text" onChange={this.props.save} value={this.props.data.data}/></label>
      </div>
    )
  }
}

export default NewComponent(InputCom)