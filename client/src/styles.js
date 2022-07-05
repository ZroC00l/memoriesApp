import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "10px 50px",
    alignItems: "center",
  },
  [theme.breakpoints.down("sm")]: {
    mainContainer: {
      flexDirection: "column-reverse",
    },
  },
  heading: {
    color: "rgba(255,128,0)",
    textDecoration: "none",
  },
  image: {
    marginLeft: "15px",
  },
}));
