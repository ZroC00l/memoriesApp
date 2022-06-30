import React, { useEffect, useState } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux"; //allows us to dispatch an action
import { getPosts } from "./actions/posts";
import memories from "./images/memories.png";
import Posts from "./components/Posts/Posts.js";
import Form from "./components/Form/Form.js";
import useStyles from "./styles";

const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar position="static" color="inherit" className={classes.appBar}>
        <Typography variant="h4" align="center" className={classes.heading}>
          Memories
        </Typography>
        <img
          src={memories}
          alt="memories"
          height="60"
          className={classes.image}
        />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            direction="column-reverse"
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
    </Container>
  );
};

export default App;
