import React from "react";
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange1, onButtonSubmit1 }) => {
    return (
        <div className=''>
            <p className='white f3'>
                {'I can detect faces in your pictures. Give it a try!'}
            </p>
            {/* Using div to combine child components together */}
            <div className='center'>
                <div className='center design pa4 br3 shadow-5'>
                {/* onChange' is technically a react synthetic event that mimics what the html does  */}
                    <input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange1}/>
                {/* onClick' is technically a react synthetic event  */}
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-dark-blue ba b--white-025' onClick={onButtonSubmit1}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;