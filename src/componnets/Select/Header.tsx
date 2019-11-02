import React,{ Component } from 'react';
import Footer from './children/foot'

interface IProps {
  
}

interface IState{
  themed: string
}

class Header extends Component<IProps, IState>{
  constructor(props: IState){
    console.log('props', props)
    super(props)
    this.state={
      themed: 'red'
    }
  }

  change(){
    this.setState({
      themed: 'yellow'
    })
  }

  render(){
    return (
      <div>
         尾部{ this.state.themed }
         <div onClick={() => this.change()}>点击</div>
         <Footer previousText="上一步" nextText="下一步"/>
      </div>
    )
  }
}

export default Header
