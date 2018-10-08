import React, {Component} from 'react';

import Dialog from './common/dialog/Dialog';
import Header from './header/Header';
import Body from './body/Body';

import './App.css';

class App extends Component {
    render() {
        return (
            <div className={"app"}>
                <Dialog/>
                <Header/>
                <Body/>
            </div>
        )
    }
}

export default App;