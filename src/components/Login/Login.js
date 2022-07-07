import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../../firebase";
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
    if (user)navigate("/dashboard");
  }, [user, loading]);

  return (
    <div>
        <div class="background">
          <div class="shape"></div>
          <div class="shape"></div>
        </div>
        <div className="Form">
          <h3>Login Here</h3>

          <label for="username">Email</label>
          <input type="text" placeholder="Email" id="username" value={email} onChange={(e) => setEmail(e.target.value)}/>

          <label for="password">Password</label>
          <input type="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <p><a href="/reset">Forgot Password</a></p>
          <button onClick={() => logInWithEmailAndPassword(email, password)}>Log In</button>
          <button onClick={signInWithGoogle}>
              Login with Google
            </button>
            <div>
              Don't have an account? <Link to="/register">Register</Link> now.
            </div>
        </div>
    </div>
  );
}

export default Login;
