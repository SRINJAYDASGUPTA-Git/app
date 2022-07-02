import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <div class="container">
      <div class="left">
        <div class="header">
          <h2 class="animation a1">Welcome Back</h2>
          <h4 class="animation a2">Log in to your account using email and password</h4>
        </div>
        <div class="form">
          <input type="email" class="form-field animation a3" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <input type="password" class="form-field animation a4" placeholder="Password"></input>
              <p class="animation a5"><a href="/reset">Forgot Password</a></p>
              <button class="animation a6" onClick={() => logInWithEmailAndPassword(email, password)}>LOGIN</button>
            <button className="login__btn login__google" onClick={signInWithGoogle}>
              Login with Google
            </button>
            <div>
              Don't have an account? <Link to="/register">Register</Link> now.
            </div>
        </div>
      </div>
      <div class="right"></div>
    </div>
  );
}

export default Login;
