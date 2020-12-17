import React from "react";
import { Link, useLocation } from "react-router-dom";

import "./Navigation.scss";

const useCheckPath = (linkPath: string) => {
    const linkActiveClassName = "link__active"
    if (linkPath === useLocation().pathname) {
        return linkActiveClassName;
    } else {
        return;
    }
}

const Navigation = () => {
    return (
        <div className="nav">
            <div className="nav__logo">
                <Link to="/">
                    <h1>Hey, Suwon</h1>
                </Link>
            </div>
            <div className="nav__router">
                <Link to="/tour" className={useCheckPath("/tour")}>
                    Tour
                    <span></span>
                </Link>
                <Link to="/hotel" className={useCheckPath("/hotel")}>
                    Hotel
                    <span className="link__border"></span>
                </Link>
                <Link to="/restaurant" className={useCheckPath("/restaurant")}>
                    Restaurant
                    <span className="link__border"></span>
                </Link>
                <Link to="/cafe" className={useCheckPath("/cafe")}>
                    Cafe
                    <span className="link__border"></span>
                </Link>
            </div>
        </div>
    );
};

export default Navigation;
