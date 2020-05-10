import React from 'react';
import ReactDOM from 'react-dom';
import {ConfigProvider} from 'antd'
import './index.css';
import Router from './router'
import { Provider } from 'react-redux'
import store from './redux/store'
import * as serviceWorker from './serviceWorker';
import './components/notification'
import zhCN from 'antd/es/locale-provider/zh_CN';
const Main = (
    <Provider store={store}>
        <ConfigProvider locale={zhCN}>
            <Router />
        </ConfigProvider>
    </Provider>
)

ReactDOM.render(Main, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
