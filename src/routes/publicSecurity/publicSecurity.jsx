import React from 'react'
import LeaveMas from '../../componnets/comments/comments'
import style from './publicSecurity.less'
const navlist = [
  {
    name: "首页",
    title: "首页",
    icon: "profile",
    path: "/mainpage/home",
    key: "01",
    activeId: "01",
    authority: [1],
    routes: [
      {
        path: "/mainpage/parkrobotdispatch"
        // component: ParkRobotDispatch
      },
      {
        path: "/mainpage/basicMap"
        // component: BasicMap
      },
      {
        path: "/mainpage/home"
        // component: ShowMap
      }
    ]
  },
  {
    name: "停车场机器人",
    title: "停车场机器人",
    icon: "profile",
    authority: [1],
    key: "02",
    activeId: "02",
    routes: [],
    child: [
      {
        name: "机器人管理/控制",
        title: "机器人管理/控制",
        icon: "profile",
        key: "21",
        path: "/mainpage/robot/manage",
        activeId: "02",
        routes: [
          {
            path: "/mainpage/robot/manage",
            // component: RobotManage,
            activeId: "02"
          },
          {
            path: "/mainpage/robot/add",
            // component: RobotAdd,
            activeId: "02"
          }
        ]
      },
      {
        name: "机器人充电设备",
        title: "机器人充电设备",
        icon: "profile",
        path: "/mainpage/robot/charge",
        key: "22",
        activeId: "02",
        routes: [
          {
            path: "/mainpage/robot/charge",
            // component: ChargeDevices,
            activeId: "02"
          }
        ]
      },
      {
        name: "历史订单",
        title: "历史订单",
        key: "23",
        activeId: "02",
        path: "/mainpage/robot/order",
        routes: [
          {
            path: "/mainpage/robot/order",
            // component: HistoryOrders,
            activeId: "02"
          }
        ],
        child: [
          {
            name: "历史订单",
            title: "历史订单",
            key: "23",
            activeId: "02",
            path: "/mainpage/robot/order",
            routes: [
              {
                path: "/mainpage/robot/children",
                // component: HistoryOrders,
                activeId: "02"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "停车场一体机",
    title: "停车场一体机",
    authority: [1],
    key: "03",
    activeId: "03",
    routes: [
      {
        path: "/mainpage/yitiji/order",
        // component: HistoryOrders,
        activeId: "03"
      }
    ]
  },
  {
    name: "用户管理",
    title: "",
    authority: [1, 2],
    key: "05",
    activeId: "05",
    routes: []
  }
];
class PublicSecurity extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            commentlist: ['this is frist replay']
        }
    }

    componentDidMount(){
     console.log("返回", this.foo(navlist));
    }
    foo = (arr) => {
      let arr2 = [];
      for(let i=0; i< arr.length; i++){
        let arrs = arr[i].routes;
        let child = arr[i].child;
        if(child){
          if(arrs.length>0){
            arr2 = arr2.concat(arrs);
          }
          arr2 = arr2.concat(this.foo(child));
        }else{
          if(arrs.length>0){
            arr2 = arr2.concat(arrs);
          }
        }
      }
      return arr2;
    }

    render() {
      return (
        <div>
            <div className={style.comments}>
              评论区
            </div>
            <LeaveMas></LeaveMas>
        </div>
      )
    }
}

export default PublicSecurity