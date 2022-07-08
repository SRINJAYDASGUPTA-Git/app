import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const firebaseConfig = {
    apiKey: "AIzaSyBD0eu52eILFvtLCNZBSLuXmhU2GQ97aqE",
    authDomain: "reactwebpage-87b1b.firebaseapp.com",
    projectId: "reactwebpage-87b1b",
    storageBucket: "reactwebpage-87b1b.appspot.com",
    messagingSenderId: "771814881987",
    appId: "1:771814881987:web:c23b508d280d7b9a998076",
    measurementId: "G-2JGDFVD05N"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (first_name,last_name, email, password, standard) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      first_name,
      last_name,
      authProvider: "local",
      email,
      standard,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
