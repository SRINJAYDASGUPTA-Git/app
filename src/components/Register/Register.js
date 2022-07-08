import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase";

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar } from '@material-ui/core';
import SortIcon from '@mui/icons-material/Sort';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import "./Register.css";
const useStyles = makeStyles((theme) => ({
  appbar: {
    background: 'none',
    justifyContent: 'left',
  },
  appbarWrapper: {
    width: '10%',
    margin: '5px 5px',
  },
  appbarTitle: {
    display:"block",
    right: "100px",
    margin: '5px auto',
    flexGrow: '2',
  },
  icon: {
    color: '#fff',
    fontSize: '2rem',
    width:"100vh"
  },
  colorText: {
    color: '#5AFF3D',
  },  
}));
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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const classes = useStyles();

  return (
    <div class="container">
      <div class="left">
        <div class = "left">
          <AppBar className={classes.appbar} elevation={0}>
            <Toolbar className={classes.appbarWrapper}>
              <IconButton
                id="menu" aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>
                <SortIcon className={classes.icon} fontSize="large" />
              </IconButton>
              <h1 className={classes.appbarTitle}>
                <span className={classes.colorText2}>Omiya</span><span className={classes.colorText}>Computech   </span>
              </h1>


              <Menu
                id="fade-menu"
                MenuListProps={{
                  'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                
                <MenuItem onClick={handleClose}><Link to="/" >Home</Link></MenuItem>
                <MenuItem onClick={handleClose}><Link to="/login" >Log In</Link></MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
        </div>
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
            Already have an account? <Link to="/login" className="links">Login</Link> now.
          </div>
        </div>
      </div>
      <div class="right"></div>
    </div>
  );
}

export default Register;
