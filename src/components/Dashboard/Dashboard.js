import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link,useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "../../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { Avatar } from "@material-ui/core";
//import {firstName, lastName} from "../Register";
function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const[fname, setFName] = useState("");
  const[lname, setLName] = useState("");
  const [standard, setStandard] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setFName(data.first_name);
      setLName(data.last_name);
      setStandard(data.standard);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return navigate("/loading");
    if (!user) return navigate("/");

    fetchUserName();
  }, [user, loading]);

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        Logged in as
        <Avatar color="primary" className="avatar">{fname.charAt(0)}{lname.charAt(0)}</Avatar>
        <div><p>{fname} {lname}</p></div>
        <div>{user.email}</div>
        <div><p>Class:{standard}</p></div>
        {/* <div>{firstName}</div>
        <div>{lastName}</div> */}
        <Link to="/"><button className="dashboard__btn" onClick={logout}>
          Logout
        </button></Link>
      </div>
    </div>
  );
}

export default Dashboard;
