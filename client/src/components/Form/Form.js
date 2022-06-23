import React from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";

import useStyles from "./styles";

const Form = () => {
  const classes = useStyles();
  return (
    <div>
      <h1>form</h1>
    </div>
  );
};

export default Form;
