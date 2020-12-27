import React from "react";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Loader } from "@googlemaps/js-api-loader";
import Geocode from "react-geocode";

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

export const useGoogleLoader = () => {
    const loader = new Loader({
        apiKey: config.GOOGLE_MAP_API_KEY,
        mapIds: [config.GOOLGE_MAP_STYLE_KEY],
    });

    return loader;
};

export const useGeocode = (addr: string): any => {
    Geocode.setApiKey(config.GOOGLE_MAP_API_KEY);
    Geocode.setLanguage("kr");
    Geocode.enableDebug();

    const data = Geocode.fromAddress(addr).then(
        (response) => {
            return response;
        },
        (error) => {
            return error;
        }
    );
    return data;
};

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
