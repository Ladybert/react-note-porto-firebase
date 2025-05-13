// Dependency
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// Modular behavior
import withNavigation from '../../../utils/routing/withNavigation';
import Button from '../../../components/atoms/Button';
import Form from '../../../components/atoms/Form';
import NotesContainer from '../../../components/molecules/NotesContainer';

// CSS import
import './dashboard.scss'
import { addDataToAPI } from '../../../config/redux/action';

class Dashboard extends Component {
    state = {
        title: '',
        content: '',
        date: '',
    }

    handleLoginSwitcher = () => {
        this.props.navigate('/login');
    }

    handleRegisterSwitcher = () => {
        this.props.navigate('/register');
    }

    handleFormOpenModal = () => {
        const form = document.querySelector('.form-wrapper');
        const formBackground = document.querySelector('.background-form');
        if (form) {
            form.classList.add('active');
            formBackground.classList.add('active');
        }
    }

    handleCloseModal = () => {
        const form = document.querySelector('.form-wrapper');
        const formBackground = document.querySelector('.background-form');
        if (form) {
            formBackground.classList.remove('active');
            form.classList.remove('active');
        }
    }

    handleSaveNotes = async () => {
        const { title, content } = this.state
        const { saveNotes, userData } = this.props

        const data = {
            title: title,
            content: content,
            date: new Date().getTime(),
            userId: userData.uid
        }
        
        const res = await saveNotes(data)
        if(res){
            this.setState({
                title: '',
                content: ''
            });
        } else {
            alert("upsss.....")
            console.error("failed to save notes")
        }
    }

    onInputChange = (e, type) => {
        this.setState({
            [type]: e.target.value
        })
    }

    render() {
        const { title, content } = this.state
        const { loadBtn, isLogin, userData } = this.props
        return(
            <div className='dashboard-container'>
                <div className='background-form'></div>
                <div className='dashboard-header'>
                    <h1>Dashboard Page</h1>
                    <div className='dashboard-switcher-button'>
                    {
                        isLogin ? (
                            <div>
                                <p>Welcome, {userData.email}</p>
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
                <Button onClick={this.handleFormOpenModal} title='create an idea here' classNameButton='form-modal' />
                <div className='form-wrapper'>
                    <Form 
                    onClose={this.handleCloseModal} 
                    handleSubmitFunction={this.handleSaveNotes}
                    setTitleValue={title}
                    setContentValue={content}
                    onChangeTitleInput={(e) => this.onInputChange(e, 'title')}
                    onChangeContentInput={(e) => this.onInputChange(e, 'content')}
                    loading={loadBtn}
                     />
                </div>
                {/* <NotesContainer /> */}
            </div>
        )
    }
}

const reduxState = (state) => ({
    isLogin: state.isLogin,
    loadBtn: state.isLoading,
    userData: state.user
})

const reduxDispatch = (dispatch) => ({
    saveNotes : (data) => dispatch(addDataToAPI(data))
})

export default connect(reduxState, reduxDispatch)(withNavigation(Dashboard))