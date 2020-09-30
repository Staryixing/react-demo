import React from 'react';
import style from './publicSecurity.less';
import {ThemeContext, themes} from './children/theme-context.js';
import ThemedButton from './children/theme-button';

function Toolbar(props){
  return (
    <ThemedButton onClick={props.changeTheme} value={props.value}></ThemedButton>
  )
}

class PublicSecurity extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            theme: themes.light
        }
        this.toggleTheme = () => {
          this.setState(state => ({
            theme: state.theme === themes.dark ? themes.light : themes.dark
          }))
        }
    }

    componentDidMount(){
      
    }
    

    render() {
      return (
        <div className={style.root}>
            <section className={style.content}>
              {/* themecontext的provider 将value分发下去 */}
              <ThemeContext.Provider value={this.state.theme} >
                <div className={style.titleBar}>
                  <section>
                    <ThemedButton value='class' outstyle={style.butStyle}/>
                    <ThemedButton value='hook' outstyle={style.butStyle}/>
                    <ThemedButton value='custom' outstyle={style.butStyle}/>
                  </section>
                  <Toolbar changeTheme={this.toggleTheme} value='按钮'/>
                </div>
                <section className={style.scene}>
                  <span>电影</span>
                </section>
              </ThemeContext.Provider>
            </section>
        </div>
      )
    }
}

export default PublicSecurity