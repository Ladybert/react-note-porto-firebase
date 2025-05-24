import { auth } from '../../../config/firebase';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword } from 'firebase/auth'
import { 
    doc, 
    setDoc,
    getDoc, 
    getDocs, 
    query, 
    collection, 
    where,
    deleteDoc } from "firebase/firestore";
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
            resolve(res)
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
            resolve(res)
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
        const errMsg = "❌ Gagal: Title, uid dan content wajib diisi!";
        console.error(errMsg);
        dispatch({ type: 'CHANGE_LOADING', value: false });
        reject(new Error(errMsg));
        return;
        }

        const noteId = `${new Date().getTime()}-${nanoid(5)}`;
        const noteData = {
            title: data.title,
            content: data.content,
            date: data.date,
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

export const getDataFromAPI = (userId) => async (dispatch) => {
    return new Promise(async (resolve, reject) => {
        try {
            const q = query(collection(db, "notes"), where("userId", "==", `${userId}`));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                const errMsg = "❌ Tidak ada dokumen ditemukan untuk userId ini.";
                dispatch({ type: 'SET_NOTE_ERROR', value: errMsg })
                dispatch({ type: 'SET_NOTE_STATUS', value: "error"}) 
            }

            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            dispatch({ type: 'SET_NOTE_STATUS', value: "success"}) 
            dispatch({ type: 'SET_NOTES', value: data });
            console.log("✅ Data berhasil diambil:", data);
            resolve(data);
            } catch (err) {
                dispatch({ type: 'SET_NOTE_ERROR', value: err })
                dispatch({ type: 'SET_NOTE_STATUS', value: "error"}) 
                console.error("❌ Gagal mengambil data:", err);
                reject(err);
        }
    })
};

export const updateDataFromAPI = (data) => async (dispatch) => {
    dispatch({ type: 'CHANGE_LOADING', value: true });

    try {
        const { id: noteId, userId, ...updateFields } = data;
        const docRef = doc(db, 'notes', noteId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            console.warn('⚠️ Note dengan ID tersebut tidak ditemukan.');
            dispatch({ type: 'CHANGE_LOADING', value: false });
            return false;
        }

        const noteData = docSnap.data();

        if (noteData.userId !== userId) {
            console.warn('⚠️ Note tidak cocok atau bukan milik user.');
            dispatch({ type: 'CHANGE_LOADING', value: false });
            return false;
        }

        await setDoc(docRef, updateFields, { merge: true });
        console.log('✅ Note berhasil diupdate!');
        dispatch({ type: 'CHANGE_LOADING', value: false });
        return true;

    } catch (err) {
        console.error('❌ Gagal mengupdate note:', err);
        dispatch({ type: 'CHANGE_LOADING', value: false });
        return false;
    }
};

export const deleteDataFromAPI = (userId, noteId) => async (dispatch) => {
  dispatch({ type: 'CHANGE_LOADING', value: true });
  
  try {
      // Ambil dokumen berdasarkan noteId
      const docRef = doc(db, 'notes', noteId);
      const docSnap = await getDoc(docRef);
      
      // Cek apakah dokumen ada dan milik user yang sesuai
      if (docSnap.exists()) {
          const noteData = docSnap.data();
          
          if (noteData?.userId === userId) {
              await deleteDoc(docRef);
              console.log('✅ Note berhasil dihapus!');
              dispatch({ type: 'CHANGE_LOADING', value: false });
              return true;
            } else {
                console.warn('⚠️ Note tidak cocok atau tidak milik user ini.');
            }
        } else {
            console.warn('⚠️ Note dengan ID tersebut tidak ditemukan.');
        }
        
        dispatch({ type: 'CHANGE_LOADING', value: false });
        return false;
        
    } catch (err) {
        console.error('❌ Gagal menghapus note:', err);
        dispatch({ type: 'CHANGE_LOADING', value: false });
        return false;
    }
};