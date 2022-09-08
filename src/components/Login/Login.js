import React, { useState } from "react";
import { Button, TextField, Grid } from "@mui/material";

const Login = ({ setLoggedIn, setSnackbarData }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const validUsername = process.env.REACT_APP_USER;
    const validPassword = process.env.REACT_APP_PASS;

    if (username === validUsername && password === validPassword) {
      setLoggedIn(true);
    } else {
      setSnackbarData({
        open: true,
        text: "Incorrect username or password!",
        severity: "error",
      });
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item>
        <TextField
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        >
          Login
        </TextField>
      </Grid>
      <Grid item>
        <TextField
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        >
          Login
        </TextField>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Button variant="contained" component="label" onClick={handleLogin}>
          Login
        </Button>
      </Grid>
    </Grid>
  );
};

export default Login;
