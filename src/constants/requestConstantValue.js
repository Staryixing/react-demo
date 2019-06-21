/**
 * Created by yixing on 2019/6/20.
 */

 const host = 'http://localhost:3002';

//  设置服务器地址可变的后门程序
const localIp = localStorage.getItem('ip') || host

 export default {
  // 本地服务器地址
  API_HOST: localIp,
 }