import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import useStyles from "./styles";

const CommentSection = ({ post }) => {
  const classes = useStyles();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState([]);
  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
            {comments.map((comment, index) => (
              <div className={classes.comment}>
                <Typography variant="subtitle" key={index} gutterBottom>
                  comment {index}
                </Typography>
              </div>
            ))}
          </Typography>
        </div>
        <div style={{ width: "70%" }}>
          <Typography gutterBottom variant="h6">
            Write a Comment
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
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
          >
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
