import React, { useState, useEffect } from "react";
import { Container, Typography } from "@material-ui/core";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import useStyles from "./styles";

import PacmanLoader from "react-spinners/PacmanLoader";

const App = () => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [isLoadingSpinner, setIsLoadingSpinner] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingSpinner(false);
    }, 5000);
  }, []);

  return isLoadingSpinner ? (
    <>
      {
        <>
          <div className={classes.splashLoader}>
            <PacmanLoader
              color={"#FFFFF"}
              size={50}
              cssOverride={{
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </div>
          <div className={classes.splashText}>
            <Typography variant="h4">
              Loading the Application, please be patient while we get things
              ready
            </Typography>
          </div>
        </>
      }
    </>
  ) : (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Navigate to="/posts" />} />
          <Route path="/posts" exact element={<Home />} />
          <Route path="/posts/search" exact element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route
            path="/auth"
            element={!user ? <Auth /> : <Navigate to="/posts" />}
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
