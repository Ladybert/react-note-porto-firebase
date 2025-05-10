import React, { Component } from 'react';
import './login.scss'

class Login extends Component {
    render() {
        return(
            <div className='auth-container'>
                <h1 className='auth-title'>Login Page</h1>
                <form className='auth-card' method='post'>
                    <div className='input'>
                        <label htmlFor="email">Email</label>
                        <input type='text' id='email'/>
                    </div>
                    <div className='input'>
                        <label htmlFor="password">Password</label>
                        <input type='password' id='password'/>
                    </div>
                    <button type='button'>login</button>
                </form>
                <div>
                    <button className='login-button'>
                        Switch to Register
                    </button>
                    {/* <button>
                        Go to Dashboard
                    </button> */}
                </div>
            </div>
        )
    }
}

export default Login