import React,{Component} from 'react';
import DropDown from './index.jsx';

class DropDownCom extends Component{
  constructor(props){
    super(props)
    this.state ={
      dialogVisible: false
    }
  }

  toggleVis = (e)=>{
    e.persist()
    this.setState({
        dialogVisible:!this.state.dialogVisible,
        dtop: e.clientY + 20,
        dleft: e.clientX
    })
  };

  open = ()=>{
    this.setState({
      delay: true
    })
  };

  close = ()=>{
    this.setState({
      dialogVisible:false
    })
  };

  onClose =()=> {
    this.setState({
      delay: false
    })
    setTimeout(() => {
      if(!this.state.delay){
        this.setState({
          dialogVisible:false
        })
      }
    }, 200)
  };

  render(){
    return (
      <div>
        <DropDown
          // 自定义的style
          style={{
            left: this.state.dleft,
            top: this.state.dtop,
          }}
          visible={this.state.dialogVisible}
          onShow={this.open}
          onClose={this.close}
          >
            {this.props.overlay}
        </DropDown>

        <div onClick={this.toggleVis} style={{ padding: '4px 6px',background:'#333', display: 'inline-block' }} onMouseLeave={this.onClose}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default DropDownCom

