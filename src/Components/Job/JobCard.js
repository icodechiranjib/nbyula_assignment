import React from "react";
import { Box, Grid, Typography, Button, makeStyles } from "@material-ui/core";
import { useState, useEffect } from "react";
import { firestore } from "firebase";

const useStyle = makeStyles((theme) => ({
  wrapper: {
    border: "1px solid #e8e8e8",
    cursor: "pointer",
    transition: "0.5s",

    "&:hover": {
      boxShadow: "0px 5px 25px rgba(0,0,0,0.1)",
      opacity: "0.7",
    },
  },
  companyName: {
    fontSize: "15.5px",
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(0.75),
    borderRadius: "5px",
    display: "inline-block",
    fontWeight: 600,
  },
  skillchip: {
    margin: theme.spacing(0.5),
    padding: theme.spacing(0.75),
    fontSize: "14.5px",
    borderRadius: "5px",
    transition: "3s",
    cursor: "pointer",
    fontWeight: 600,
    backgroundColor: theme.palette.secondary.main,
    color: "#fff",
  },
}));

const initState = {
  fav: [],
};

export default (props) => {
  const classes = useStyle();
  const [interestDetails, setinterestDetails] = useState(initState);

  let currDate = new Date().toLocaleString();
  let deadDate = props.deadline;
  let dates = currDate.split(",");
  dates = dates[0].split("/");
  dates = dates[2] + "-" + dates[0] + "-" + dates[1];
  let endDate = parseInt((new Date(deadDate) - new Date(dates)) / 86400000);

  const [archive, setArchive] = useState({
    id: "",
    flag: true,
  });
  const [data, setData] = useState({});
  const change = async () => {
    archive.id
      ? await firestore().collection("jobs").doc(archive.id).update({
          flag: archive.flag,
        })
      : (() => {
          console.log();
        })();

    const req = await firestore().collection("jobs").orderBy("order").get();
    const tempJob = req.docs.map((job) => ({ ...job.data(), id: job.id }));

    setData(tempJob);
  };

  useEffect(() => {
    change();
  }, [!archive.flag]);

  const archiveJob = () => {
    setArchive({
      id: props.id,
      flag: false,
    });
  };
  return (
    <Box
      style={{
        padding: "10px 30px",
        color: "whitesmoke",
        marginBottom: "10px",
        borderRadius: "20px",
      }}
      bgcolor={
        endDate <= 14 && endDate > 3
          ? "#ffd11a"
          : endDate > 21
          ? "#66ff66"
          : "#ff1a1a"
      }
      className={classes.wrapper}
    >
      <Grid container alignItems="center">
        <Grid item xs>
          <Typography variant="subtitle1">
            <h6>
              <strong>{props.title}</strong>
            </h6>
          </Typography>
          <Typography className={classes.companyName} variant="subtitle1">
            <strong>{props.companyName}</strong>
          </Typography>
        </Grid>
        <Grid item container xs>
          {props.skills.map((skill) => (
            <Grid className={classes.skillchip} key={skill} item>
              {skill}
            </Grid>
          ))}
        </Grid>
        <Grid item container direction="column" xs>
          <Grid item>
            <Typography>
              {endDate <= 0 ? (
                <strong>Apply Date Passed</strong>
              ) : (
                <strong>Closing in {endDate} Days</strong>
              )}
            </Typography>
            <Typography>{props.email}</Typography>
            <Typography>{props.location}</Typography>
          </Grid>
          <Grid item>
            <Box marginTop={"10px"}>
              <Button
                className="mx-2"
                style={{ color: "whitesmoke", border: "1px solid white" }}
                onClick={props.open}
                variant="outlined"
              >
                Check
              </Button>
              <Button
                className="mx-2"
                style={{ color: "whitesmoke", border: "1px solid white" }}
                variant="outlined"
              >
                Interest
              </Button>
              {true ? (
                <Button
                  className="mx-2"
                  style={{ color: "whitesmoke", border: "1px solid white" }}
                  variant="outlined"
                  onClick={() => archiveJob(props)}
                >
                  Archive
                </Button>
              ) : (
                <></>
              )}
            </Box>
            <Box mt={2}></Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
