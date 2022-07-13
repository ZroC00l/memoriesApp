import React, { useEffect } from "react";
import {
  Divider,
  Typography,
  CircularProgress,
  Paper,
} from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import testimage from "../../images/beach.jpeg";
import moment from "moment";
import { getPost } from "../../actions/posts";

import useStyles from "./styles";

const PostDetails = () => {
  const { post, posts, isloading } = useSelector((state) => state.posts);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  if (!post) return null;

  if (isloading) {
    return (
      <Paper
        style={{ padding: "20px", borderRadius: "15px" }}
        elevation={6}
        className={classes.loadingPaper}
      >
        <CircularProgress size="7em" />
      </Paper>
    );
  }
  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom component="p" variant="body1">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Real time chat feature coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Comment section coming soon!</strong>
          </Typography>
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={post.selectedFile || testimage}
            alt="user-post"
          />
          <div className={classes.PostLikesAndCommentsContainer}>
            <Typography variant="h6">Likes : {post.likes.length}</Typography>
            <Typography variant="h6">Comments</Typography>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default PostDetails;
