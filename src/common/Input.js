import React, {Component} from 'react';

export default function NewComponent(OldComponent){
  return class extends Component{
    constructor(props){
			super(props);
			this.state = {
        data: this.props.value
      };
		}
    save = (event)=> {
      var reg = /^[0-9a-zA-Z]+$/
      this.setState({
        data: event.target.value
      })
      this.props.getValue(event.target.value)
      if(event.target.value){
        if(!reg.test(event.target.value)){
          this.setState({
            show: true
          })
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
          {this.props.test}
          <OldComponent data = {this.state} {...this.props} save={this.save} ></OldComponent>
          <span style={{ color: 'red' }}>
            {this.state.show ? '只能是数字字母': null}
          </span>
        </div>
      )
    }
  }
}