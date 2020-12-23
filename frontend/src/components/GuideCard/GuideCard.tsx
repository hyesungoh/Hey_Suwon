import React, { useState, useEffect, useRef } from "react";
import { useGoogleLoader } from "../../App";

import "./GuideCard.scss";

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
    const mapArea = useRef<any>(null);
    const loader = useGoogleLoader();

    useEffect(() => {
        loader.load().then(() => {
            const map = new google.maps.Map(
                mapArea.current as HTMLElement,
                {
                    center: { lat: -34.397, lng: 150.644 },
                    zoom: 12,
                }
            );
        });
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
