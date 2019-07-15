import React from 'react';

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    event.persist()
    this.setState({
      x: event.clientX -100,
      y: event.clientY -50
    });
  }

  render() {
    return (
      <div style={{ width: '100%' ,height: '100%', cursor: 'move'}} onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    );
  }
}

export default Mouse