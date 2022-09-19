import React from "react";
import {
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
  DialogActions,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  info: {
    "& > *": {
      margin: "4px",
    },
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

export default (props) => {
  const classes = useStyles();

  return (
    <>
      <Dialog open={!!Object.keys(props.job).length} fullWidth>
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {props.job.title} @ {props.job.companyName}
            <IconButton onClick={props.closeModal}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box>
            <Box display="flex" className={classes.info}>
              <Typography variant="caption">
                <strong>Company Name :</strong>
              </Typography>
              <Typography variant="body2">
                <strong>{props.job.companyName}</strong>
              </Typography>
            </Box>
            <Box display="flex" className={classes.info}>
              <Typography variant="caption">
                <strong> Posted :</strong>
              </Typography>
              <Typography variant="body2">
                <strong>recently</strong>
              </Typography>
            </Box>
            <Box display="flex" className={classes.info}>
              <Typography variant="caption">
                <strong>Job type :</strong>
              </Typography>
              <Typography variant="body2">
                <strong>{props.job.type}</strong>
              </Typography>
            </Box>
            <Box display="flex" className={classes.info}>
              <Typography variant="caption">
                <strong>Location :</strong>
              </Typography>
              <Typography variant="body2">
                <strong>{props.job.location}</strong>
              </Typography>
            </Box>
            <Box display="flex" className={classes.info}>
              <Typography variant="caption">
                <strong>Job description :</strong>
              </Typography>
              <Typography variant="body2">{props.job.description}</Typography>
            </Box>
            <Box ml={0.5}>
              <Typography variant="caption">
                <strong>Skills Required:</strong>
              </Typography>
              <Grid container alignItems="center">
                {props.job.skills &&
                  props.job.skills.map((skill) => (
                    <Grid item key={skill} className={classes.skillchip}>
                      <strong>{skill}</strong>
                    </Grid>
                  ))}
              </Grid>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            component="a"
            href={props.job.link}
            target="_blank"
          >
            <strong>Apply</strong>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
