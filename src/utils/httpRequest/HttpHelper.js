/**
 * window.fetch
 * 1、创建请求头（如果参数存在，则替代，如果不存在则默认）
 * 2、请求体 get、post、put、delete
 * 3、响应头解析与拦截  200： 如果传参为false 则不提示， 200之外，全部提示
 * 4、请求本身拦截 200 400 等
 * 5、超时时长限制
 * 6、上传文件进度条
 * 7、终止请求
 */
import {message, Modal } from 'antd';
const OldFetchfn = window.fetch;

// 请求头
const creatHeaders = function(headers, userinfo){
  let originHeaders = {
    'Content-Type': 'application/json',
  }
  if(!userinfo){
    originHeaders = {
      ...originHeaders,
      'x-token': '68d4aad0a718890caf66993e3a808e1e'
    }
  }
  if(headers){
    return Object.assign(originHeaders,headers)
  }else{
    return originHeaders
  }
}

// 创建post请求的body
const creatBody = function({headers, params}){
  if(params){
    if(typeof (params) === 'string'){
      return params;
    }
    let body = '';
    if(headers && headers['Content-Type'] === 'application/x-www-form-urlencoded'){
      for(let key in params){
        if(key !== 'sysId'){
          body = body + key + '=' + params[key] + '&'
        }
      }
      body = body + 'sysId=qWechat'
      return body;
    }else {
      return JSON.stringify(params);
    }
  }else {
    return null;
  } 
}

// 设置请求超时时长
window.fetch = function (url, params, timeout = 3000){
  const fetchPromise = OldFetchfn(url, params);
  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('网络请求超时')
    }, timeout) 
  })
  return Promise.race([fetchPromise, timeoutPromise])
}

// 响应拦截 作用在请求成功上
const processSuccess = async function (response){
  let type   = response.headers.get('Content-type');
  let newExp = new RegExp(/application\/json/);
  if(newExp.test(type)){
    let res = await response.json()
    if(res && res.code === 200){
      message.success(res.message);
    }else if(res && res.code !== 200){
      console.log(res, 'res')
      message.error(res.message);
    }
    return res
  }else{
    let res = await response.text();
    return res;
  }
}

// 请求体
class HttpHelper{
  static timeout = 30000;

  // 响应拦截 统一作用在catch错误上
  static processError(url, error){
    console.error("error url:",url);
    if(typeof (error) === 'string'){
      Modal.error({title:error});
      return null
    } else if(typeof(error) === 'object'){
      Modal.error({title:'网络请求出错，请稍后重试'});
      return {code:600,msg:'网络请求出错'};
    }else{
      Modal.error({title:'网络请求出错，请稍后重试'});
      return null;
    }
  }

  static get(url, {params = {}, headers = {}, userinfo = false}){
    // 参数拼接
    let keys = Object.keys(params);
    if(keys.length > 0){
      const paramsArray = [];
      keys.forEach((item) => {
        paramsArray.push(`${item}=${encodeURI(params[item])}`)
      })
      if(url.search(/\?/ === -1)){
        url += `?${paramsArray.join('&')}`
      }else{
        url += `${paramsArray.join('&')}`
      }
    }
    let trueHeaders = creatHeaders(headers, userinfo)
    return fetch(url, {
      method: 'GET',
      headers: trueHeaders
    }).then((response) => {
      return processSuccess(response)
    }).catch((error) => {
      return this.processError(url, error)
    })
  }

  static post(url, {params = {}, headers = {}, userinfo = false}){
    let body = '';
    body = creatBody({headers, params})
    let trueHeaders = creatHeaders(headers, userinfo)
    return fetch(url, {
      method: 'POST',
      body: body,
      headers: trueHeaders
    }).then((response) => {
      return processSuccess(response)
    }).catch((error) => {
      return this.processError(url, error)
    })
  }


}

export default HttpHelper