import React, { Component } from 'react';

interface IProps {
  previousText?: string,
  nextText?: string,
  onPressPrevious?:() => void,
}
interface Istate {

}
class Footer extends Component<IProps>{
  constructor(props: Istate){
    console.log('props', props)
    super(props)
  }
  render(){
    const { previousText, nextText, onPressPrevious } = this.props
    return (
      <div>
        <div>
          <span>{previousText}</span>
        </div> 
        <div>
          <span>{nextText}</span>
        </div>
      </div>
    )
  }
}

export default Footer
