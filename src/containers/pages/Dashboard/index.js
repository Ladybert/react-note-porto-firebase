import React, { Component } from 'react';
import './dashboard.scss'

class Dashboard extends Component {
    render() {
        return(
            <div>
                <h1>Dashboard Page</h1>
                <div>
                    <button>
                        Switch to Login
                    </button>
                    <button>
                        Switch to Register
                    </button>
                </div>
            </div>
        )
    }
}

export default Dashboard