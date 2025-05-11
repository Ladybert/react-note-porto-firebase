import { auth } from '../../../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

export const registerUserAPI = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({type: 'CHANGE_LOADING', value: true})
        createUserWithEmailAndPassword(auth, data.email, data.password)
          .then((res) => {
            const emailUser = {
                email: res.user.email
            }
            console.log("success:", res);
            dispatch({ type: 'CHANGE_USER', value: emailUser});
            dispatch({type: 'CHANGE_LOADING', value: false})
            resolve(true)
          })
          .catch((error) => {
            console.log("error:", error.code, error.message);
            dispatch({type: 'CHANGE_LOADING', value: false})
            reject(error)
          })
    })
}

export const loginUserAPI = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({type: 'CHANGE_LOADING', value: true})
        signInWithEmailAndPassword(auth, data.email, data.password)
        .then((res) => {
            console.log('success: ', res);
            const dataUser = {
                email: res.user.email,
                uid: res.user.uid,
                emailVerified: res.user.emailVerified
            }
            dispatch({type: 'CHANGE_LOADING', value: false})
            dispatch({type: 'CHANGE_ISLOGIN', value: true})
            dispatch({type: 'CHANGE_USER', value: dataUser})
            resolve(true)
        })
        .catch(function(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            dispatch({type: 'CHANGE_LOADING', value: false })
            dispatch({type: 'CHANGE_ISLOGIN', value: false })
            reject(error)
        })
    })
}