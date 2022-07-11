import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppBar, Avatar, Toolbar, Typography, Button } from "@material-ui/core";
import { Link, useNavigate, useLocation } from "react-router-dom";
import memories from "../../images/memories-Logo.png";
import memoriesText from "../../images/memories-Text.png";
import useStyles from "./styles";
import decode from "jwt-decode";

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const logout = () => {
    dispatch({ type: "LOGOUT" });

    navigate("/");
    setUser(null);

    window.location.reload(true);
  };

  useEffect(() => {
    //check if token exists
    const token = user?.token;

    console.log(token);

    //sign out the user once their token expires
    if (token) {
      const decoded = decode(token);
      if (decoded.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar position="static" color="inherit" className={classes.appBar}>
      <Link className={classes.brandContainer} to="/">
        <img src={memoriesText} height="45px" alt="memories" />

        <img
          src={memories}
          alt="memories"
          height="40px"
          className={classes.image}
        />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              src={user.result.picture}
              alt={user.result.name}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              className={classes.logout}
              variant="contained"
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
