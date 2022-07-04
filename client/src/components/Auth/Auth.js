import React from "react";
import {
  Typography,
  Container,
  Avatar,
  Grid,
  Paper,
  TextField,
} from "@material-ui/core";
import useStyles from "../../styles";
import LockedOutlined from "@material-ui/icons/LockOutlined";

const Auth = () => {
  const state = null;
  const isSignup = false;
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit");
  };
  const handleChange = (e) => {};

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
                <TextField
                  name="Firstname"
                  lable="Firstname"
                  handleChange={handleChange}
                  autoFocus
                  xs={6}
                />
                <TextField
                  name="Firstname"
                  lable="Firstname"
                  handleChange={handleChange}
                  autoFocus
                  xs={6}
                />
              </>
            )}
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
