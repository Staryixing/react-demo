import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import orginStyle from './index.less';

class DropDownCont extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { visible,style } = this.props;
     //合并style
    let newStyle = Object.assign({},style,{
        display: visible ? "block":"none",
    });
    return (
      <div style={newStyle} className={orginStyle.modelContent}>
        {this.props.children}
      </div>
    )
  }
}
DropDownCont.propTypes = {
  style: PropTypes.object,
  visible: PropTypes.bool,
}
DropDownCont.defaultProps = {
  style: {},
  visible: false,
}
// export default DropdownPortal(DropDownCont) 
export default DropDownCont
