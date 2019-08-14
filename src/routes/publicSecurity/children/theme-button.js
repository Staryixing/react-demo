import React, {Component} from 'react';
import PropTypes from 'prop-types';
import style from './theme-button.less';
import { ThemeContext } from './theme-context.js'

class ThemeButton extends Component{

  render() {
    let props = this.props;
    let theme = this.context;
    return(
      <div className={style.root +' '+props.outstyle}
        style={{ backgroundColor: theme.background, color:theme.foreground }}
        {...props} >
          {props.value}
      </div>
    )
  }
}

ThemeButton.contextType = ThemeContext

ThemeButton.propTypes = {
  outstyle: PropTypes.string
}
ThemeButton.defaultProps = {
  outstyle: ''
}
export default ThemeButton
