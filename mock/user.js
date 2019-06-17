import Mock from 'mockjs';
Mock.mock(/\/login.mock/,{
  'code': 0,
  'data': {
    'list|1-10': [{
    'id| + 1': 1,
    'title': '前端人人',
    'status': 1
    }]
  },
  'message': '操作成功',
  'systemDate': new Date().getTime()
})