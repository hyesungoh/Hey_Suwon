import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { CSSTransition } from "react-transition-group";
import { useSpring, animated, interpolate } from "react-spring";

import GuideCard from "../../components/GuideCard/GuideCard";
import * as config from "../../config";

import "./Guide.scss";

const useCurrentUrlToFetchUrl = () => {
    return `${config.LOCAL_API_URL}${useLocation().pathname}`;
};

const fetchData = async (url: any) => {
    const response: any = await axios.get(url);
    return response;
};

interface GuideSlideProps {
    name: string;
}

const SlideElement = (props: GuideSlideProps) => {
    const { name } = props;
    return (
        <div className="slide__element">
            <div className="slide__element__name">
                <h3>{name}</h3>
            </div>
        </div>
    );
};

const Guide = () => {
    const [state, setState] = useState<boolean>(false);
    const [data, setData] = useState<any>(null);
    const fetchUrl: string = useCurrentUrlToFetchUrl();

    const [scrollValue, setScrollValue]: any = useSpring(() => {
        return { xy: [0, 0] };
    });
    const onScroll2 = useCallback(
        (e) => setScrollValue({ st: e.target.scrollTop / 30 }),
        []
    );

    const onScroll = useCallback((e) => {
        console.log(e.target.scrollTop);
        setScrollValue({ st: e.target.scrollTop });
    }, []);

    useEffect(() => {
        setState(true);
        fetchData(fetchUrl).then((data) => {
            setData(data.data);
        });
    }, []);

    const checkDataForMapping = (MappingComponent: any) => {
        return data !== null
            ? data.map((element: any, index: number) => {
                  return <MappingComponent key={index} {...element} />;
              })
            : null;
    };

    return (
        <div className="guide">
            <CSSTransition in={state} classNames="slide-right" timeout={1500}>
                <div className="guide__slidebar" onScroll={onScroll}>
                    <div className="slidebar__base">
                        {checkDataForMapping(SlideElement)}
                    </div>
                </div>
            </CSSTransition>

            <CSSTransition in={state} classNames="slide-left" timeout={1500}>
                <div className="guide__card">
                    {checkDataForMapping(GuideCard)}
                </div>
            </CSSTransition>
        </div>
    );
};

export default Guide;
