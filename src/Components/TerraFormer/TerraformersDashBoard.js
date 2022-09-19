import React, { useState, useEffect } from "react";
import {
  Box,
  ThemeProvider,
  Grid,
  CircularProgress,
  Button,
  makeStyles,
  Typography,
  AppBar,
  Toolbar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import theme from "../../theme/theme";
import JobCard from "../Job/JobCard";
import NewJobModal from "../Job/NewJobModal";
import { firestore, app } from "../Firebase/firebase";
import ViewJobModal from "../Job/ViewJobModal";
import { useAuth } from "../../Context/AuthContext";
import { useHistory } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Logo from "../img/logo.png";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyle = makeStyles((theme) => ({
  button1: {
    fontSize: "15px",
    backgroundColor: "white",
    padding: "5px 20px",
    borderRadius: "5px",
    display: "inline-block",
    fontWeight: "300",
    color: "black",
  },
  button2: {
    fontSize: "15px",
    backgroundColor: "black",
    padding: "5px 20px",
    borderRadius: "5px",
    display: "inline-block",
    fontWeight: "300",
    color: "white",
  },
}));

const Home = () => {
  const classes = useStyle();
  const [jobs, setJobs] = useState([]);
  const [loading, setloading] = useState(true);
  const [newJobModal, setNewJobModal] = useState(false);
  const [viewJob, setViewJob] = useState({});
  const { logout } = useAuth();
  const history = useHistory();
  const [dragcard, updatedragCard] = useState([]);

  const changeLayout = async (tempJob) => {
    console.log("1", tempJob);
    let size = Object.keys(tempJob).length;
    for (let i = 0; i < size; i++) {
      await firestore.collection("jobs").doc(tempJob[i].id).update({
        order: i,
      });
    }
  };

  const fetchJobs = async () => {
    setloading(true);
    const req = await firestore.collection("jobs").orderBy("order").get();
    const tempJob = req.docs.map((job) => ({ ...job.data(), id: job.id }));
    setJobs(tempJob);
    updatedragCard(tempJob);
    setloading(false);
  };

  const postJob = async (jobDetails) => {
    await firestore.collection("jobs").add({
      ...jobDetails,
      postedOn: app.firestore.FieldValue.serverTimestamp(),
    });
    fetchJobs();
  };

  async function handleLogout() {
    await logout();
    history.push("/login");
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  function handleOnDragEnd(result) {
    const items = Array.from(dragcard);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setJobs(items);
    updatedragCard(items);
    changeLayout(items);
  }

  return (
    <>
      <div style={{ background: "grey" }}>
        <AppBar
          position="static"
          style={{ background: "black", color: "white" }}
        >
          <Toolbar>
            <img src={Logo} />
            <Typography variant="h5" style={{ marginLeft: "50px" }}>
              <strong>JobsManiacs</strong>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <ThemeProvider theme={theme}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0px 30px",
            margin: "10px 10px",
          }}
        >
          <Button
            onClick={() => setNewJobModal(true)}
            variant="contained"
            disableElevation
            className={classes.button1}
          >
            Post Job
          </Button>
          <Button
            variant="contained"
            className={classes.button2}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
        <NewJobModal
          closeModal={() => setNewJobModal(false)}
          newJobModal={newJobModal}
          postJob={postJob}
        />
        <ViewJobModal job={viewJob} closeModal={() => setViewJob({})} />

        <Box mb={3} mt={3}>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="JobCards">
              {(provided) => (
                <Grid
                  container
                  justify="center"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <Grid item xs={10}>
                    {loading ? (
                      <Box display="flex" justifyContent="center">
                        <CircularProgress />
                      </Box>
                    ) : (
                      dragcard.map((job, index) => {
                        return job.flag ? (
                          <Draggable
                            key={job.id}
                            draggableId={job.id}
                            index={index}
                          >
                            {(provided) => (
                              <Grid
                                item
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                <JobCard
                                  title2="Interest"
                                  open={() => setViewJob(job)}
                                  {...job}
                                />
                              </Grid>
                            )}
                          </Draggable>
                        ) : (
                          <></>
                        );
                      })
                    )}
                  </Grid>
                </Grid>
              )}
            </Droppable>
          </DragDropContext>
        </Box>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Archives</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="JobCards">
                {(provided) => (
                  <Grid
                    container
                    justify="center"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <Grid item xs={10}>
                      {loading ? (
                        <Box display="flex" justifyContent="center">
                          <CircularProgress />
                        </Box>
                      ) : (
                        dragcard.map((job, index) => {
                          return !job.flag ? (
                            <Draggable
                              key={job.id}
                              draggableId={job.id}
                              index={index}
                            >
                              {(provided) => (
                                <Grid
                                  item
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                >
                                  <JobCard
                                    title2="Interest"
                                    open={() => setViewJob(job)}
                                    {...job}
                                  />
                                </Grid>
                              )}
                            </Draggable>
                          ) : (
                            <></>
                          );
                        })
                      )}
                    </Grid>
                  </Grid>
                )}
              </Droppable>
            </DragDropContext>
          </AccordionDetails>
        </Accordion>
      </ThemeProvider>
    </>
  );
};

export default Home;
