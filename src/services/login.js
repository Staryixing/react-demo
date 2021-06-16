/**
 * Created by yixing on 2019/6/20.
 */
import ApiService from '@utils/httpRequest/ApiService';
import Constant from '@constants/requestConstantValue';

class LoginServices extends ApiService{
  // 登录
  login = ({
    headers,
    params,
    userinfo
  }) => {
    return this.post(`${Constant.API_HOST}/dev/login`, {
      params,
      headers,
      userinfo
    });
  }
  // 获取信息
  getDevices =({
    headers,
    params,
    userinfo
  }) => {
    return this.get(`${Constant.API_HOST}/login`, {
      params,
      headers,
      userinfo
    });
  }

  addDevices = ({params, headers, userinfo}) => {
    return this.post('/api',{
      headers,
      params,
      userinfo
    })
  }

}

export default new LoginServices()
