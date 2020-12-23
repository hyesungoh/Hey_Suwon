import React, { useState, useEffect, useRef } from "react";
import { useGeocode, useGoogleLoader } from "../../App";

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

    const mapArea = useRef<any>(null);
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
                    }
                );
                const marker = new google.maps.Marker({
                    position: coordi,
                    map: map,
                });
            });
        }
    }, [coordi]);

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
