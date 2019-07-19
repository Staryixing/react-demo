import React, {Component} from 'react';
import { message } from 'antd';

export default function NewComponent(OldComponent, placeholder){
  return class extends Component{
    constructor(){
      super();
      this.state = {data: ''}
    }

    componentWillMount(){
      this.setState({
        data: placeholder
      })
    }

    save = (event)=> {
      var reg = /^[0-9a-zA-Z]+$/
      if(event.target.value){
        if(!reg.test(event.target.value)){
          message.error('只能是数字字母')
          return
        }
      }
      this.setState({
        data: event.target.value
      })
    }

    render(){
      return <OldComponent data={this.state.data} save={this.save}/>
    }
  }
}