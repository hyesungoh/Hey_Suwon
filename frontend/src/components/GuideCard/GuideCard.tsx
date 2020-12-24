import React, { useState, useEffect, useRef } from "react";
import { useGeocode, useGoogleLoader } from "../../App";
import * as config from "../../config";

import "./GuideCard.scss";

// Guide에서 받아올 Props, Restaurant시에만 summary가 포함돼어 아래와 같이 작성
interface GuideProps {
    name: string;
    image: string;
    address: string;
    summary?: string;
}

export const getScrollPosition = (sp: any) => {
    console.log(sp);
};

const GuideCard = (props: GuideProps) => {
    const { name, image, address } = props;
    // 좌표를 저장할 state
    const [coordi, setCoordi] = useState<any>();

    // slider를 구현하기 위한 useRef들
    const imgArea = useRef<any>(null);
    const mapArea = useRef<any>(null);
    const btn1 = useRef<any>(null);
    const btn2 = useRef<any>(null);

    // 선택 시 부여되는 클래스 명
    const selectedCN: string = "selected";

    // app.tsx에 존재하는 구글 맵 loader와 geocoder
    const loader = useGoogleLoader();
    const coordinate: any = useGeocode(address + name);

    useEffect(() => {
        // 좌표를 받아오기 전일 시
        if (coordi === undefined) {
            // geocoder을 이용하여 주소 + 상호명을 좌표값으로 반환받은 값을 setState
            coordinate.then((res: any) => {
                const { lat, lng }: any = res.results[0].geometry.location;
                setCoordi({ lat, lng });
            });
        // 좌표를 받아온 후일 시
        } else {
            // google map을 이용하여 지도와 마커 생성
            loader.load().then(() => {
                const map = new google.maps.Map(
                    mapArea.current as HTMLElement,
                    {
                        center: coordi,
                        zoom: 15,
                        // google map의 기본 UI를 안보이게 설정
                        disableDefaultUI: true,
                    }
                );
                const marker = new google.maps.Marker({
                    map: map,
                    position: coordi,
                });
            });
        }
        // dependency로 state값을 넣어 값 할당 시 재호출되도록 작성
    }, [coordi]);

    // 카드 클릭 시
    const guidecardSwitch = () => {
        // ui span toggle
        btn1.current.classList.toggle(selectedCN);
        btn2.current.classList.toggle(selectedCN);
        // 이미지와 지도 toggle
        imgArea.current.classList.toggle(selectedCN);
        mapArea.current.classList.toggle(selectedCN);
    };

    return (
        <div className="guidecard">
            <div className="guidecard__data" onClick={guidecardSwitch}>
                <div className="guidecard__button">
                    <span className="selected" ref={btn1}></span>
                    <span ref={btn2}></span>
                </div>
                <img ref={imgArea} className="selected" src={image} alt={name} />
                <div className="guidecard__map" ref={mapArea}></div>
            </div>
            <div className="guidecard_info">
                <h1>{name}</h1>
                <span>{address}</span>
            </div>
        </div>
    );
};

export default GuideCard;
