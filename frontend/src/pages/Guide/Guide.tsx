import React, { useState, useEffect, Component } from "react";
import { CSSTransition } from "react-transition-group";
import { useLocation } from "react-router-dom";
import axios from "axios";

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
    return <h1>{name}</h1>;
};

const Guide = () => {
    const [state, setState] = useState<boolean>(false);
    const [data, setData] = useState<any>(null);
    const fetchUrl: string = useCurrentUrlToFetchUrl();

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
                <div className="guide__slidebar">
                    {checkDataForMapping(SlideElement)}
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
