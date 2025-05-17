// Dependency
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// Redux
import { addDataToAPI, getDataFromAPI } from '../../../config/redux/action';

// Utils
import { getSessionStorageResponse } from '../../../utils/sessionStorage/getObject';

// Modular behavior
import withNavigation from '../../../utils/routing/withNavigation';
import Button from '../../../components/atoms/Button';
import Form from '../../../components/atoms/Form';
import NotesItem from '../../../components/molecules/NotesItem';

// CSS import
import './dashboard.scss'

class Dashboard extends Component {
    state = {
        title: '',
        content: '',
        date: '',
    }

    componentDidMount() {
        const { userData } = getSessionStorageResponse('userData')

        if (userData && userData.user && userData.user.uid) {
            this.props.getDataByUserId(userData.user.uid);
        } else {
            console.warn("⚠️ userData tidak ditemukan atau tidak lengkap");
        }
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

    handleLogOutBtn = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (confirmLogout) {
            sessionStorage.setItem('userData', '');
            sessionStorage.setItem('isLogin', false);
            this.props.navigate('/');
        }
    }            

    handleSaveNotes = async () => {
        const { title, content } = this.state
        const { saveNotes } = this.props
        const { userData } = await getSessionStorageResponse('userData')

        const data = {
            title: title,
            content: content,
            date: new Date().getTime(),
            userId: userData.user.uid
        }
        
        const confirmSaveNote = window.confirm("Are you sure you want to save note ?");
        
        if(confirmSaveNote) {
            const res = await saveNotes(data)
            
            this.componentDidMount()
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
        
    }

    onInputChange = (e, type) => {
        this.setState({
            [type]: e.target.value
        })
    }

    render() {
        const { title, content } = this.state
        const { loadBtn, notes, setNoteError, setNoteStatus } = this.props
        const { userData, isLogin }  = getSessionStorageResponse('userData', 'isLogin')
        
        return(
            <div className='dashboard-container'>
                <div className='background-form'></div>
                <div className='dashboard-header'>
                    <h1>Dashboard Page</h1>
                    <div className='dashboard-switcher-button'>
                    {
                        isLogin || !isLogin ? (
                            <>
                                <div>
                                    <p>Welcome, {userData.user.email}</p>
                                </div>
                                <div>
                                    <Button onClick={this.handleLogOutBtn} title='Log Out' classNameButton='log-out' />
                                </div>
                            </>
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
                {
                    isLogin || !isLogin ? (
                        <Button onClick={this.handleFormOpenModal} title='create an idea here' classNameButton='form-modal' />
                    ) : (
                        <></>
                    )
                }
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
                {
                    isLogin && userData !== null ? (
                        setNoteStatus && (
                        <>
                            {setNoteStatus === "error" && (
                            <div className="error-message">
                                <p>{setNoteError}</p>
                            </div>
                            )}
                            {setNoteStatus === "success" && (
                            <div className="map-content-wrapper">
                                <NotesItem notes={notes} />
                            </div>
                            )}
                        </>
                        )
                    ) : (
                        <p>Anda belum login, silakan login untuk mengakses data anda</p>
                    )
                }
            </div>
        )
    }
}

const reduxState = (state) => ({
    isLogin: state.isLogin,
    loadBtn: state.isLoading,
    userData: state.user,
    notes: state.notes,
    setNoteStatus: state.setNoteStatus,
    setNoteError: state.setNoteError
})

const reduxDispatch = (dispatch) => ({
    saveNotes : (data) => dispatch(addDataToAPI(data)),
    getDataByUserId : (userId) => dispatch(getDataFromAPI(userId))
})

export default connect(reduxState, reduxDispatch)(withNavigation(Dashboard))