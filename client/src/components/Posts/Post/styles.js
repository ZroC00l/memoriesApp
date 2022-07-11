import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  media: {
    height: 0,
    paddingTop: "56.25%",
    backgroundColor: "rgba(0,0,0,0.5)",
    backgroundBlendMode: "darken",
  },
  border: {
    border: "solid",
  },
  fullHeightCard: {
    height: "100%",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "15px",
    height: "100%",
    position: "relative",
  },
  overlay: {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "white",
  },
  overlay2: {
    position: "absolute",
    top: "20px",
    right: "20px",
    color: "white",
  },
  grid: {
    display: "flex",
  },
  details: {
    //This will allow tags with extra long names to break to the next line in a div
    display: "inline",
    whiteSpace: "initial",
    wordBreak: "break-all",
    margin: "20px",
  },
  title: {
    padding: "0 16px",
  },
  cardActions: {
    padding: "0 16px 8px 16px",
    display: "flex",
    justifyContent: "space-between",
  },
  cardAction: {
    textAlign: "initial",
    display: "block",
  },
}));
