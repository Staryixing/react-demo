import React from 'react';
import style from './index.less';
import lane from '../../asset/lane.png';
import Slide from '../../componnets/Slide/index';
import Animate from 'rc-animate';

const Div = (props) => {
    const { style, show, ...restProps } = props;
    const newStyle = { ...style, display: show ? '' : 'none' };
    return <div {...restProps} style={newStyle}/>;
};
class SlideAnimation extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            left: 10,
            exclusive: false,
            enter: true,
        }
        this.images = [lane, lane, lane, lane, lane, lane]
    }
    componentDidMount(){
        let { left } = this.state;
        
    }
    toggle (){}
    toggleAnimate = () => {
        this.setState({
          enter: !this.state.enter,
        });
      }    
    render(){
        const style = {
            // display: this.state.enter ? 'block' : 'none',
            marginTop: '20px',
            width: '200px',
            height: '200px',
            backgroundColor: 'red',
        };
        return <div className={style.root}>
            <div className={style.one}>
                {/* <ul className={style.two}>
                   {
                       this.images.map(item => {
                           return <li>
                               <img src={item} />
                           </li>
                       })
                   }
                </ul> */}
                <label><input
                type="checkbox"
                onChange={this.toggle.bind(this, 'enter')}
                checked={this.state.enter}
                />
                show</label>
                &nbsp;
                <label><input
                type="checkbox"
                onChange={this.toggle.bind(this, 'exclusive')}
                checked={this.state.exclusive}
                />
                exclusive</label>
                <br/><br/>
                <button onClick={this.toggleAnimate}>toggle</button>
                {/* {this.state.enter ? <div key="1" style={{ width: 100, height: 100, background: 'red' }}/> : null} */}
                <Animate
                    component=""
                    transitionName="fade"
                    >
                    {this.state.enter ? <div key="1" style={style}/> : null}
                </Animate>
            </div>

            {/* <Slide /> */}

        </div>
    }
}

export default SlideAnimation
