import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar } from '@material-ui/core';
import SortIcon from '@mui/icons-material/Sort';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
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
function Login() {
  const classes = useStyles();
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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
        <div class="background">

        </div>
      <div>
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
              <MenuItem onClick={handleClose}><Link to="/register" >Register</Link></MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </div>
        <div className="Form">
          <h3>Login Here</h3>

          <label for="username">Email</label>
          <input type="text" placeholder="Email" id="username" value={email} onChange={(e) => setEmail(e.target.value)}/>

          <label for="password">Password</label>
          <input type="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <p><a href="/reset">Forgot Password</a></p>
          <button onClick={() => logInWithEmailAndPassword(email, password)}>Log In</button>
            <div>
              Don't have an account? <Link to="/register">Register</Link> now.
            </div>
        </div>
    </div>
  );
}

export default Login;
