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
} from "@material-ui/core";
import theme from "../../theme/theme";
import JobCard from "../Job/JobCard";
import { firestore } from "../Firebase/firebase";
import ViewJobModal from "../Job/ViewJobModal";
import { useAuth } from "../../Context/AuthContext";
import { useHistory } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Logo from "C:/Users/chira/OneDrive/Desktop/nbyula/src/img/logo.png";

const useStyle = makeStyles((theme) => ({
  button1: {
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

  const fetchJobs = async () => {
    setloading(true);
    const req = await firestore
      .collection("jobs")
      .orderBy("order", "asc")
      .get();
    const tempJob = req.docs.map((job) => ({ ...job.data(), id: job.id }));
    setJobs(tempJob);
    updatedragCard(tempJob);
    setloading(false);
  };
  const [user, setUser] = useState(false);

  async function handleLogout() {
    await logout();
    history.push("/userlogin");
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  function handleOnDragEnd(result) {
    const items = Array.from(dragcard);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updatedragCard(items);
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
            justifyContent: "flex-end",
            padding: "0px 30px",
            margin: "10px 10px",
          }}
        >
          <Button
            variant="contained"
            className={classes.button1}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
        <ViewJobModal job={viewJob} closeModal={() => setViewJob({})} />

        <Box mb={3}>
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
      </ThemeProvider>
    </>
  );
};

export default Home;
