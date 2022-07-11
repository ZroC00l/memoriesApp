import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, PaginationItem } from "@material-ui/lab";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { getPosts } from "../actions/posts";

const Paginate = ({ page }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    //run this effect each time the page changes
    if (page) {
      dispatch(getPosts(page));
    }
  }, [page]);

  const classes = useStyles();
  return (
    <Pagination
      count={5}
      page={1}
      variant="outlined"
      color="primary"
      classes={{ ul: classes.ul }}
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${1}`} />
      )}
    />
  );
};

export default Paginate;
