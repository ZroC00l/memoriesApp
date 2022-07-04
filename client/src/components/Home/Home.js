import React, { useState, useEffect } from "react";
import { Grid, Grow, Container } from "@material-ui/core";
import useStyles from "../../styles";
import { useDispatch } from "react-redux";
import Posts from "../Posts/Posts";
import { getPosts } from "../../actions/posts";
import Form from "../Form/Form";

const Home = () => {
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid
          className={classes.mainContainer}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
