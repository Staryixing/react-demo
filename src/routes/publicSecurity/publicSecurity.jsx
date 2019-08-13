import React from 'react';
import style from './publicSecurity.less';
import {ThemeContext, themes} from './children/theme-context.js';
import ThemedButton from './children/theme-button';
class PublicSecurity extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            commentlist: ['this is frist replay']
        }
    }

    componentDidMount(){

    }
    
    render() {
      return (
        <div className={style.root}>
          <div className={style.content}>
            <ThemedButton value='按钮'/>
          </div>
        </div>
      )
    }
}

export default PublicSecurity