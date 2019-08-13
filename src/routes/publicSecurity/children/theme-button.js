import React, {Component} from 'react';
import { ThemeContext } from './theme-context.js'

class ThemeButton extends Component{
  render() {
    let props = this.props;
    let theme = this.context;
    return(
      <div {...props} style={{ backgroundColor: theme.background, color:theme.foreground, display: 'inline-block' }}>{props.value}</div>
    )
  }
}

ThemeButton.contextType = ThemeContext

export default ThemeButton
