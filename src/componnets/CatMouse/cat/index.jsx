import React from 'react';
import cat from '../../../asset/Cat.png';

class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <div>
        <span style={{ position: 'fixed', left: mouse.x, top: mouse.y }}>
          <img src={cat} style={{ width: 100, height: 100 }}/>
        </span>
      </div>
      // 
    );
  }
}

export default Cat