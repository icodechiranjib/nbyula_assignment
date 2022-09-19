import React, { useState } from "react";
import {
  Box,
  Grid,
  FilledInput,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  makeStyles,
  DialogActions,
  Typography,
  Button,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  skillchip: {
    margin: theme.spacing(0.5),
    padding: theme.spacing(0.75),
    fontSize: "14.5px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: 600,
    border: `1px solid ${theme.palette.secondary.main}`,
    color: theme.palette.secondary.main,
    cursor: "pointer",

    "&:hover": {
      backgroundColor: "black",
      color: "#fff",
    },
  },
  included: {
    backgroundColor: theme.palette.secondary.main,
    color: "#fff",
  },
}));

const initState = {
  title: "",
  type: "Full time",
  companyName: "",
  location: "",
  deadline: "",
  description: "",
  phone: "",
  email: "",
  skills: [],
  flag: true,
  order: 0,
};

export default (props) => {
  const [loading, setloading] = useState(false);
  const [jobDetails, setjobDetails] = useState(initState);

  const handleChange = (e) => {
    e.persist();
    setjobDetails((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.value,
    }));
  };

  const addRemoveSkill = (skill) =>
    jobDetails.skills.includes(skill)
      ? //remove skill
        setjobDetails((oldState) => ({
          ...oldState,
          skills: oldState.skills.filter((s) => s !== skill),
        }))
      : //add skill
        setjobDetails((oldState) => ({
          ...oldState,
          skills: oldState.skills.concat(skill),
        }));

  const handleSubmit = async () => {
    for (const field in jobDetails) {
      if (typeof jobDetails[field] === "string" && !jobDetails[field]) {
        return;
      }
    }
    if (!jobDetails.skills.length) return;
    setloading(true);
    await props.postJob(jobDetails);
    closeModal();
  };

  const closeModal = () => {
    setjobDetails(initState);
    setloading(false);
    props.closeModal();
  };

  const classes = useStyles();
  const skills = [
    " JavaScript ",
    " ReactJS ",
    " Node ",
    " MongoDB ",
    " SQL ",
    " Java ",
    " Python ",
  ];

  return (
    <Dialog open={props.newJobModal} fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          Post Job
          <IconButton onClick={closeModal}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FilledInput
              onChange={handleChange}
              required
              autoComplete="off"
              name="title"
              value={jobDetails.title}
              placeholder="Job Title *"
              disableUnderline
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              onChange={handleChange}
              disableUnderline
              name="type"
              value={jobDetails.type}
              variant="filled"
              fullWidth
            >
              <MenuItem value="Full time">Full time</MenuItem>
              <MenuItem value="Part time">Part time</MenuItem>
              <MenuItem value="Contract">Contract</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <FilledInput
              onChange={handleChange}
              required
              autoComplete="off"
              name="companyName"
              value={jobDetails.companyName}
              placeholder="Company Name *"
              disableUnderline
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <FilledInput
              onChange={handleChange}
              required
              autoComplete="off"
              name="location"
              value={jobDetails.location}
              placeholder="Job Location*"
              disableUnderline
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <FilledInput
              onChange={handleChange}
              required
              autoComplete="off"
              name="phone"
              value={jobDetails.phone}
              placeholder="Phone"
              disableUnderline
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <FilledInput
              onChange={handleChange}
              required
              autoComplete="off"
              name="email"
              value={jobDetails.email}
              placeholder="Email*"
              disableUnderline
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <FilledInput
              type="date"
              onChange={handleChange}
              required
              autoComplete="off"
              name="deadline"
              value={jobDetails.deadline}
              placeholder="Deadline *"
              disableUnderline
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FilledInput
              onChange={handleChange}
              required
              autoComplete="off"
              name="description"
              value={jobDetails.description}
              placeholder="Job Description*"
              disableUnderline
              multiline
              rows={3}
              fullWidth
            />
          </Grid>
        </Grid>
        <Box MT={2}>
          <Typography>Skills</Typography>
          <Box
            display="flex"
            sx={{
              marginTop: "20px",
            }}
          >
            {skills.map((skill) => (
              <Box
                onClick={() => addRemoveSkill(skill)}
                className={`${classes.skillchip} ${
                  jobDetails.skills.includes(skill) && classes.included
                }`}
                key={skill}
              >
                {skill}
              </Box>
            ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box
          color="red"
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="caption">*Required fields</Typography>
          <Button
            onClick={handleSubmit}
            disable={loading}
            variant="contained"
            disableElevation
            color="primary"
          >
            {loading ? (
              <CircularProgress color="secondary" size={22} />
            ) : (
              "Post Job"
            )}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
