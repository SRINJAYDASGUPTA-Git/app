import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [standard, setStandard] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password,standard);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <div class="container">
      <div class="left">
        <div class="header">
          <h2 class="animation a1">Register Now!</h2>
          <h4 class="animation a2">Register using name, email and password</h4>
        </div>
        <div class="form">
          <input type="text" class = "form-field animation a3" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)}></input>
          <input type="email" class="form-field animation a3" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}></input>
          <input type="text" class="form-field animation a4" placeholder="Standard" value={standard} onChange={(e) => setStandard(e.target.value)}></input>
            <input type="password" class="form-field animation a4" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
              <button class="animation a6" onClick={register} >Register</button>
            <button className="animation a7" onClick={signInWithGoogle}>
              Register with Google
            </button>
          <div class="animation a8">
            Already have an account? <Link to="/login">Login</Link> now.
          </div>
        </div>
      </div>
      <div class="right"></div>
    </div>
  );
}

export default Register;
