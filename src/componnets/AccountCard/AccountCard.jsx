import React from 'react'
import style from './AccountCard.less'
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import NOPIC from '@asset/images/nopic.png'
class AccountCard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        
    }
    this.handleDetail = this.handleDetail.bind(this)
  }
  handleDetail(id){
    this.props.subHandleDetail(id)
  }

  accountFoot(){
    return <div className={style.accountFoot}>
        <div className={style.footerAccount}>
          {`账号：${this.props.name}`}
        </div>
        {/* <div className={style.footerEquip}>
          管理设备:{this.props.epuip.length?this.props.epuip:'暂无'}
        </div> */}
        
          <div className={style.footerEquip}>
              状态：{this.props.status}
        </div>
    </div>
  }
  
  userFoot(){
    return <div className={style.footerUser}>
        <div className={style.nameWrapper}>

          {this.renderTitle(this.props.personStatus,this)}
 
        </div>
        <div className={style.userAddress}>
          <Icon type="environment" />
          { this.props.workLocation }
        </div>
        <div className={style.usertime}>
          { `时间：${this.props.joinTime}` }
        </div>
    </div>
  }

  renderTitle = (type,_this) => {
   switch (type){
      case 0:
        return  <><span className={style.userName}>{ _this.props.name }</span>
        <span className={style.userPosition}>{ _this.props.profession }</span></>;
      case 1:
        return <span style={{color:'rgb(250, 173, 20)'}}>离职员工</span>;
      case 2:
        return <span style={{color:'red'}}>陌生人</span> ;
    }

  }

  componeyFoot(){
    return <div className={style.accountFoot}>
    <div className={style.footerAccount}>
      {`${this.props.name}`}
    </div>
    <div className={style.footerEquip}>
      {`管理员:${this.props.adminlist}`}
    </div>
</div>
  }

  handleRender=(type)=>{
    
   switch (type){
      case 'user':
      return this.userFoot();
      case 'account':
      return this.accountFoot();
      case 'componey':
      return this.componeyFoot();
    }
  }
  render(){
    const imgUrl = this.props.imgUrl || this.props.headUrl || this.props.headUrl || NOPIC || ''
    return (
      <div className={style.cardContent} onClick={() => this.handleDetail(this.props.id)}>
        <section className={style.cardHeader} 
        style={this.props.type === 'user'?
         { background:`#000 url(${imgUrl}) center center / contain no-repeat`}:
         { background:`url(${imgUrl}) center center / cover no-repeat`}}>
        </section>
        <footer className={style.cardFooter}>
          {/* { this.props.type === 'account' ? this.accountFoot() : this.userFoot() } */}
          {this.handleRender(this.props.type)}
        </footer>
      </div>
    )
  }
}

AccountCard.propTypes = {
  // 人员属性
  name: PropTypes.string, // 名字
  joinTime: PropTypes.string, // 参加时间
  profession: PropTypes.string, // 职业
  workLocation: PropTypes.string, // 地址,
  headUrl: PropTypes.string, // 照片
  equip: PropTypes.array,
  // id: PropTypes.number,
  handleDetail: PropTypes.func,
  type: PropTypes.string
}

AccountCard.defaultProps = {
  name: '',
  joinTime: '',
  profession: '',
  workLocation: '',
  headUrl: '',
  equip: [],
  id: 0,
  type: 'account',
  handleDetail: () => {}
}

export default AccountCard