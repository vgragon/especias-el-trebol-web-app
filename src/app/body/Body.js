import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import appRoutes from './../../routes';

import './Body.css';

class Body extends Component {
    render() {
        let routesRender = appRoutes.map((route, index) => {
            return route.to ? <Redirect {...route} key={index}/> : <Route {...route} key={index}/>;
        });

        return (
            <main className={"app-body"}>
                <Switch>
                    {routesRender}
                </Switch>
            </main>
        )
    }
}

export default Body;