import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import App from './app/App';

import store from './store';

import './index.css';

window.store = store;

const Index = () => {
    return (
        <Provider store={store}>
            <Router>
                <App/>
            </Router>
        </Provider>
    );
};

ReactDOM.render(<Index/>, document.getElementById("index"));