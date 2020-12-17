import React from "react";

interface GuideProps {
    name: string;
    image: string;
    address: string;
    summary?: string;
}

const GuideCard = (props: GuideProps) => {
    const { name, image, address } = props;
    console.log(props);
    return (
        <div>
            <h1>{name}</h1>
            <span>{address}</span>
        </div>
    );
};

export default GuideCard;
