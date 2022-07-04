import React, { useState } from "react";
import { AppBar, Avatar, Toolbar, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import memories from "../../images/memories.png";
import useStyles from "../../styles";

const Navbar = () => {
  const classes = useStyles();

  const user = null;

  return (
    <AppBar position="static" color="inherit" className={classes.appBar}>
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          variant="h3"
          align="center"
          className={classes.heading}
        >
          Memories Silo
        </Typography>
        <img
          src={memories}
          alt="memories"
          height="60"
          className={classes.image}
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              src={user.result.imageUrl}
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
