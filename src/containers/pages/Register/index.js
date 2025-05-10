import React, { Component } from 'react';
import './register.scss'
import withNavigation from '../../../utils/routing/withNavigation';

class Register extends Component {
    state = {

    }

    handleLoginSwitcher = () => {
        this.props.navigate('/login');
      }

    render() {
        return(
            <div className='auth-container'>
                <h1 className='auth-title'>Register Page</h1>
                <form className='auth-card' method='post'>
                    <div className='input'>
                        <label htmlFor="email">Email</label>
                        <input type='text' id='email'/>
                    </div>
                    <div className='input'>
                        <label htmlFor="password">Password</label>
                        <input type='password' id='password'/>
                    </div>
                    <button type='button'>register</button>
                </form>
                <div className='switcher-button'>
                    <button className='login-button' onClick={this.handleLoginSwitcher}>
                        Switch to Login
                    </button>
                    {/* <button className='dashboard-button'>
                        Go to Dashboard
                    </button> */}
                </div>
            </div>
        )
    }
}

export default withNavigation(Register)