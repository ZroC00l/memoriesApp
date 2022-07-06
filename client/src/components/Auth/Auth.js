import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Container,
  Avatar,
  Grid,
  Paper,
  Button,
} from "@material-ui/core";
import { FcGoogle } from "react-icons/fc";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Icon from "./icon";
import useStyles from "./styles";
import LockedOutlined from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { signup, signin } from "../../actions/auth";

import jwt_decode from "jwt-decode";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const state = null;
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(formData);
    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };
  const handleChange = (e) => {
    //get each form field by name
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const googleSuccess = async (response) => {
    const encryptedResponse = response.credential;
    const decodedToken = jwt_decode(response.credential);
    const result = decodedToken;
    const token = decodedToken.jti;

    /*console.log("THE TOKEN BEFORE DECODING:");
    console.log(encryptedResponse);

    console.log("DECODED RESPONSE RESULT");
    console.log(result);

    console.log("TOKEN JTI");
    console.log(token);*/

    console.log("Login successful");

    //destructure the response props
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const googleFailure = () => {
    console.log("Google Sign In was unsuccessful. Try again later");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockedOutlined />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign up" : "Sign in"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />

                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
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
          <GoogleOAuthProvider clientId="1041367506713-j6gmrh6fonfovkcoft872ilhehugbmp3.apps.googleusercontent.com">
            <Grid container justifyContent="center">
              <GoogleLogin
                render={(renderProps) => (
                  <Button
                    className={classes.googleButton}
                    fullWidth={true}
                    variant="contained"
                    color="primary"
                    disabled={renderProps.disabled}
                    startIcon={<Icon />}
                    onClick={renderProps.onClick}
                  >
                    <FcGoogle className="mr-4" />
                    Sign in with Google
                  </Button>
                )}
                shape="square"
                size="large"
                logo_alignment="center"
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy="single_host_origin"
              ></GoogleLogin>
            </Grid>
          </GoogleOAuthProvider>
          <Grid container justifyContent="flex-end">
            <Grid container justifyContent="center">
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
