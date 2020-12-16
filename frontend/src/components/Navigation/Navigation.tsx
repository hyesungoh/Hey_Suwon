import React from "react";
import { Link } from "react-router-dom";

import "./Navigation.scss";

const Navigation = () => {
    return (
        <div className="nav">
            <div className="nav__logo">
                <Link to="/">
                    <h1>Hey, Suwon</h1>
                </Link>
            </div>
            <div className="nav__router">
                <Link to="/tour">Tour</Link>
                <Link to="/hotel">Hotel</Link>
                <Link to="/restaurant">Restaurant</Link>
                <Link to="/cafe">Cafe</Link>
            </div>
        </div>
    );
};

export default Navigation;
