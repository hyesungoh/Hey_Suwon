import React, { useState, useEffect, useRef } from "react";
import { useGeocode, useGoogleLoader } from "../../App";
import * as config from "../../config";

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
    const [coordi, setCoordi] = useState<any>();

    const imgArea = useRef<any>(null);
    const mapArea = useRef<any>(null);
    const btn1 = useRef<any>(null);
    const btn2 = useRef<any>(null);
    const btnSelectedCN: string = "selected";
    const loader = useGoogleLoader();
    const coordinate: any = useGeocode(address + name);

    useEffect(() => {
        if (coordi === undefined) {
            coordinate.then((res: any) => {
                const { lat, lng }: any = res.results[0].geometry.location;
                setCoordi({ lat, lng });
            });
        } else {
            loader.load().then(() => {
                const map = new google.maps.Map(
                    mapArea.current as HTMLElement,
                    {
                        center: coordi,
                        zoom: 15,
                        disableDefaultUI: true,
                    }
                );
                const marker = new google.maps.Marker({
                    map: map,
                    position: coordi,
                });
            });
        }
    }, [coordi]);

    const guidecardSwitch = () => {
        btn1.current.classList.toggle(btnSelectedCN);
        btn2.current.classList.toggle(btnSelectedCN);
        imgArea.current.classList.toggle(btnSelectedCN);
        mapArea.current.classList.toggle(btnSelectedCN);
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
