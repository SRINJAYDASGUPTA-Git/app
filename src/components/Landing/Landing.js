import React from "react";
import { CssBaseline, makeStyles } from "@material-ui/core";
import Header from "../Header";
import PlacesToVisit from "../PlacesToVisit/PlacesToVisit";
const useStyles = makeStyles((theme) => ({
    root:{
        minHeight : "100vh",
        backgroundImage:`url(${process.env.PUBLIC_URL + '/assets/space.jpg'})`,
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
            <PlacesToVisit/>
        </div>
    );
}

export default Landing;