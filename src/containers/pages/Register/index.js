// Dependency
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Modular behavior
import withNavigation from '../../../utils/routing/withNavigation';
import { registerUserAPI } from '../../../config/redux/action';

// Component
import Button from '../../../components/atoms/Button';

// CSS import
import './register.scss'

class Register extends Component {
    state = {
        email: '',
        password: ''
    }

    handleLoginSwitcher = () => {
        this.props.navigate('/login');
    }

    handleChangeText = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    handleRegisterSubmit = async () => {
        const { email, password } = this.state;
        const confirmRegister = window.confirm("Are you sure about the data you entered?");

        if(confirmRegister) {
            const res = await this.props.registerAPI({email, password}).catch(err => err)
    
            if(res) {
                this.setState({
                    email: '',
                    password: ''
                  });
    
                this.props.navigate('/login')
            } else {
                console.log("register failed")
            }
        }
      }

    render() {
        return(
            <div className='auth-container-register'>
                <h1 className='auth-title-register'>Register Page</h1>
                <div className='auth-card-register'>
                    <div className='input'>
                        <label htmlFor="email">Email</label>
                        <input type='text' id='email' value={this.state.email} onChange={this.handleChangeText}/>
                    </div>
                    <div className='input'>
                        <label htmlFor="password">Password</label>
                        <input type='password' id='password' value={this.state.password} onChange={this.handleChangeText}/>
                    </div>
                    <Button onClick={this.handleRegisterSubmit} title="Register" loading={this.props.isLoading} />
                </div>
                <div className='switcher-button'>
                    <button className='login-button' onClick={this.handleLoginSwitcher}>
                        Switch to Login
                    </button>
                </div>
            </div>
        )
    }
}

const reduxState = (state) => ({
    isLoading: state.isLoading
})

const reduxDispatch = (dispatch) => ({
    registerAPI: (data) => dispatch(registerUserAPI(data))
})

export default connect(reduxState, reduxDispatch)(withNavigation(Register))