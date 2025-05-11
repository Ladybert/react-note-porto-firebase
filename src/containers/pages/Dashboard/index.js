// Dependency
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// Modular behavior
import withNavigation from '../../../utils/routing/withNavigation';

// CSS import
import './dashboard.scss'

class Dashboard extends Component {

    handleLoginSwitcher = () => {
        this.props.navigate('/login');
    }

    handleRegisterSwitcher = () => {
        this.props.navigate('/register');
    }

    render() {
        return(
            <div className='dashboard-container'>
                <h1>Dashboard Page</h1>
                <div className='dashboard-switcher-button'>
                {
                    this.props.isLogin ? (
                        <div>
                            <p>Welcome, {this.props.user.email}</p>
                        </div>
                    ) : (
                        <Fragment>
                            <button className='btn login' onClick={this.handleLoginSwitcher}>
                                Login
                            </button>
                            <button className='btn register' onClick={this.handleRegisterSwitcher}>
                                Register
                            </button>
                        </Fragment>
                    )
                }
                </div>
            </div>
        )
    }
}

const reduxState = (state) => ({
    isLogin: state.isLogin,
    user: state.user
})

export default connect(reduxState, null)(withNavigation(Dashboard))