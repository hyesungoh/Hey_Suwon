import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { CSSTransition } from "react-transition-group";

import GuideCard from "../../components/GuideCard/GuideCard";
import * as config from "../../config";

import "./Guide.scss";

// 현재 url path를 이용하여 데이터를 호출할 api 주소를 반환
const useCurrentUrlToFetchUrl = () => {
    return `${config.LOCAL_API_URL}${useLocation().pathname}`;
};

// useCurrentUrlToFetchUrl을 이용하여 api에 데이터를 호출
const fetchData = async (url: any) => {
    const response: any = await axios.get(url);
    return response;
};

// 슬라이드바에 사용될 Props를 선언
interface GuideSlideProps {
    ownId: number;
    index: number;
    name: string;
}

// 슬라이드바 Component
const SlideElement = (props: GuideSlideProps) => {
    // id와 현재 scorll 결과 값인  index를 비교하여 클래스를 부여
    console.log(props);
    const { ownId, index, name } = props;
    const isSelected = ownId === index;
    return (
        <div className={`slide__element ${isSelected ? "silde__select" : ""}`}>
            <div className="slide__element__name">
                <h3>{name}</h3>
            </div>
        </div>
    );
};

const Guide = () => {
    // componentDidMount에 호출할 애니메이션을 위헤
    const [state, setState] = useState<boolean>(false);
    // 데이터를 불러왔는 지 상태관리를 위해
    const [data, setData] = useState<any>(null);

    // 현재 스크롤 된 객체를 젖아할 state
    const [currrentIndex, setIndex] = useState<number>(0);

    // 데이터를 불러올 url
    const fetchUrl: string = useCurrentUrlToFetchUrl();

    // Component Mount시 데이터 불러옴과 상태변화를 통해 애니메이션 호출
    useEffect(() => {
        setState(true);
        fetchData(fetchUrl).then((data) => {
            setData(data.data);
        });
    }, []);

    // 스크롤을 확인하여 자식 객체에게 클래스를 부여하기 위해 선언
    const scrollElement = useRef<HTMLInputElement>(null);

    // 스크롤 시 scrollTop을 기준으로 자식 객체를 선택
    const onScroll = useCallback((e) => {
        const currentScroll: number = e.target.scrollTop;
        const currentElement: number = Math.floor(currentScroll / 100);

        // 현재 스크롤 결과를 setState
        setIndex(currentElement);

        // checkCurrentElement(currentElement);
        // getScrollPosition(currentElement);
    }, []);

    // 자식 객체들에게 클래스를 부여, 삭제
    // const checkCurrentElement = (index: number) => {
    //     // 수정할 것 : 현재 객체 수를 파악하여 사용하도록
    //     // 수정할 것 : slidebar__base의 높이또한 객체 수에 따라 수정되도록
    //     const ELEMENT_SIZE: number = 5;

    //     // 현재 선택된 객체에게 클래스 부여
    //     scrollElement.current?.children[index].classList.add("silde__select");
    //     // 선택되지 않은 다른 객체들은 클래스 삭제
    //     for (let i = 0; i < ELEMENT_SIZE; i++) {
    //         if (index !== i) {
    //             scrollElement.current?.children[i].classList.remove(
    //                 "silde__select"
    //             );
    //         }
    //     }

    //     // 원래 선택된 객체를 사용하여 할 수도 있지 않을까?
    // };

    // 데이터의 호출 상태에 따라 Props로 전달받은 컴포넌트를 반환
    const checkDataForMapping = (MappingComponent: any) => {
        // index state값을 props로 사용
        return data !== null
            ? data.map((element: any, index: number) => {
                  return (
                      <MappingComponent
                          key={index}
                          ownId={index}
                          index={currrentIndex}
                          {...element}
                      />
                  );
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
                <div className="guide__cards">
                    {checkDataForMapping(GuideCard)}
                </div>
            </CSSTransition>
        </div>
    );
};

export default Guide;
