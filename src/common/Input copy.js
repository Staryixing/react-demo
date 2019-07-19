import React, {Component} from 'react';
import { message, Divider } from 'antd';
import { spawn } from 'child_process';

export default function NewComponent(OldComponent, placeholder){
  return class extends Component{
    constructor(){
      super();
      this.state = {
        data: '',
        show: false
      }
    }

    componentWillMount(){
      this.setState((state, props) => {
        return {
          data: props.value || props.placeholder
        }
      })
    }

    save = (event)=> {
      var reg = /^[0-9a-zA-Z]+$/
      this.setState({
        data: event.target.value
      })
      if(event.target.value){
        if(!reg.test(event.target.value)){
          this.setState({
            show: true
          })
          // message.error('只能是数字字母')
          return
        }
        this.setState({
          show: false
        })
      }
    }
    
    render(){
      return (
        <div>
          <OldComponent data={this.state.data} save={this.save}/> 
          <span style={{ color: 'red' }}>
            {this.state.show ? '只能是数字字母': null}
          </span>
        </div>
      )
    }
  }
}