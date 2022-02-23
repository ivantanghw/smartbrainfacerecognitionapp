import React from "react";
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange1, onButtonSubmit1 }) => {
    return (
        <div className=''>
            <p className='f3'>
                {'This Magic Brain will detect faces in your pictures. Just try it.'}
            </p>
            {/* Using div to combine child components together */}
            <div className='center'>
                <div className='center form pa4 br3 shadow-5'>
                {/* onChange' is technically a react synthetic event that mimics what the html does  */}
                    <input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange1}/>
                {/* onClci' is technically a react synthetic event  */}
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-dark-blue ba b--white-025' onClick={onButtonSubmit1}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;