import React from "react";
import { CssBaseline, makeStyles } from "@material-ui/core";
import Header from "../Header";
const useStyles = makeStyles((theme) => ({
    root:{
        minHeight : "100vh",
        backgroundImage:`url(${process.env.PUBLIC_URL + '/assets/bg.jpg'})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-Repeat",
    }
}));

function Landing () {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <CssBaseline/>
            <Header />
        </div>
    );
}

export default Landing;