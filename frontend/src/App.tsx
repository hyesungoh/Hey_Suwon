import React, { useState } from "react";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Navigation from "./components/Navigation/Navigation";
import Weather from "./components/Weather/Weather";

import "./App.scss";

const Router = withRouter(({location}) => (
    <TransitionGroup>
        <CSSTransition key={location.key} classNames="slide" timeout={3000}>
            <Switch location={location}>
                <Route path="/" exact={true} />
                <Route path="/tour"  />
                <Route path="/hotel"  />
                <Route path="/restaurant"  />
                <Route path="/cafe"  />
            </Switch>
        </CSSTransition>
    </TransitionGroup>
))

function App() {
    return (
        <div className="app">
            <div className="bg"></div>
            <BrowserRouter>
                <Navigation />
                <Router />
            </BrowserRouter>
            <Weather />
        </div>
    );
}

export default App;
