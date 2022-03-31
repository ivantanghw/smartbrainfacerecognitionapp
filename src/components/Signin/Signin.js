import React from "react";

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            isPasswordCorrect: true
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('http://localhost:3001/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    // Check if user exist. Did we receive a user with a property of id?
                    this.props.loadUser1(user);
                    this.props.onRouteChange1('home')
                    this.setState({isPasswordCorrect: true})
                } else {
                    this.setState({isPasswordCorrect: false})
                }
        })
            // .then(response => response.json())
            // .then(data => {
            //     if (data === 'success') {
            //         this.props.onRouteChange1('home');
            //     }
            // })
    }

    onRegister = () => {
        this.props.onRouteChange1('Register');
    }

    render() {
        return (
            <article className="mv3 mw6 center bg-white o-90 br3 pa3 ba b--black-10 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                                onChange={this.onEmailChange}
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address" 
                                id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                                onChange={this.onPasswordChange}
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password" 
                                id="password" />
                            { this.state.isPasswordCorrect === false
                                ? <p className="f6 red db">Invalid email or password.</p>
                                : null
                        }
                        </div>
                        </fieldset>

                        <div className="">
                        <input 
                            onClick={this.onSubmitSignIn} 
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Sign in" />
                        </div>
                        <div className="lh-copy mt3">
                        <p onClick={this.onRegister} className="pointer f6 link dim black db">Register</p>
                        </div>
                    </div>
                </main>
            </article>
        )
    }
}

export default Signin;