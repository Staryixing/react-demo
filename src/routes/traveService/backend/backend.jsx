import React from 'react';
import AccountCard from '@componnets/AccountCard/AccountCard.jsx';

class PublicBackend extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    
    render() {
        return (
            <div>
              组件
              <AccountCard />
            </div>
        )
    }
}

export default PublicBackend