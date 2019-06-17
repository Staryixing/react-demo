import React, { Component, Fragment, useState, useEffect } from 'react';
import { Icon, Divider } from 'antd';

import LoginLayout from '@componnets/login/loginLayout'

const copyright = (
  <Fragment>
    copyright <Icon type="copyright" /> 2019
  </Fragment>
)

class UserLayout extends Component {
  constructor(props){
    super(props)
    this.state = {
      foo: '1'
    }
    this.loginJump = this.loginJump.bind(this)
  }

  componentDidMount() {
    console.log(this.props, 'this')
  }

  loginJump(){
    this.props.history.push('/mainpage/publicSecurityServicesMenu')
  }

  render() {
    return (
      <div>
        登录页面
        <LoginLayout loginJump={this.loginJump}/>
      </div>
    )
  }
}

export default UserLayout;

// hook 例子
// const useMousePosition = () => {
//   const [position,setPosition] = useState({ x: 0,y: 0 });
//   function handleMove(e) {
//     setPosition({ x: e.clientX, y: e.clientY });
//   }
//   useEffect(() => {
//     window.addEventListener('mousemove', handleMove);
//         document.title = `(${position.x},${position.y})`;
//         return () => {
//             // return的function 可以相当于在组件被卸载的时候执行 类似于 componentWillUnmount
//             window.removeEventListener('mousemove', handleMove);
//         };
//   },[position])
//   return position
// }

// export default function UserLayout(){
//   const {x, y} = useMousePosition();
//   return <div>
//     current position x: {x}, y:{y}
//   </div>
// }