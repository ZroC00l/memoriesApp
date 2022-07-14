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
import { getPost, getPostsBySearch } from "../../actions/posts";

import useStyles from "./styles";

const PostDetails = () => {
  const { posts, post, isloading } = useSelector((state) => state.posts);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
  }, []);

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

  //return all recommended posts that share the same tag or name as the post you are currently viewing
  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  //On recommended section naviagte to the post clicked on
  const openPost = (_id) => navigate(`/posts/${_id}`);

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
        </div>
      </div>
      {recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            Recommended Posts
          </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(
              ({ title, name, message, likes, _id, selectedFile }) => (
                <div
                  style={{ margin: "20px", cursor: "pointer" }}
                  onClick={() => openPost(_id)}
                  key={_id}
                >
                  <Typography gutterBottom variant="h6">
                    {title}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {name}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    {message}
                  </Typography>
                  <Typography gutterBottom variant="subtitle2">
                    Likes: {likes.length}
                  </Typography>
                  <img src={selectedFile} width="200px" alt={post.title} />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
