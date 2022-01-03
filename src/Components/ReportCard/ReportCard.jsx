import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import HOC from "../../Common/HOC";
import { Card, Grid } from "@material-ui/core";
//pagination
import TablePagination from "@material-ui/core/TablePagination";
import { useNavigate } from "react-router-dom";
//dialog vox
import Button from "@material-ui/core/Button";
import { PieChart } from "react-minimal-pie-chart";
import SubjectMovement from "../Report/SubjectMovement/SubjectMovement";
import MissedConcepts from "../Report/MissedConcepts/MissedConcepts";
import Analysis from "../Report/Analysis/Analysis";

//DIALOG BOX
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function ReportCard(props) {
  let navigate = useNavigate();
  const studentname = [
    {
      name: "Disha Patani",
      score: 142,
      Cutoff: 75,
      NITCutoff: 180,
    },
  ];

  const Index = [
    {
      Section: "Overview",
      Description: "Overall analysis of the paper",
    },
    {
      Section: "Time and Accuracy",
      Description: "Where did you spend your time with accuracy",
    },
    {
      Section: "Attempts",
      Description: "How did you attempt the questions",
    },
    {
      Section: "Difficulty Analysis",
      Description: "How you fared at easy, moderate and tough questions",
    },
    {
      Section: "Time Travel",
      Description: "How you spent your 3 hour",
    },
    {
      Section: "Painful Questions ",
      Description: "Questions that hurt you the most",
    },
    {
      Section: "Subject Movement ",
      Description: "How many times you jumped the subjects",
    },
    {
      Section: "Missed Concepts  ",
      Description: "Concepts you got wrong",
    },
    {
      Section: "Physics Analysis ",
      Description: "Question wise analysis of Physics",
    },
    {
      Section: "Chemistry Analysis ",
      Description: "Question wise analysis of Chemistry",
    },
    {
      Section: "Mathematics Analysis",
      Description: "Question wise analysis of Mathematics",
    },
  ];

  const Overview = [
    {
      all: "Overall",
      Score: "142 / 300",
      Correct: "41 / 75",
      Incorrect: "28 / 75",
      Unattempted: "6 / 75",
      NotVisited: "0 / 75",
    },
    {
      all: "Physics",
      Score: "37 / 100",
      Correct: "11 / 25",
      Incorrect: "8 / 25",
      Unattempted: "6 / 25",
      NotVisited: "0 / 25",
    },
    {
      all: "Chemistry",
      Score: "53 / 100",
      Correct: "15 / 25",
      Incorrect: "10 / 25",
      Unattempted: "0 / 25",
      NotVisited: "0 / 25",
    },
    {
      all: "Maths ",
      Score: "52 / 100",
      Correct: "15 / 25",
      Incorrect: "10 / 25",
      Unattempted: "0 / 25",
      NotVisited: "0 / 25",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [EditDailogOpen, setEditDailogOpen] = useState("");

  // for pagination hadler
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    window.scrollTo(0, 0);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [titlename, settitlename] = useState("");
  const filterData = studentname.filter((event) => {
    return event.name.toLowerCase().indexOf(titlename.toLowerCase()) !== -1;
  });
  const [all, setall] = useState("");
  const filterDataa = Index.filter((event) => {
    return event.Section.toLowerCase().indexOf(titlename.toLowerCase()) !== -1;
  });

  const [Section, setSection] = useState("");
  const filterOverview = Overview.filter((event) => {
    return event.all.toLowerCase().indexOf(Section.toLowerCase()) !== -1;
  });

  const classes = useStyles();

  return (
    <>
      <div className="home_padding">
        <div className="content_padding">
          <Grid className="Component_main_grid mb-3">
            <Grid item md={9}>
              <h3 className="mb-2">Report Card</h3>
              {/* <button type="button" class="btn btn-info mr-4">
                <i class="fa fa-plus"></i> Create
              </button> */}
              <button
                type="button"
                class="btn btn-info mr-4"
                onClick={() => navigate(-1)}
              >
                <i class="fa fa-arrow-left pr-1"></i>Go Back
              </button>
            </Grid>
            <Grid item md={3}>
              <div className="d-flex">
                <span className="p-2">
                  <i class="fa fa-search"></i>
                </span>
                <span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search by Name"
                    value={titlename}
                    onChange={(e) => {
                      settitlename(e.target.value);
                    }}
                  />
                </span>
              </div>
            </Grid>
          </Grid>
          <div>
            <h2 className="text-center mb-4">
              Report Card - JEE Main Mock Test 1
            </h2>
          </div>
          <Card classname="main_card p-3">
            <TableContainer>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <h6>Student Name</h6>
                    </TableCell>
                    <TableCell>
                      <h6>Test Score</h6>
                    </TableCell>
                    <TableCell>
                      <h6>Cutoff Score</h6>
                    </TableCell>
                    <TableCell>
                      <h6>NIT Cutoff Score</h6>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? studentname.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : studentname
                  ).map((row) => (
                    <TableRow key={row.name}>
                      <TableCell>{row.name}</TableCell>

                      <TableCell>{row.score}</TableCell>
                      <TableCell>{row.Cutoff}</TableCell>
                      <TableCell>{row.NITCutoff}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <TablePagination
                true
                rowsPerPageOptions={false}
                component="div"
                count={filterData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableContainer>
          </Card>
          <br />
          <div>
            <h2 className="text-center mb-4">Index</h2>
          </div>
          <Card classname="main_card p-3">
            <TableContainer>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <h6>Section</h6>
                    </TableCell>
                    <TableCell>
                      <h6>Description</h6>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filterDataa.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell>{row.Section}</TableCell>

                      <TableCell>{row.Description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* <TablePagination
                true
                rowsPerPageOptions={false}
                component="div"
                count={filterData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              /> */}
            </TableContainer>
          </Card>
          <div>
            <h2 className="text-center mb-4 mt-3">
              Overview<i class="fa fa-question"></i>
            </h2>
            <p className="text-center mb-4 mt-3">
              This is a quick snapshot of your performance measured in terms of
              attempts that were correct, incorrect, unattempted and questions
              that were not visited at all. The individual subject-wise analysis
              will help you gaze your performance on a subject level. The
              graphical analysis will further help you with a quick insight.
            </p>
          </div>
          <Card classname="main_card p-3">
            <TableContainer>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>
                      <h6>Score</h6>
                    </TableCell>
                    <TableCell>
                      <h6>Correct</h6>
                    </TableCell>
                    <TableCell>
                      <h6>Incorrect</h6>
                    </TableCell>
                    <TableCell>
                      <h6>Unattempted</h6>
                    </TableCell>
                    <TableCell>
                      <h6>Not Visited</h6>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? filterOverview.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : filterOverview
                  ).map((row) => (
                    <TableRow key={row.name}>
                      <TableCell>{row.all}</TableCell>
                      <TableCell>{row.Score}</TableCell>
                      <TableCell>{row.Correct}</TableCell>
                      <TableCell>{row.Incorrect}</TableCell>
                      <TableCell>{row.Unattempted}</TableCell>
                      <TableCell>{row.NotVisited}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <TablePagination
                true
                rowsPerPageOptions={false}
                component="div"
                count={filterData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableContainer>
          </Card>
          <div>
            <h4 className="text-center mt-3 mb-3">Overall</h4>
          </div>

          {/* ///firest section */}
          <div className="piesection">
            <div className="box d-flex">
              <div className="color_peachart"></div>
              <div>
                <p className="text-center">
                  <span className="data_course ml-2"></span>
                  Physics
                </p>
              </div>
              <div className="color_peacharte ml-2"></div>
              <div>
                <p className="text-center ml-2">
                  <span className="data_course"></span>
                  Chemistry
                </p>
              </div>
              <div className="color_peachartee ml-2"></div>
              <div>
                <p className="text-center ">
                  <span className="data_course ml-2"></span>
                  Maths
                </p>
              </div>
            </div>
            <div className="text-center mt-3">
              <PieChart
                data={[
                  { title: "One", value: 10, color: "#228be6" },
                  { title: "Two", value: 15, color: "#f08c00" },
                  { title: "Three", value: 20, color: "#2f9e44" },
                ]}
                style={{ width: "250", height: "250" }}
              />
            </div>
          </div>

          {/* section section */}

          <div className="piesection mt-4">
            <div className="box d-flex">
              <Grid className="Component_main_grid">
                <Grid item md={4}>
                  <div>
                    <h4 className="text-center mt-3 mb-3">
                      Overall of Physics
                    </h4>
                  </div>
                  <div className="main_div d-flex">
                    <div className="d-flex">
                      <div className="color_peachart"></div>
                      <div>
                        <p className="text-center ml-2">
                          <span className="data_course "></span>
                          Correct
                        </p>
                      </div>
                    </div>
                    <div className="d-flex ">
                      <div className="data_incorrect ml-2"></div>
                      <div>
                        <p className="text-center">
                          <span className="data_course ml-2"></span>
                          InCorrect
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex text">
                    <div className="data_unattempt"></div>
                    <div>
                      <p className="text-center">
                        <span className="data_course ml-2"></span>
                        Unattempted
                      </p>
                    </div>
                  </div>
                  <PieChart
                    data={[
                      { title: "One", value: 10, color: "#e03131" },
                      { title: "Two", value: 18, color: "#ced4da" },
                      { title: "Three", value: 20, color: "#2f9e44" },
                    ]}
                    style={{ width: "200", height: "200" }}
                  />
                </Grid>
                <Grid item md={4}>
                  <div>
                    <h4 className="text-center mt-3 mb-3">
                      Overall of Chemistry
                    </h4>
                  </div>
                  <div className="main_div d-flex">
                    <div className="d-flex">
                      <div className="color_peachart"></div>
                      <div>
                        <p className="text-center ml-2">
                          <span className="data_course "></span>
                          Correct
                        </p>
                      </div>
                    </div>
                    <div className="d-flex ">
                      <div className="data_incorrect ml-2"></div>
                      <div>
                        <p className="text-center">
                          <span className="data_course ml-2"></span>
                          InCorrect
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex text">
                    <div className="data_unattempt"></div>
                    <div>
                      <p className="text-center">
                        <span className="data_course ml-2"></span>
                        Unattempted
                      </p>
                    </div>
                  </div>
                  <PieChart
                    data={[
                      { title: "One", value: 10, color: "#e03131" },
                      // { title: "Two", value: 18, color: "#ced4da" },
                      { title: "Three", value: 20, color: "#2f9e44" },
                    ]}
                    style={{ width: "200", height: "200" }}
                  />
                </Grid>
                <Grid item md={4}>
                  <div>
                    <h4 className="text-center mt-3 mb-3">
                      Overall of Mathematics
                    </h4>
                  </div>
                  <div className="main_div d-flex">
                    <div className="d-flex">
                      <div className="color_peachart"></div>
                      <div>
                        <p className="text-center ml-2">
                          <span className="data_course "></span>
                          Correct
                        </p>
                      </div>
                    </div>
                    <div className="d-flex ">
                      <div className="data_incorrect ml-2"></div>
                      <div>
                        <p className="text-center">
                          <span className="data_course ml-2"></span>
                          InCorrect
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex text">
                    <div className="data_unattempt"></div>
                    <div>
                      <p className="text-center">
                        <span className="data_course ml-2"></span>
                        Unattempted
                      </p>
                    </div>
                  </div>
                  <PieChart
                    data={[
                      // { title: "One", value: 10, color: "#e03131" },
                      { title: "Two", value: 18, color: "#ced4da" },
                      { title: "Three", value: 20, color: "#2f9e44" },
                    ]}
                    style={{ width: "200", height: "200" }}
                  />
                </Grid>
              </Grid>
            </div>
            {/* <div className="secton_second_piechart text-center mt-3">
            
             
            </div> */}
          </div>

          {/* sectoin Time and Accuracy  */}
          <div className="mt-5 mb-3">
            <h4>Time and Accuracy</h4>
            <p>
              Time is the most important resource in any competitive exam. And
              one major element of any test analysis is to check the time spent
              on an individual subject. This section will not only give you
              insight on the time spent but also the percentage attempt and
              accuracy at the subject level. Make sure to maintain a good
              balance between accuracy and time spent on a subject.
            </p>
          </div>

          <Card classname="main_card p-3">
            <TableContainer>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>
                      <h6>Time Spent </h6>
                    </TableCell>
                    <TableCell>
                      <h6>Attempt (in %)</h6>
                    </TableCell>
                    <TableCell>
                      <h6>Accuracy (in %)</h6>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? filterOverview.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : filterOverview
                  ).map((row) => (
                    <TableRow key={row.name}>
                      <TableCell>
                        <b>Overall</b>
                      </TableCell>
                      <TableCell>174 min 15 s</TableCell>
                      <TableCell>92.00</TableCell>
                      <TableCell>59.42</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <TablePagination
                true
                rowsPerPageOptions={false}
                component="div"
                count={filterData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableContainer>
          </Card>

          <div className="piesection mt-4">
            <div className="box d-flex">
              <Grid className="Component_main_grid">
                <Grid item md={6}>
                  <div>
                    <h4 className="text-center mt-3 mb-3">
                      Section Wise Time Spent(in min)
                    </h4>
                  </div>
                  <div className="main_div d-flex">
                    <div className="d-flex">
                      <div className="color_peachart"></div>
                      <div>
                        <p className="text-center ml-2">
                          <span className="data_course "></span>
                          Correct
                        </p>
                      </div>
                    </div>
                    <div className="d-flex ">
                      <div className="color_peacharte ml-2"></div>
                      <div>
                        <p className="text-center">
                          <span className="data_course ml-2"></span>
                          InCorrect
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex text">
                    <div className="color_peachartee"></div>
                    <div>
                      <p className="text-center">
                        <span className="data_course ml-2"></span>
                        Unattempted
                      </p>
                    </div>
                  </div>
                  <PieChart
                    data={[
                      { title: "One", value: 10, color: "#f08c00" },
                      { title: "Two", value: 18, color: "#228be6" },
                      { title: "Three", value: 20, color: "#2f9e44" },
                    ]}
                    style={{ width: "200", height: "200" }}
                  />
                </Grid>
                <Grid item md={6}>
                  <div>
                    <h4 className="text-center mt-3 mb-3">Attempts</h4>
                  </div>
                  <div className="main_div d-flex">
                    <div className="d-flex">
                      <div className="color_peachart"></div>
                      <div>
                        <p className="text-center ml-2">
                          <span className="data_course "></span>
                          Correct
                        </p>
                      </div>
                    </div>
                    <div className="d-flex ">
                      <div className="color_peacharte ml-2"></div>
                      <div>
                        <p className="text-center">
                          <span className="data_course ml-2"></span>
                          InCorrect
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex text">
                    <div className="color_peachartee"></div>
                    <div>
                      <p className="text-center">
                        <span className="data_course ml-2"></span>
                        Unattempted
                      </p>
                    </div>
                  </div>
                  <PieChart
                    data={[
                      { title: "One", value: 5, color: "#f08c00" },
                      { title: "Two", value: 18, color: "#228be6" },
                      { title: "Three", value: 20, color: "#2f9e44" },
                    ]}
                    style={{ width: "200", height: "200" }}
                  />
                </Grid>
              </Grid>
            </div>
          </div>

          {/* section Attempts  */}

          <div className="mt-5 mb-5 text-left">
            <h4 className="text-center">Attempts</h4>
            <p>The report has categorized your attempts as follows:</p>
            <p>
              <b>Perfect Attempts:</b> Correct attempt solved in time
            </p>
            <p>
              <b>Wasted Attempts:</b> Incorrect attempt and solved very quickly
            </p>
            <p>
              <b>Overtimed Attempts:</b> Incorrect attempt and solved in time
              greater than the allotted time
            </p>
            <p>
              <b>Confused Attempts:</b> Unattempted but the time spent greater
              than the suggested time
            </p>
          </div>

          <Card classname="main_card p-3">
            <TableContainer>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>
                      <h6>Time Spent </h6>
                    </TableCell>
                    <TableCell>
                      <h6>Attempt (in %)</h6>
                    </TableCell>
                    <TableCell>
                      <h6>Accuracy (in %)</h6>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? filterOverview.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : filterOverview
                  ).map((row) => (
                    <TableRow key={row.name}>
                      <TableCell>
                        <b>Overall</b>
                      </TableCell>
                      <TableCell>174 min 15 s</TableCell>
                      <TableCell>92.00</TableCell>
                      <TableCell>59.42</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <TablePagination
                true
                rowsPerPageOptions={false}
                component="div"
                count={filterData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableContainer>
          </Card>

          <div>
            <h4 className="text-center mt-3 mb-3">All Atempts</h4>
          </div>

          {/* ///all attempts section */}
          <div className="piesection">
            <div className="box d-flex">
              <div className="data_perfect"></div>
              <div>
                <p className="text-center">
                  <span className="data_course ml-2"></span>
                  Perfect
                </p>
              </div>
              <div className="data_wasted ml-2"></div>
              <div>
                <p className="text-center ml-2">
                  <span className="data_course"></span>
                  Wasted
                </p>
              </div>
              <div className="data_ovetimed ml-2"></div>
              <div>
                <p className="text-center ">
                  <span className="data_course ml-2"></span>
                  Overtimed
                </p>
              </div>
              <div className="data_confused ml-2"></div>
              <div>
                <p className="text-center ">
                  <span className="data_course ml-2"></span>
                  Confused
                </p>
              </div>
            </div>
            <div className="text-center mt-3">
              <PieChart
                data={[
                  { title: "One", value: 10, color: "#cc65fe" },
                  { title: "Two", value: 18, color: "#ffce56" },
                  { title: "Three", value: 20, color: "#ff6384" },
                  { title: "Three", value: 20, color: "#36a2eb" },
                ]}
                style={{ width: "300", height: "300" }}
              />
            </div>
          </div>

          <div className="piesection mt-4">
            <div className="box d-flex">
              <Grid className="Component_main_grid">
                <Grid item md={4}>
                  <div>
                    <h4 className="text-center mt-3 mb-3">Physics Attempts</h4>
                  </div>
                  <div className="main_div d-flex">
                    <div className="d-flex">
                      <div className="data_perfect"></div>
                      <div>
                        <p className="text-center ml-2">
                          <span className="data_course "></span>
                          Perfect
                        </p>
                      </div>
                    </div>
                    <div className="d-flex ">
                      <div className="data_wasted ml-2"></div>
                      <div>
                        <p className="text-center">
                          <span className="data_course ml-2"></span>
                          Wasted
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="main_div d-flex">
                    <div className="d-flex">
                      <div className="data_ovetimed"></div>
                      <div>
                        <p className="text-center ml-2">
                          <span className="data_course "></span>
                          Overtimed
                        </p>
                      </div>
                    </div>
                    <div className="d-flex ">
                      <div className="data_confused ml-2"></div>
                      <div>
                        <p className="text-center">
                          <span className="data_course ml-2"></span>
                          Confused
                        </p>
                      </div>
                    </div>
                  </div>

                  <PieChart
                    data={[
                      { title: "One", value: 10, color: "#cc65fe" },
                      { title: "Two", value: 18, color: "#ffce56" },
                      { title: "Three", value: 20, color: "#ff6384" },
                      { title: "Three", value: 20, color: "#36a2eb" },
                    ]}
                    style={{ width: "200", height: "200" }}
                  />
                </Grid>
                <Grid item md={4}>
                  <div>
                    <h4 className="text-center mt-3 mb-3">
                      Chemistry Attempts
                    </h4>
                  </div>
                  <div className="main_div d-flex">
                    <div className="d-flex">
                      <div className="data_perfect"></div>
                      <div>
                        <p className="text-center ml-2">
                          <span className="data_course "></span>
                          Perfect
                        </p>
                      </div>
                    </div>
                    <div className="d-flex ">
                      <div className="data_wasted ml-2"></div>
                      <div>
                        <p className="text-center">
                          <span className="data_course ml-2"></span>
                          Wasted
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="main_div d-flex">
                    <div className="d-flex">
                      <div className="data_ovetimed"></div>
                      <div>
                        <p className="text-center ml-2">
                          <span className="data_course "></span>
                          Overtimed
                        </p>
                      </div>
                    </div>
                    <div className="d-flex ">
                      <div className="data_confused ml-2"></div>
                      <div>
                        <p className="text-center">
                          <span className="data_course ml-2"></span>
                          Confused
                        </p>
                      </div>
                    </div>
                  </div>

                  <PieChart
                    data={[
                      { title: "One", value: 10, color: "#cc65fe" },
                      { title: "Two", value: 18, color: "#ffce56" },
                      // { title: "Three", value: 20, color: "#ff6384" },
                      { title: "Three", value: 20, color: "#36a2eb" },
                    ]}
                    style={{ width: "200", height: "200" }}
                  />
                </Grid>
                <Grid item md={4}>
                  <div>
                    <h4 className="text-center mt-3 mb-3">
                      Mathematics Attempts
                    </h4>
                  </div>
                  <div className="main_div d-flex">
                    <div className="d-flex">
                      <div className="data_perfect"></div>
                      <div>
                        <p className="text-center ml-2">
                          <span className="data_course "></span>
                          Perfect
                        </p>
                      </div>
                    </div>
                    <div className="d-flex ">
                      <div className="data_wasted ml-2"></div>
                      <div>
                        <p className="text-center">
                          <span className="data_course ml-2"></span>
                          Wasted
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="main_div d-flex">
                    <div className="d-flex">
                      <div className="data_ovetimed"></div>
                      <div>
                        <p className="text-center ml-2">
                          <span className="data_course "></span>
                          Overtimed
                        </p>
                      </div>
                    </div>
                    <div className="d-flex ">
                      <div className="data_confused ml-2"></div>
                      <div>
                        <p className="text-center">
                          <span className="data_course ml-2"></span>
                          Confused
                        </p>
                      </div>
                    </div>
                  </div>

                  <PieChart
                    data={[
                      { title: "One", value: 10, color: "#cc65fe" },
                      { title: "Two", value: 18, color: "#ffce56" },
                      { title: "Three", value: 20, color: "#ff6384" },
                      // { title: "Three", value: 20, color: "#36a2eb" },
                    ]}
                    style={{ width: "200", height: "200" }}
                  />
                </Grid>
              </Grid>
            </div>
          </div>

          {/* section Difficulty Analysis */}

          <div className="mt-5 mb-3 text-center">
            <h4>Difficulty Analysis </h4>
            <p>
              Every exam contains 3 category of questions Easy, Moderate and
              Tough. And it is important to make sure that you have a high
              accuracy in the first two, i.e. easy and moderate difficulty
              questions. This section will help you visualize the same on every
              subject level.
            </p>

            <p>Overall Difficulty Analysis</p>
          </div>
          <div className="text-center mt-3">
            <PieChart
              data={[
                { title: "One", value: 10, color: "#ced4da" },
                { title: "Two", value: 18, color: "#e03131" },
                { title: "Three", value: 20, color: "#2f9e44" },
              ]}
              style={{ width: "300", height: "300" }}
            />
          </div>
          <div className="piesection mt-5">
            <div className="box d-flex">
              <div className="color_peachart"></div>
              <div>
                <p className="text-center">
                  <span className="data_course ml-2"></span>
                  Correct
                </p>
              </div>
              <div className="data_incorrect ml-2"></div>
              <div>
                <p className="text-center ml-2">
                  <span className="data_course"></span>
                  Incorrect
                </p>
              </div>
              <div className="data_unanswered ml-2"></div>
              <div>
                <p className="text-center ">
                  <span className="data_course ml-2"></span>
                  Unanswered
                </p>
              </div>
            </div>
          </div>

          <div className="piesection mt-4">
            <div className="box d-flex">
              <Grid className="Component_main_grid">
                <Grid item md={4}>
                  <div>
                    <h4 className="text-center mt-3 mb-3">
                      Physics Difficulty Analysis
                    </h4>
                  </div>
                  <div className="main_div d-flex">
                    <div className="d-flex">
                      <div className="color_peachart"></div>
                      <div>
                        <p className="text-center ml-2">
                          <span className="data_course "></span>
                          Correct
                        </p>
                      </div>
                    </div>
                    <div className="d-flex ">
                      <div className="data_incorrect ml-2"></div>
                      <div>
                        <p className="text-center">
                          <span className="data_course ml-2"></span>
                          Incorrect
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="main_div d-flex">
                    <div className="d-flex">
                      <div className="data_unattempt"></div>
                      <div>
                        <p className="text-center ml-2">
                          <span className="data_course "></span>
                          unanswered
                        </p>
                      </div>
                    </div>
                  </div>

                  <PieChart
                    data={[
                      { title: "One", value: 10, color: "#ced4da" },
                      { title: "Two", value: 18, color: "#e03131" },
                      { title: "Three", value: 20, color: "#2f9e44" },
                    ]}
                    style={{ width: "200", height: "200" }}
                  />
                </Grid>
                <Grid item md={4}>
                  <div>
                    <h4 className="text-center mt-3 mb-3">
                      Chemistry Difficulty Analysis
                    </h4>
                  </div>
                  <div className="main_div d-flex">
                    <div className="d-flex">
                      <div className="color_peachart"></div>
                      <div>
                        <p className="text-center ml-2">
                          <span className="data_course "></span>
                          Correct
                        </p>
                      </div>
                    </div>
                    <div className="d-flex ">
                      <div className="data_incorrect ml-2"></div>
                      <div>
                        <p className="text-center">
                          <span className="data_course ml-2"></span>
                          Incorrect
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="main_div d-flex">
                    <div className="d-flex">
                      <div className="data_unattempt"></div>
                      <div>
                        <p className="text-center ml-2">
                          <span className="data_course "></span>
                          unanswered
                        </p>
                      </div>
                    </div>
                  </div>

                  <PieChart
                    data={[
                      { title: "One", value: 10, color: "#ced4da" },
                      { title: "Two", value: 18, color: "#e03131" },
                      { title: "Three", value: 20, color: "#2f9e44" },
                    ]}
                    style={{ width: "200", height: "200" }}
                  />
                </Grid>
                <Grid item md={4}>
                  <div>
                    <h4 className="text-center mt-3 mb-3">
                      Maths Difficulty Analysis
                    </h4>
                  </div>
                  <div className="main_div d-flex">
                    <div className="d-flex">
                      <div className="color_peachart"></div>
                      <div>
                        <p className="text-center ml-2">
                          <span className="data_course "></span>
                          Correct
                        </p>
                      </div>
                    </div>
                    <div className="d-flex ">
                      <div className="data_incorrect ml-2"></div>
                      <div>
                        <p className="text-center">
                          <span className="data_course ml-2"></span>
                          Incorrect
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="main_div d-flex">
                    <div className="d-flex">
                      <div className="data_unattempt"></div>
                      <div>
                        <p className="text-center ml-2">
                          <span className="data_course "></span>
                          unanswered
                        </p>
                      </div>
                    </div>
                  </div>

                  <PieChart
                    data={[
                      { title: "One", value: 10, color: "#ced4da" },
                      { title: "Two", value: 18, color: "#e03131" },
                      { title: "Three", value: 20, color: "#2f9e44" },
                    ]}
                    style={{ width: "200", height: "200" }}
                  />
                </Grid>
              </Grid>
            </div>
          </div>

          {/* section Time Travel  */}
          <div className="text-center mt-4">
            <h4>Time Travel</h4>
            <p>
              This section will help you see where you lose attention and at
              what time moment you started committing more than usual errors if
              any The section will provide you insight on every 30-minute
              interval after the initial one hour of time spent. You will get to
              know how your 4 different attempts vary as time progresses in the
              exam.
            </p>
          </div>
          <Card classname="main_card p-3">
            <TableContainer>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>
                      <h6>Perfect</h6>
                    </TableCell>
                    <TableCell>
                      <h6>Wasted</h6>
                    </TableCell>
                    <TableCell>
                      <h6>Overtimed</h6>
                    </TableCell>
                    <TableCell>
                      <h6>Confused</h6>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <b>First 30 mins</b>
                    </TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <b>Next 30 min </b>
                    </TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <b>Next 30 min </b>
                    </TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <b>Next 30 min </b>
                    </TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <b>Next 30 min </b>
                    </TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <b>Next 30 min </b>
                    </TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>0</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <TablePagination
                true
                rowsPerPageOptions={false}
                component="div"
                count={filterData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableContainer>
          </Card>

          {/* Attempts Over the 3 Hours */}

          <div className="text-center mt-4">
            <h4>Attempts Over the 3 Hours</h4>
            <p>
              This section will help you see where you attempted the most number
              of correct and incorrect questions as time progressed. This way
              you can find out when you were more focused and when you started
              to lose focus
            </p>
          </div>
          <Card classname="main_card p-3">
            <TableContainer>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>
                      <h6>Correct</h6>
                    </TableCell>
                    <TableCell>
                      <h6>Incorrect</h6>
                    </TableCell>
                    <TableCell>
                      <h6>Overall</h6>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <b>First 30 mins</b>
                    </TableCell>
                    <TableCell>7</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>12</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <b>Next 30 min </b>
                    </TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <b>Next 30 min </b>
                    </TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <b>Next 30 min </b>
                    </TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <b>Next 30 min </b>
                    </TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <b>Next 30 min </b>
                    </TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>2</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <TablePagination
                true
                rowsPerPageOptions={false}
                component="div"
                count={filterData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableContainer>
          </Card>

          {/* section Painful Questions        */}
          <section>
            <div className="text-center mt-4">
              <h4>Painful Questions</h4>
              <p>
                Ouch! Questions that were easy but you spent more than the
                allotted time on them.
              </p>
              <div>
                <h5>Physics</h5>
                <p>10 , 15 , 25</p>
                <h5>Chemistry</h5>
                <p>32 , 46</p>
                <h5>Mathematics</h5>
                <p>52 , 66 , 72 , 74</p>
              </div>
            </div>
          </section>

          <SubjectMovement />
          <MissedConcepts />
          <Analysis />

          {/* 
          <Dialog
            open={EditDailogOpen}
            onClose={() => setEditDailogOpen(!EditDailogOpen)}
            aria-labelledby="form-dialog-title"
            maxWidth="sm"
            fullWidth="fullWidth"
          >
            <DialogTitle>
              Update Car brands
              <span className="float-right icon_color"></span>
            </DialogTitle>
            <DialogContent>
              <div class="mb-3">
                <label for="formGroupExampleInput2" class="form-label"></label>
                <div class=" col-md-12">
                  <label for="inputPassword4">Update Car brands</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Car Brands"
                  />
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                className="button_formatting"
                onClick={() => setEditDailogOpen(!EditDailogOpen)}
              >
                Cancel
              </Button>
              <Button className="button_formatting">Submit</Button>
            </DialogActions>
          </Dialog> */}
        </div>
      </div>
    </>
  );
}
export default HOC(ReportCard);
