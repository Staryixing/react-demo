import React from 'react';
import { Router, Route } from 'dva/router';
import rootRoute from './rootRoute.jsx';

import {LocaleProvider} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <LocaleProvider locale={zh_CN}>
        <Route path="/" component={rootRoute}/>
      </LocaleProvider>
    </Router>
  );
}

export default RouterConfig;