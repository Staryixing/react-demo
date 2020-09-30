import React,{ Component } from 'react';
import styles from './index.less';
import banner from '../../asset/wuyi.png';

const imgs = [
    banner,banner, banner,banner,banner
]
class Slide extends Component{
    constructor(){
        super()
        this.state = {
            index: 1,
            images: [banner,banner, banner,banner,banner]
        }
    }
    componentDidMount(){
        setInterval(() => {
            if(this.state.index >=4){
                this.ul.style.transitionDuration = '0s';
                this.ul.style.left = 0;
                setTimeout(() =>{
                    this.ul.style.transitionDuration ='0.5s';
                    this.setState({
                        index: 1
                    })
                },0)
                return
            }
            this.setState({
                index: this.state.index + 1
            })
        },1000)
    }
    render(){
        let style = {
            left: -400*this.state.index + 'px'
        }
        return (
            <div className={styles.wrap}>
                <ul style={style} ref={ul => this.ul = ul} className={styles.slide}>
                    {/* <li><img src={banner} alt=""/></li>
                    <li><img src={banner} alt=""/></li>
                    <li><img src={banner} alt=""/></li>
                    <li><img src={banner} alt=""/></li> */}
                    {
                        this.state.images.map(item => {
                           return <li >
                                <img src={item} alt=""/>
                            </li>
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default Slide
