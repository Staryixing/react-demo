import 'whatwg-fetch';
import {message, Modal } from 'antd';
import { routerRedux } from 'dva/router'
const oldFetchfn = window.fetch;

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

// 设置接受json的实体头
const creatHeaders = function(headers){
  let originHeaders = {
    'Content-Type': 'application/json',
    'channel':2
  }
  // 判断当前本地是否存储token,如果存储token则添加到header头
  let localData = sessionStorage.getItem('userInfo');
  if(localData){
    originHeaders = {
      ...originHeaders,
      'x-token':JSON.parse(localData).token
    }
  }

  if(headers){
    return Object.assign(originHeaders,headers)
  }else {
    return originHeaders;
  }
}

// 按照json解析数据
const judgeLogin = async function (response, noDefaultAlert){
  if(!response){
    return Promise.reject('请求返回为空，请稍后重试');
  }
  if(!response.ok){
    return Promise.reject(response.statusText || '请求超时，请稍后重试');
  }

  let type   = response.headers.get('Content-type');
  let newExp = new RegExp(/application\/json/);
  if(newExp.test(type)){
    let res   = await response.json();     // eslint-disable-line
    if(res && res.code !== 200){
      // if(res.msg.length>2000){
      //   let a          = document.createElement('a');
      //   let blob       = new Blob([res.msg],{type:"text/plain;charset=utf-8"});
      //   let url        = window.URL.createObjectURL(blob);
      //       a.href     = url;
      //       a.download = 'error.log';
      //   a.click();
      //   if(!noDefaultAlert){
      //     Modal.error({title:'出错数据过长，已保存Log，请查看文件'})
      //   }
      // }else {
      //   if(!noDefaultAlert){
      //     Modal.error({title:res.msg});
      //   }
      // }

      // 判断用户未登录 则自动跳转
      if(res.code ===10402){
        window.G_dispatch({type: 'globalData/needLogin'});  
      }

      if(!noDefaultAlert){
        Modal.error({title:res.message});
      }

    }else if(res && res.code===200 && res.message && res.message.length>0 && res.message!=='操作成功')      // 增加后台错误，但需要执行完，给错误提示
      message.success(res.message);
    
    if (res && res.code === 401 ) {
      G_dispatch({type: 'globalData/needLogin', payload: {triger: true}});  // eslint-disable-line
      return res;
    }
    return res;
  }else{
    let res = await response.text();  
    return res;
  }
}

// 上传文件的进度
const processDownLoadData = async function(response,noDefaultAlert){
    if (!response) {
        return Promise.reject('请求返回为空，请稍后重试');
    }
    if (!response.ok) {
        return Promise.reject(response.statusText || '请求超时，请稍后重试');
    }
    let type   = response.headers.get('Content-type');
    let newExp = new RegExp(/application\/json/);
    if(newExp.test(type)){
        let json = await response.json();  // eslint-disable-line
        if(json && json.code !== 200){
            if(json.msg.length>2000){
                let a = document.createElement('a');
                let blob = new Blob([json.msg],{type:"text/plain;charset=utf-8"});
                let url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = 'error.log';
                a.click();
                if(!noDefaultAlert){
                    Modal.error({title:'出错数据过长，已保存Log，请查看文件'})
                }
            }else {
                if(!noDefaultAlert){
                    Modal.error({title:json.msg});
                }
            }
        }
        if (json && json.code === 401 ) {
            G_dispatch({type: 'globalData/needLogin', payload: {triger: true}});  // eslint-disable-line
            return json;
        }
        return json;
    } else {
        let blob = await response.blob();  // eslint-disable-line
        if(blob && blob.type === 'application/json');
        let filename = response.headers.get('Content-Disposition');
            filename = filename.split(';')[1].split('=')[1];
        console.log('filename is', filename);
        var a          = document.createElement('a');
        var url        = window.URL.createObjectURL(blob);
            a.href     = url;
            a.download = decodeURIComponent(filename)       // 对于服务端转过来的名字进行解码
        a.click();
        return {code:200,msg:'保存成功'};
    }
}

// 更新原生fetch，增加超时机制
window.fetch = function (url, params, timeOut) {
    const fetchPromise   = oldFetchfn(url, params);
    const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('请求超时，请稍后重试'));
        }, 5000);
    });
    return Promise.race([fetchPromise, timeoutPromise]);
};

class HttpHelper {
    // 超时时间
    static timeout = 30000;

    /*
     *  统一作用在catch错误上
     * url   : 请求地址
     * params: 参数
     * */
    static processError({url,error,needLoading,noDefaultAlert}){
      console.error("error url:",url,error);
      if (needLoading) {
        G_dispatch({type: 'globalData/changeLoadingNum', payload: {delta: -1}});  // eslint-disable-line
      }
      if (typeof (error) === 'string') {
        if(!noDefaultAlert){
              Modal.error({title:error});
        }
        return {code:600,msg:error};
      } else if (typeof (error) === 'object') {
        if(!noDefaultAlert){
            Modal.error({title:'网络请求出错，请稍后重试'});
        }
        return {code:600,msg:'网络请求出错'};
      } else {
        if(!noDefaultAlert){
          Modal.error({title:'网络请求出错，请稍后重试'});
        }
        return {code:600,msg:'网络请求出错，请稍后重试'};
      }
    }

