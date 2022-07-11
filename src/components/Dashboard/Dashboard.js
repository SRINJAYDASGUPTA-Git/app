import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "../../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import {  Avatar } from "@material-ui/core";
import LogoutIcon from '@mui/icons-material/Logout';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { deepPurple } from '@mui/material/colors';
import { makeStyles, createTheme } from '@material-ui/core/styles';
const useStyles =  makeStyles ((theme) => ({
  avatar:{
    height: 56,
    width: 56,
    backgroundColor: deepPurple[500],
    fontFamily: "Nunito",
    fontWeight: "700"
  }
}));
function Dashboard() {
  const classes = useStyles();
  const [user, loading, error] = useAuthState(auth);
  const[fname, setFName] = useState("");
  const[lname, setLName] = useState("");
  const [standard, setStandard] = useState("");
  const navigate = useNavigate();
  const drawerWidth = 240;
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
    if (loading) return navigate("/");
    if (!user) return navigate("/");

    fetchUserName();
  }, [user, loading]);

  
  return (
    <body class="bodyDash">
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
          fontFamily: "Nunito",
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
        <Typography variant = "h5" sx={{fontFamily: "Nunito", fontWeight: 900}}>
          Omiya<span className="spanDash">Computech</span>
        </Typography>
        </Toolbar>
        <Divider />
        <List>
          {['Logout'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{fontFamily:"Nunito", fontWeight: "700"}}>
              <ListItemButton onClick={logout} className="listItemIconDash">
                <ListItemIcon className="listItemIconDash">
                  {index % 2 === 0 ? <LogoutIcon /> : <LogoutIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{fontFamily:"Nunito", fontWeight: "700"}} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
      </Drawer>
      <div class="mainDash">
        <div class="headerDash">
          <div class="imageDash">
            <Avatar className={classes.avatar}>{fname.charAt(0)}{lname.charAt(0)}</Avatar>
          </div>
        </div>
        <div class="welcomeDash">
          <p>Welcome, Srinjay Das Gupta</p>
        </div>
      </div>
    </body>
  );
}

export default Dashboard;
