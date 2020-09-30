import React from 'react';
import style from './index.less';
import lane from '../../asset/lane.png';
import Slide from '../../componnets/Slide/index';

class SlideAnimation extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            left: 10
        }
        this.images = [lane, lane, lane, lane, lane, lane]
    }
    componentDidMount(){
        let { left } = this.state;
        
    }
    render(){
        return <div className={style.root}>
            <div className={style.one}>
                <ul className={style.two}>
                   {
                       this.images.map(item => {
                           return <li>
                               <img src={item} />
                           </li>
                       })
                   }
                </ul>
            </div>

            {/* <Slide /> */}
        </div>
    }
}

export default SlideAnimation
