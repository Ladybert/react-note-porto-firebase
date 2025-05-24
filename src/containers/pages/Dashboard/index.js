// Dependency
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';

// Redux
import { addDataToAPI, deleteDataFromAPI, getDataFromAPI, updateDataFromAPI } from '../../../config/redux/action';

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
        noteId: '',
        title: '',
        content: '',
        date: '',
        textButton: 'Save Idea'
    }

    componentDidMount() {
        const { userData } = getSessionStorageResponse('userData')

        if (userData && userData.user && userData.user.uid) {
            this.props.getDataByUserId(userData.user.uid);
        } else {
            sessionStorage.setItem('userData', {})
            sessionStorage.setItem('isLogin', false)
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
        this.setState({
            title: '',
            content: '',
            textButton: "Save Idea"
        })

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
        const { title, content, textButton, noteId } = this.state;
        const { saveNotes, updateNoteByCurrentUser } = this.props;

        const { userData } = await getSessionStorageResponse('userData');

        if (!title || !content) {
            alert("Title or content cannot be empty");
            return;
        }

        const confirmSaveNote = window.confirm(
            textButton === "Save Idea"
                ? "Are you sure you want to save this note?"
                : "Are you sure you want to update this note?"
        );

        if (!confirmSaveNote) return;

        const baseData = {
            title,
            content,
            date: dayjs().format('D MMM YYYY - HH:mm'),
            userId: userData.user.uid,
        };

        let res = null;
        if (textButton === "Save Idea") {
            res = await saveNotes(baseData);
        } else if (textButton === "Update Idea") {
            if (!noteId) {
                alert("⚠️ Note ID not found for update.");
                return;
            }
            res = await updateNoteByCurrentUser({ ...baseData, id: noteId });
        }

        if (res) {
            this.setState({
                title: '',
                content: '',
                noteId: '',
                textButton: 'Save Idea',
            });
            this.componentDidMount();
        } else {
            alert("❌ Failed to save or update note.");
        }
    }


    handleDeleteButton = async (noteId) => {
        const { deleteNoteByUserAndId } = this.props
        const { userData } = await getSessionStorageResponse('userData')
        const userId = userData.user.uid

        console.log("noteId : ", noteId)
        console.log("userId : ", userId)

        if(!noteId || !userData) {
            alert("notes and userData cannot be empty")
            return
        }

        const confirmDeleteNote = window.confirm("Are you sure you want to delete note ?");

        if(confirmDeleteNote){
            const success = await deleteNoteByUserAndId(userId, noteId)
            .then((res) => res)
            .catch((err) => err)

            if(success){
                alert("✅ Note berhasil dihapus");
            } else {
                alert("❌ Gagal menghapus note");
            }

            this.componentDidMount()
        }
    }

    onInputChange = (e, type) => {
        this.setState({
            [type]: e.target.value
        })
    }

    handleEditNote = (note) => {
        this.setState({
            noteId: note.id,
            title: note.title,
            content: note.content,
            textButton: "Update Idea"
        })

        const form = document.querySelector('.form-wrapper');
        const formBackground = document.querySelector('.background-form');
        if (form) {
            form.classList.add('active');
            formBackground.classList.add('active');
        }
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
                        isLogin ? (
                            <>
                                <div>
                                    <p>Welcome, {userData?.user?.email || "Blom login"}</p>
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
                    isLogin ? (
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
                    buttonState={this.state.textButton}
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
                            {setNoteStatus === "success" && notes.length === 0 && (
                            <div className="error-message">
                                <p className='note-not-found'>No notes found.</p>
                            </div>
                            )}
                            {setNoteStatus === "success" && (
                            <div className="map-content-wrapper">
                                <NotesItem 
                                notes={notes}
                                handleDeleteButtonFromParent={this.handleDeleteButton}
                                loading={loadBtn}
                                onTapOrClick={this.handleEditNote}
                                />
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
    getDataByUserId : (userId) => dispatch(getDataFromAPI(userId)),
    updateNoteByCurrentUser : (data) => dispatch(updateDataFromAPI(data)),
    deleteNoteByUserAndId : (userId, noteId) => dispatch(deleteDataFromAPI(userId, noteId))
})

export default connect(reduxState, reduxDispatch)(withNavigation(Dashboard))