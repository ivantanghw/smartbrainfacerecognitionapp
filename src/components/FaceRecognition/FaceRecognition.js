import React from "react";
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl1, box1 }) => {
    return (
        <div className="center ma">
            <div className="mt4 absolute">
                <img id='inputImage' alt='' src={imageUrl1} width='500px' height='auto'/>
                {
                    (box1 && box1.map(item => 
                            <div 
                                key={item.topRow}
                                className='bounding-box' 
                                style={{
                                    top: item.topRow, 
                                    right: item.rightCol,
                                    bottom: item.bottomRow, 
                                    left: item.leftCol
                                }}>
                            </div>
                    ))
                }
            </div>
        </div>
    )
}

export default FaceRecognition;