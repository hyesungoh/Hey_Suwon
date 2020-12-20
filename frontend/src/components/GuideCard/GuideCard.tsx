import React, { useEffect, useRef } from "react";
import axios from "axios";
import "./GuideCard.scss";

interface GuideProps {
    name: string;
    image: string;
    address: string;
    summary?: string;
}

const {kakao}: any = window;

export const getScrollPosition = (sp: any) => {
    console.log(sp);
};

const GuideCard = (props: GuideProps) => {
    const { name, image, address } = props;
    const mapArea = useRef<any>();

    useEffect(() => {
        console.log(window.localStorage);
        const container: any = document.getElementById("guidecard__map");
        const options: any = {
            center: new kakao.maps.LatLng(37.506502, 127.053617),
            level: 3,
        };

        const mapz: any = new kakao.maps.Map(container, options);
    }, []);

    return (
        <div className="guidecard">
            <div className="guidecard__data">
                <div className="guidecard__map" ref={mapArea}></div>
                {/* <img src={image} alt={name} /> */}
            </div>
            <div className="guidecard_info">
                <h1>{name}</h1>
                <span>{address}</span>
            </div>
        </div>
    );
};

export default GuideCard;
