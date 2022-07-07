import React from "react";
import { makeStyles } from "@material-ui/core";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import SortIcon from '@mui/icons-material/Sort';
const useStyles = makeStyles((theme) => ({
    appbar:{
        background:"none",
        fontFamily: 'Nunito',
    },
    appbarWrapper:{
        width:"65%",
        margin: "0px auto"
    },
    appbarTitle:{
        flexGrow: "2",
        color:"white"

    },
    icon:{
        color:"#ffffff",
        fontSize:"2rem"
    },
    colorTitle:{
        color:"#5AFF3D"
    }
}));

export default function Header () {
    const classes = useStyles();
    return(
        <div>
            <AppBar class={classes.appbar}>
                <Toolbar className={classes.appbarWrapper}>
                    <h1 className={classes.appbarTitle}>
                        Omiya<span className={classes.colorTitle}>Computech</span>
                        </h1>
                    <IconButton>
                        <SortIcon className={classes.icon}/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}