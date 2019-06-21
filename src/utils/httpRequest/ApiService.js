import HttpHelper from './HttpHelper';

export default class ApiSErvice {
  constructor() {
    this.post = HttpHelper.post;
    this.get = HttpHelper.get;
    this.put = HttpHelper.put;
    this.delete = HttpHelper.delete;
    this.urlPost = HttpHelper.urlPost;
    this.upLoadPost = HttpHelper.upLoadPost;
    this.downLoadPost = HttpHelper.downLoadPost;
    this.postUrlRestful = HttpHelper.postUrlRestful;
    this.postRestful = HttpHelper.postRestful;
    this.getRestful = HttpHelper.getRestful;
    this.processError = HttpHelper.processError;
  }
}
