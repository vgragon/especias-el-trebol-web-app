import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import App from './app/App';

import store from './store';

import {library} from '@fortawesome/fontawesome-svg-core';
import {
    faBars,
    faChevronDown,
} from '@fortawesome/free-solid-svg-icons';

import 'whatwg-fetch';

import './index.css';

library.add(faBars, faChevronDown);

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