    /*
     *  get请求
     * url   : 请求地址
     * params: 参数
     * */
    static get(turl, { params, headers,needLoading,noDefaultAlert}) { // eslint-disable-line
      let url = turl;
      if (params) {
        const paramsArray = [];
        // 拼接参数
        Object.keys(params).forEach(key => paramsArray.push(`${key}=${encodeURI(params[key])}`));
        if (url.search(/\?/) === -1) {
          url += `?${paramsArray.join('&')}`;
        } else {
          url += `&${paramsArray.join('&')}`;
        }
      }
      let trueHeaders = creatHeaders(headers)
      // fetch请求
      if (needLoading) {
        G_dispatch({type: 'globalData/changeLoadingNum', payload: {delta: 1}});  // eslint-disable-line
      }
      return fetch(url, {
        method: 'GET',
        headers:trueHeaders
      }).then((response) => {
        if (needLoading) {
            G_dispatch({type: 'globalData/changeLoadingNum', payload: {delta: -1}});  // eslint-disable-line
        }
        return judgeLogin(response,noDefaultAlert);
      }).catch((error) => {
        return this.processError({url,error,needLoading,noDefaultAlert});
      });
    }

      /*
     *  post请求
     * url           : 请求地址
     * params        : 参数
     * headers       : headers
     * replaceHeaders: 是否
     * */
    static post(url, {params, headers, needLoading,noDefaultAlert}) {
      let body = '';
      // SignHelper.HandleParams(params);
      body = creatBody({headers, params});
      let trueHeaders = creatHeaders(headers)
      if (needLoading) {
        G_dispatch({type: 'globalData/changeLoadingNum', payload: {delta: 1}});  // eslint-disable-line
      }
      let paramsEntity = {
        method: 'POST',
        headers: trueHeaders,
      }
      if (body) {
        paramsEntity.body = body;
      }
      return fetch(url, paramsEntity).then((response) => {
        if (needLoading) {
          G_dispatch({type: 'globalData/changeLoadingNum', payload: {delta: -1}});  // eslint-disable-line
        }
        return judgeLogin(response,noDefaultAlert);
      }).catch((error) => {
        return this.processError({url,error,needLoading,noDefaultAlert});
      });
    }

    /*
     *  urlPost请求
     * url   : 请求地址
     * params: 参数
     * */

    static urlPost(turl, {headers, params, needLoading,noDefaultAlert}) { // eslint-disable-line
      let url = turl;
      if (params) {
        const paramsArray = [];
        // 拼接参数
        Object.keys(params).forEach((key) => {
          if (Object.prototype.toString.call(params[key]) === '[object Array]') {
            for (const value of params[key]) {
              paramsArray.push(`${key}=${encodeURI(value)}`);
            }
          } else {
            paramsArray.push(`${key}=${encodeURI(params[key])}`);
          }
        });
        if (url.search(/\?/) === -1) {
          url += `?${paramsArray.join('&')}`;
        } else {
          url += `&${paramsArray.join('&')}`;
        }
      }
      return this.post(url, {params, headers, needLoading,noDefaultAlert})
  }

  /*
    *  上传post请求
    * url           : 请求地址
    * params        : 利用formData格式上传
    * headers       : headers
    * replaceHeaders: 是否
    * */ 
  static upLoadPost(url, {params, headers, needLoading,noDefaultAlert}) {
      headers = creatHeaders(headers);
      delete headers['Content-Type'];
      let body = params;
      if (needLoading) {
        G_dispatch({type: 'globalData/changeLoadingNum', payload: {delta: 1}});  // eslint-disable-line
      }
      return fetch(url, {
        method: 'POST',
        headers,
        body,
      }).then((response) => {
        if (needLoading) {
          G_dispatch({type: 'globalData/changeLoadingNum', payload: {delta: -1}});  // eslint-disable-line
        }
        let type   = response.headers.get('Content-type');
        let newExp = new RegExp(/application\/json/);
        if(newExp.test(type)){
          return judgeLogin(response,noDefaultAlert);
        } else{
          return processDownLoadData(response,noDefaultAlert);
        }
      }).catch((error) => {
        return this.processError({url,error,needLoading,noDefaultAlert});
      });
    }

