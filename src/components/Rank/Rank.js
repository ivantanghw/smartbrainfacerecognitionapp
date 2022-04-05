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
        </div>
    );
}

export default Rank;