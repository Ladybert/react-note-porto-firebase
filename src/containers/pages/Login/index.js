// Dependency
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Modular behavior
import withNavigation from '../../../utils/routing/withNavigation';
import { loginUserAPI } from '../../../config/redux/action';
import Button from '../../../components/atoms/Button';

// CSS import
import './login.scss'
import SetPasswordToVisible from '../../../components/atoms/PasswordToggle/setPasswordToVsible';

class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    componentDidMount() {
        if (this.props.user?.email) {
            this.setState({ email: this.props.user.email });
        }
    }

    handleRegisterSwitcher = () => {
        this.props.navigate('/register');
    }

    handleChangeText = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    handleLoginSubmit = async () => {
        const { email, password } = this.state
        const res = await this.props.loginAPI({email, password}).catch(err => alert(err))

        if(res) {
            console.log("login success")

            sessionStorage.setItem('userData', JSON.stringify(res))
            sessionStorage.setItem('isLogin', true)

            this.setState({
                email: '',
                password: ''
            });

            alert("login success !")
            setTimeout(() => {
                this.props.navigate('/')
            }, 350)

        } else {
            setTimeout(() => {
                alert("login failed")
            }, 350)
        }
    };

    render() {
        return(
            <div className='auth-container-login'>
                <h1 className='auth-title-login'>Login Page</h1>
                <div className='auth-card-login'>
                    <div className='input'>
                        <label htmlFor="email">Email</label>
                        <input 
                        type='text' 
                        id='email' 
                        value={this.state.email}
                        onChange={this.handleChangeText}/>
                    </div>
                   <div className='input'>
                         <SetPasswordToVisible
                            value={this.state.password}
                            onChange={this.handleChangeText}
                        />
                    </div>
                    <Button onClick={this.handleLoginSubmit} title="Login" loading={this.props.isLoading} />
                </div>
                <div className='switcher-button'> 
                    <button className='register-button' onClick={this.handleRegisterSwitcher}>
                        Switch to Register
                    </button>
                </div>
            </div>
        )
    }
}


const reduxState = (state) => ({
    popupProps: state.popup,
    isLoading: state.isLoading,
    user: state.user
})

const reduxDispatch = (dispatch) => ({
    loginAPI: (data) => dispatch(loginUserAPI(data))
})


export default connect(reduxState, reduxDispatch)(withNavigation(Login))