import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

import "./Main.scss";

const Main = () => {
    // componentDidMount시 값을 변환하여 CSSTransition에 사용
    const [state, setState] = useState<boolean>(false);

    useEffect(() => {
        setState(true);
    }, []);

    return (
        <div className="main">
            <CSSTransition in={state} classNames="slide-left" timeout={1500}>
                <div className="main__logo">
                    <span className="logo__hey">Hey,</span>
                    <span className="logo__suwon">Suwon</span>
                </div>
            </CSSTransition>
        </div>
    );
};

export default Main;
