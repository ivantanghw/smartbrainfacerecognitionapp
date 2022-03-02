import React from "react";
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl1, box1: {topRow, rightCol, bottomRow, leftCol} }) => {
    return (
        <div className="center ma">
            <div className="mt4 absolute">
                <img id='inputImage' alt='' src={imageUrl1} width='500px' height='auto'/>
                <div className='bounding-box' style={
                    {top: topRow, right: rightCol, bottom: bottomRow, left: leftCol}
                    }></div>
            </div>
        </div>
    )
}

export default FaceRecognition;