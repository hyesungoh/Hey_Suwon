import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import * as config from "./config";
import Navigation from "./components/Navigation/Navigation";
import Weather from "./components/Weather/Weather";
import Guide from "./pages/Guide/Guide";
import Main from "./pages/Main/Main";

import "./App.scss";

const Router = withRouter(({ location }) => (
    <TransitionGroup className="content">
        <CSSTransition key={location.key} classNames="fade" timeout={1200}>
            <Switch location={location}>
                <Route path="/" exact={true} component={Main} />
                <Route path="/tour" component={Guide} />
                <Route path="/hotel" component={Guide} />
                <Route path="/restaurant" component={Guide} />
                <Route path="/cafe" component={Guide} />
            </Switch>
        </CSSTransition>
    </TransitionGroup>
));

function App() {
    // KAKAO MAP API를 불러오는 script 태그를 헤드에 추가
    useEffect(()=> {
        const mapScript: any = document.createElement("script");
        mapScript.async = true;
        mapScript.src = config.MAP_API_URL_KEY;
        document.head.appendChild(mapScript);
    }, []);

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
