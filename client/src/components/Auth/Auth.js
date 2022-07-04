import React, { useState } from "react";
import {
  Typography,
  Container,
  Avatar,
  Grid,
  Paper,
  TextField,
  Button,
} from "@material-ui/core";
import useStyles from "./styles";
import LockedOutlined from "@material-ui/icons/LockOutlined";
import Input from "./Input";

const Auth = () => {
  const state = null;
  const isSignup = false;
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit");
  };
  const handleChange = (e) => {};

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation="3">
        <Avatar className={classes.avatar}>
          <LockedOutlined />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign up" : "Sign in"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="Firstname"
                  lable="Firstname"
                  handleChange={handleChange}
                  autoFocus
                  half
                />

                <Input
                  name="Firstname"
                  lable="Firstname"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              lable="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              lable="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            className={classes.submit}
          >
            {isSignup ? "Sign up" : "Sign in"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
