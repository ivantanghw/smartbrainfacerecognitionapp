import React from "react";

const Navigation = ({onRouteChange1, isSignedIn1}) => {
    if (isSignedIn1) {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={ () => onRouteChange1('signout') } className='f3 link dim black b pa3 pointer'>Sign Out</p>
            </nav>
        )
    } else {
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={ () => onRouteChange1('signin') } className='f3 link dim black b pa3 pointer'>Sign In</p>
                <p onClick={ () => onRouteChange1('register') } className='f3 link dim black b pa3 pointer'>Register</p>
            </nav>
        )
    }
    
}

export default Navigation;