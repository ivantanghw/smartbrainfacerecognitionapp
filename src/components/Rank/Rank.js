import React from "react";

// Instead of doing props.userName, props.userEntries, we can destructure
const Rank = ({userName, userEntries}) => {
    return (
        <div>
            <div className='center'>
                <div className='white f3'>
                    {`Hi ${userName}, your number of entries is...`}
                </div>
                <div className='white f3'>
                    {`${userEntries}`}
                </div>
            </div>
            <div className='mt2 white'>{'Sample picture: https://www.nerdynaut.com/wp-content/uploads/2020/12/Essential-Items-Every-Bicycle-Rider-Should-Have-950x500.jpg'}</div>
        </div>
    );
}

export default Rank;