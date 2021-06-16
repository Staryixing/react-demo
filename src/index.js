import dva from 'dva'
import './index.css';
import router from './router.jsx';
import './rootFontSet'

// 1. 初始化
const app = dva({
    initialState: {},
    onError(e){
        console.log('dva_onError', e);// eslint-disable-line
    }
})
// 4. 注册路由Router
app.router(router);
// 5. start 
app.start('#root')

// ReactDOM.render(<App />, document.getElementById('root'));
// serviceWorker.unregister();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

