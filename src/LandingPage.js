import {
  Button,
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import Logo from "./Components/img/logo.png";

const useStyle = makeStyles((theme) => ({
  button1: {
    fontSize: "5vh",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "black",
    color: "white",
  },
  button2: {
    background: "white",
    color: "black",
  },
}));

export default function LandingPage() {
  const classes = useStyle();
  const history = useHistory();

  const handleOnApplicants = () => {
    history.push("/Userlogin");
  };
  const handleOnTeraformer = () => {
    history.push("/login");
  };

  return (
    <div style={{ background: "grey", height: "100vh" }}>
      <AppBar position="static" style={{ background: "black", color: "white" }}>
        <Toolbar>
          <img src={Logo} />
          <Typography variant="h5" style={{ marginLeft: "50px" }}>
            <strong>JobsManiacs</strong>
          </Typography>
        </Toolbar>
      </AppBar>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: "200px",
        }}
      >
        <Button
          variant="outlined"
          style={{ minWidth: "30vw", minHeight: "10vh" }}
          className={classes.button1}
          onClick={handleOnTeraformer}
        >
          <Typography>
            <strong>Terraformer</strong>
          </Typography>
        </Button>

        <Button
          variant="outlined"
          style={{ minWidth: "30vw", minHeight: "10vh" }}
          className={classes.button2}
          onClick={handleOnApplicants}
        >
          <Typography>
            <strong>Applicant</strong>
          </Typography>
        </Button>
      </div>
    </div>
  );
}