     /*
     *  上传post请求
     * url           : 请求地址
     * params        : 利用formData格式上传
     * headers       : headers
     * replaceHeaders: 是否
     * */
    static downLoadPost(url, {params, headers, needLoading,noDefaultAlert}) {
      headers = creatHeaders(headers);
      let body    = creatBody({headers, params});
      if (needLoading) {
          G_dispatch({type: 'globalData/changeLoadingNum', payload: {delta: 1}});  // eslint-disable-line
      }
      return fetch(url, {
        method: 'POST',
        headers,
        body,
      }).then((response) => {
        if (needLoading) {
          G_dispatch({type: 'globalData/changeLoadingNum', payload: {delta: -1}});  // eslint-disable-line
        }
        return processDownLoadData(response,noDefaultAlert);
      }).catch((error) => {
        return this.processError({url,error,needLoading,noDefaultAlert});
      });
    }

    /*
     *  put请求
     * url           : 请求地址
     * params        : 参数
     * headers       : headers
     * replaceHeaders: 是否
     * */
    static put(url, {params, headers, needLoading, noDefaultAlert}) {
      let body = '';
      // SignHelper.HandleParams(params);
      const handleResult = params;
      body = JSON.stringify(handleResult);
      if (needLoading) {
        G_dispatch({type: 'globalData/changeLoadingNum', payload: {delta: 1}});  // eslint-disable-line
      }
      let trueHeaders = creatHeaders(headers)
      
      return fetch(url, {
        method: 'PUT',
        headers: trueHeaders,
        // headers: {
        //     'Content-Type': 'application/json;charset=UTF-8',
        // },
        body,
      }).then((response) => {
        if (needLoading) {
          G_dispatch({type: 'globalData/changeLoadingNum', payload: {delta: -1}});  // eslint-disable-line
        }
        return judgeLogin(response,noDefaultAlert);
      }).catch((error) => {
        return this.processError({url,error,needLoading,noDefaultAlert});
      });
    }

    /**
     * delete请求
     * url           : 请求地址
     * params        : 参数
     * headers       : headers
     * replaceHeaders: 是否
     */
    static delete(url, {params, headers, needLoading, noDefaultAlert}){
      let body = '';
      const handleResult = params;
      body = JSON.stringify(handleResult);
      if (needLoading) {
        G_dispatch({type: 'globalData/changeLoadingNum', payload: {delta: 1}});  // eslint-disable-line
      }
      let trueHeaders = creatHeaders(headers)
      return fetch(url, {
        method: 'DELETE',
        headers: trueHeaders,
        body,
      }).then((response) => {
        if (needLoading) {
          G_dispatch({type: 'globalData/changeLoadingNum', payload: {delta: -1}});  // eslint-disable-line
        }
        return judgeLogin(response,noDefaultAlert);
      }).catch((error) => {
        return this.processError({url,error,needLoading,noDefaultAlert});
      })
    }


    /*
     *  restfulGet请求
     * params: 参数类型是object {year:year,day:day}
     * http  :                                  //www.example.com/photo/{year}/{day}/{month}/{topic}        （resful接口类型）
     * http  :                                  //www.example.com/photo/{year}/{day}/{month}/{topic}/ship   （resful接口类型）
     * */
    static getRestful(url, restfulParams, params, needLoading,noDefaultAlert) {
      let newUrl;
      if (restfulParams instanceof Object) {
        Object.keys(restfulParams).forEach(
          (k) => {
            const rex    = new RegExp(`{${k}}`, 'i');
            newUrl = url.replace(rex, restfulParams[k]);
          },
        );
      }
      return this.get(newUrl, {params, needLoading,noDefaultAlert});
    }

    /*
     *  restfulPut请求
     * params: 参数类型是object {year:year,day:day}
     * http  :                                  //www.example.com/photo/{year}/{day}/{month}/{topic}        （resful接口类型）
     * http  :                                  //www.example.com/photo/{year}/{day}/{month}/{topic}/ship   （resful接口类型）
     * */
    static postRestful(url, {restfulParams, params, needLoading,noDefaultAlert}) {
      let newUrl;
      if (restfulParams instanceof Object) {
        Object.keys(restfulParams).forEach(
          (k) => {
            const rex    = new RegExp(`{${k}}`, 'i');
            newUrl = url.replace(rex, restfulParams[k]);
          },
        );
      }
      return this.post(newUrl, {params, needLoading,noDefaultAlert});
    }

    /*
     *  restfulPostUrl请求
     * params: 参数类型是object {year:year,day:day}
     * http  :                                  //www.example.com/photo/{year}/{day}/{month}/{topic}        （resful接口类型）
     * http  :                                  //www.example.com/photo/{year}/{day}/{month}/{topic}/ship   （resful接口类型）
     * */
    static postUrlRestful(url, {restfulParams, params, needLoading,noDefaultAlert}) {
        let newUrl;
        if (restfulParams instanceof Object) {
          Object.keys(restfulParams).forEach(
            (k) => {
              const rex    = new RegExp(`{${k}}`, 'i');
              newUrl = url.replace(rex, restfulParams[k]);
            },
          );
        }
        return this.urlPost(newUrl, {params, needLoading,noDefaultAlert});
    }
}

export default HttpHelper;