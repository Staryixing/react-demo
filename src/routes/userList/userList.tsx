import React, { Component } from 'react';
interface IProps {

}

interface IState {
    name: string
}

class UserList extends Component<IProps,IState>{
    constructor(props: IProps){
        super(props)
        this.state = {
            name: '1'
        }
    }
    render(){
        return (
            <div>
                用户列表
                {this.state.name}
            </div>
        )
    }
}

export default UserList;
