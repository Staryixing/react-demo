import React from 'react';
import style from './comment.less'
import { Input,Button } from 'antd';

class LeaveMas extends React.Component {
	constructor(props){
		super(props);
		this.state = {
       
		}
	}
  render () {
		return (
			<div>
				<div className={style.commentContent}>
					<p>评论</p>
				  <Input placeholder="Basic usage" />
					<Button type="primary">Primary</Button>
				</div>
			</div>
		)
	}
}
	
export default LeaveMas;
