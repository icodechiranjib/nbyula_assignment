import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useRef, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/UserDashBoard");
    } catch {
      setError("Failed to login");
    }
    setLoading(false);
  }

  const handleSubmitHome = () => {
    history.push("/");
  };

  const paperStyle = {
    padding: 20,
    width: "50%",
    margin: "15% auto",
  };
  const avatarStyle = { backgroundColor: "black" };
  const signbtnstyle = { margin: "15px 0", backgroundColor: "black" };
  const btnstyle = { margin: "15px 0" };
  const typographystyle = { margin: "15px 0" };

  return (
    <div className="container" style={{ maxWidth: "50%" }}>
      <Grid>
        {error && alert(error)}
        <Paper elevation={10} style={paperStyle}>
          <Typography variant="h5" align="center" style={typographystyle}>
            <strong>Application Login</strong>
          </Typography>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
          </Grid>
          <Typography style={typographystyle}>Email</Typography>
          <TextField
            placeholder="name@example.com"
            type="email"
            inputRef={emailRef}
            className="form-control"
            id="email"
            fullWidth
            required
          />
          <Typography style={typographystyle}>Password</Typography>
          <TextField
            type="password"
            inputRef={passwordRef}
            className="form-control"
            id="password"
            fullWidth
            required
          />
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
            style={signbtnstyle}
            fullWidth
            type="submit"
          >
            Sign in
          </Button>
          <Typography align="center">
            Do you have an account? <Link to="/usersignup">Sign Up</Link>
          </Typography>
          <Button
            color="primary"
            variant="outlined"
            onClick={handleSubmitHome}
            style={btnstyle}
            fullWidth
            type="submit"
          >
            Home
          </Button>
        </Paper>
      </Grid>
    </div>
  );
}
