import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { CSSTransition } from "react-transition-group";

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

    const scrollElement = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setState(true);
        fetchData(fetchUrl).then((data) => {
            setData(data.data);
        });
    }, []);

    const checkCurrentElement = (index: number) => {
        const ELEMENT_SIZE: number = 5;
        scrollElement.current?.children[index].classList.add("silde__select");
        for (let i = 0; i < ELEMENT_SIZE; i++) {
            if (index !== i) {
                scrollElement.current?.children[i].classList.remove(
                    "silde__select"
                );
            }
        }
    };

    const onScroll = useCallback((e) => {
        const currentScroll: number = e.target.scrollTop;
        const currentElement: number = Math.floor(currentScroll / 100);
        checkCurrentElement(currentElement);
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
                <div className="scrollbar_deleter">
                    <div className="guide__slidebar" onScroll={onScroll}>
                        <div className="slidebar__base" ref={scrollElement}>
                            {checkDataForMapping(SlideElement)}
                        </div>
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
