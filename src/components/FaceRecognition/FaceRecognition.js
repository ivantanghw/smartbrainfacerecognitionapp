import React from "react";

const FaceRecognition = ({ imageUrl1 }) => {
    return (
        <div className="center ma">
            <div className="mt4 absolute">
                <img  alt="" src={imageUrl1} width='500px' height='auto'/>
            </div>
        </div>
    )
}

export default FaceRecognition;