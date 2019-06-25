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
    needLoading
  }) => {
    return this.get('/api/test/profile', {
      params,
      headers,
      needLoading
    });
  }
}

export default new LoginServices()
