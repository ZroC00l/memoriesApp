import React from "react";
import { Divider, Typography } from "@material-ui/core";
import useStyles from "./styles";
import moment from "moment";

const PostDetails = ({ post }) => {
  const classes = useStyles();

  return (
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
          {post.tags.map((tag) => `#${tag}`)}
        </Typography>
        <Typography gutterBottom component="p" variant="body1">
          {post.message}
        </Typography>
        <Typography variant="h6">Created by: {post.name}</Typography>
        <Typography variant="body1">{moment(post.createdAt)}</Typography>
        <Divider style={{ margin: "20px 0" }} />
        <Typography variant="body1">
          <strong>Real time chat feature coming soon!</strong>
        </Typography>
        <Divider style={{ margin: "20px 0" }} />
      </div>
      <div className={classes.imageSection}>
        <img
          className={classes.media}
          src={post.selectedFile || "https://via.placeholder.com/300"}
          alt={post.title}
        />
      </div>
    </div>
  );
};

export default PostDetails;
