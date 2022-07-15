import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import { commentPost } from "../../actions/posts";

const CommentSection = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [comments, setComments] = useState([1, 2, 3, 4]);
  const [comment, setComment] = useState("");

  const user = JSON.parse(localStorage.getItem("profile"));

  const handleClick = () => {
    const finalComment = `${user.result.name}: ${comment}`;
    dispatch(commentPost(finalComment, post._id));
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments{" "}
          </Typography>
          {comments.map((c, index) => (
            <div className={classes.comment}>
              <Typography variant="subtitle1" key={index} gutterBottom>
                Comment {index}
              </Typography>
            </div>
          ))}
        </div>
        <div style={{ width: "70%" }}>
          <Typography gutterBottom variant="h6">
            Write a Comment
          </Typography>
          <TextField
            fullWidth
            minRows={4}
            multiline
            value={comment}
            variant="outlined"
            label="Comment"
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            disabled={!comment}
            fullWidth
            style={{ marginTop: "10px" }}
            onClick={handleClick}
          >
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
