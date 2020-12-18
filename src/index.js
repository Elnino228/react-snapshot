import React from 'react';
import './i18n/i18n'
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from "./containers/App/App";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {rootReducer} from "./redux/reducer/rootReducer";
// import App from './App';

// import './index.css';

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
