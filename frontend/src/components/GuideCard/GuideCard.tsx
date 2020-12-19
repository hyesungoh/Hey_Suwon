import React from "react";

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
    console.log(props);
    return (
        <div className="guidecard">
            <div className="guidecard__img">
                <img src={image} alt={name} />
            </div>
            <div className="guidecard_info">
                <h1>{name}</h1>
                <span>{address}</span>
            </div>
        </div>
    );
};

export default GuideCard;
