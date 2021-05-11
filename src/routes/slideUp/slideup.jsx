import React from 'react';
import {Button} from 'antd';
import style from './slideup.less';

class SlideUP extends React.Component{
    state = {
        sourceData:[
            {
                title: 'Ant Design Title 1',
                id: '1',
                description:"Ant Design, a design language for background applications, is refined by Ant UED Team",
            },{
                title: 'Ant Design Title 2',
                id: '2',
                description:"Ant Design, a design language for background applications, is refined by Ant UED Team  Ant Design",
            },{
                title: 'Ant Design Title 3',
                id: '3',
                description:"Ant Design, a design language for background applications, is refined by Ant UED Team",
            },{
                title: 'Ant Design Title 4',
                id: '4',
                description:"Ant Design, a design language for background applications, is refined by Ant UED Team  Ant Design",
            },{
                title: 'Ant Design Title 5',
                id: '5',
                description:"Ant Design, a design language for background applications, is refined by Ant UED Team",
            },{
                title: 'Ant Design Title 6',
                id: '6',
                description:"Ant Design, a design language for background applications, is refined by Ant UED Team",
            }
        ],
        listMarginTop: '0',
        animate:false
    }
    componentDidMount(){
        // this.timer = setInterval(() => {
        //     this.handleUp()
        // }, 2000);
    }
    componentWillUnmount(){
        this.timer && clearInterval(this.timer)
    }
    handleUp = ()=> {
        let data = this.state.sourceData;
        let self = this;
        let height = document.getElementById("scrollList").getElementsByTagName('li')[0].scrollHeight + 1;
        data.push(data[0]);
        this.setState({
            animate: true,
            listMarginTop: '-'+ height + 'px',
            sourceData: data
        },()=> {
            setTimeout(() => {
                let data1 =this.state.sourceData;
                console.log(this.state.sourceData, 'sourceData');
                data1.shift();
                console.log('data1', data1);
                self.setState({
                    animate: false, 
                    listMarginTop: "0",
                    sourceData: data1
                })
                this.forceUpdate();
            }, 1000)
        })
    }
    render(){
        return <div>
            <Button onClick={this.handleUp}>向上</Button>
            <div className={style.listContainer}>
                <ul id="scrollList" 
                    style={{ marginTop: this.state.listMarginTop }}
                    className={`${this.state.animate? style.animate: ''}`}
                    >
                    {
                        this.state.sourceData.map((item, index) => {
                        return <li className={style.unit} key={index}>
                                {item.title}
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
    }
}

export default SlideUP
