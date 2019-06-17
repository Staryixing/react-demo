import React from 'react'
import LeaveMas from '../../componnets/comments/comments'
import style from './publicSecurity.less'

class PublicSecurity extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            commentlist: ['this is frist replay']
        }
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