import { auth } from '../../../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from "firebase/firestore";
import { db } from '../../../config/firebase';
import { nanoid } from 'nanoid';

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
                emailVerified: res.user.emailVerified,
                refreshToken: res.user.refreshToken
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

export const addDataToAPI = (data) => (dispatch) => {
    dispatch({ type: 'CHANGE_LOADING', value: true });

    return new Promise((resolve, reject) => {
        if (!data.title || !data.content || !data.userId) {
        const errMsg = "❌ Gagal: Title dan content wajib diisi!";
        console.error(errMsg);
        dispatch({ type: 'CHANGE_LOADING', value: false });
        reject(new Error(errMsg));
        return;
        }

        const noteId = `${new Date().getTime()}-${nanoid(5)}`;
        const noteData = {
            title: data.title,
            content: data.content,
            createdAt: new Date(),
            userId: data.userId
        };

        setDoc(doc(db, "notes", noteId), noteData)
        .then(() => {
            console.log("✅ Data berhasil ditambahkan ke Firestore:", noteData);
            dispatch({ type: 'CHANGE_LOADING', value: false });
            resolve(true);
        })
        .catch((err) => {
            console.error("❌ Gagal menambahkan data:", err);
            dispatch({ type: 'CHANGE_LOADING', value: false });
            reject(err);
        });
    });
};