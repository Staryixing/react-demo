/**
 * Created by yixing on 2019/6/20.
 */

import ApiService from '@utils/httpRequest/ApiService';
import Constant from '@constants/requestConstantValue';

class LoginServices extends ApiService{
  // 获取信息
  getDevices =({
    headers,
    params,
    userinfo
  }) => {
    return this.get('/api/test/profile', {
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
