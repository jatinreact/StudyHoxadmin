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
//Expand
import Expand from "react-expand-animated";
import Loder from "../Loder/Loder";
import { getBaseUrl } from "../utils";
import axios from "axios";
import { blankValidator, showNotificationMsz } from "../utils/Validation";

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

function Assignment(props) {
  const [Expandbox, setExpandbox] = useState(false);
  const [quizidArry, setquizidArry] = useState([]);
  const [isupdated, setisupdated] = useState(false);
  const [options, setoptions] = useState("");
  const [optionArr, setoptionArr] = useState([]);
  const [isloading, setisloading] = useState(false);
  const [quizId, setquizId] = useState("");
  const [question, setquestion] = useState("");
  const [answer, setanswer] = useState("");
  const [vedioArry, setvedioArry] = useState([]);
  const [title, settitle] = useState("");
  const [vedio, setvedio] = useState("");
  const [assignmentArry, setassignmentArry] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    try {
      setisloading(true);
      let url = getBaseUrl() + "api/quizs/public/all";
      axios.get(url).then(
        (res) => {
          setquizidArry(res.data.data);
          setisloading(false);
          console.log("quiziddata ", res);
        },
        (error) => {
          setisloading(false);
          console.log("error ", error);
        }
      );
    } catch (error) {
      setisloading(false);
      console.log("error ", error);
    }

    ////get assignment
    try {
      setisloading(true);
      let url = getBaseUrl() + "api/questions/all";
      axios.get(url).then(
        (res) => {
          setassignmentArry(res.data.data);
          setisloading(false);
          console.log("getassignment ", res);
        },
        (error) => {
          setisloading(false);
          console.log("error ", error);
        }
      );
    } catch (error) {
      setisloading(false);
      console.log("error ", error);
    }

    //get vedio
    try {
      let url = getBaseUrl() + "api/video_lectures/all";
      axios.get(url).then(
        (res) => {
          setvedioArry(res.data.data);

          console.log("quiziddata ", res);
        },
        (error) => {}
      );
    } catch (error) {}
  }, [isupdated]);

  ///addassignment
  const addassignment = () => {
    try {
      let url = getBaseUrl() + "api/quizs/add";
      setisloading(true);

      let temp = {
        title: title,
        videoId: vedio,
        quizId: quizId,
        question: question,
        answer: answer,
        options: optionArr,
      };
      axios
        .post(url, temp)
        .then(
          (res) => {
            console.log("data seriese:::", res);
            setisloading(false);
            // navigate("/quiz");
            setExpandbox(!Expandbox);
            setisupdated(!isupdated);
            showNotificationMsz(res.data.msg, "success");
          },

          (error) => {
            setisloading(false);
            console.log("data response error:::", error);
            showNotificationMsz(error, "danger");
          }
        )
        .catch((e) => {
          setisloading(false);
          console.log("data response error:::", e);
          showNotificationMsz(e, "danger");
        });
    } catch (error) {}
  };

  ///delect quizassignmengt

  const deleteassignment = (row) => {
    let id = row._id;
    setisloading(true);
    let url = getBaseUrl() + `api/questions/delete/${id}`;
    axios
      .delete(url)
      .then(
        (res) => {
          console.log("data delete:::", res);
          setisupdated(!isupdated);
          setisloading(false);
          showNotificationMsz(res.data.msg, "success");
        },

        (error) => {
          console.log("data response error:::", error);
          showNotificationMsz(error, "danger");
          setisloading(false);
        }
      )
      .catch((e) => {
        console.log("data response error:::", e);
        showNotificationMsz(e, "danger");
        setisloading(false);
      });
  };

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
  const filterData = assignmentArry.filter((event) => {
    return event.answer.toLowerCase().indexOf(titlename.toLowerCase()) !== -1;
  });

  const classes = useStyles();

  return (
    <>
      <div className="home_padding">
        <div className="content_padding">
          <Grid className="Component_main_grid mb-3">
            <Grid item md={9}>
              <h3 className="mb-2">Add Questions</h3>
              <button
                type="button"
                class="btn btn-info mr-4"
                onClick={() => setExpandbox(!Expandbox)}
              >
                <i class="fa fa-plus"></i> Create
              </button>

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
          <Expand open={Expandbox}>
            <Card className=" mb-2 Card_shadow p-3 mt-3">
              <div className="text-right">
                <span className="icon_color hover_cursor">
                  <i
                    className="fa fa-times cursor"
                    onClick={() => setExpandbox(!Expandbox)}
                  ></i>
                </span>
              </div>

              <Grid className="Component_main_grid">
                <Grid item md={6} xs={12}>
                  <div className="text_filed_heading">Select Quiz</div>
                  <div className=" mt-1 mr-2">
                    <div class="form-group mr-2">
                      <select
                        class="form-control"
                        value={quizId}
                        onChange={(e) => {
                          setquizId(e.target.value);
                        }}
                      >
                        <option>Select ....</option>
                        {quizidArry.map((row, index) => (
                          <option value={row._id}>{row.type}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </Grid>

                <Grid item md={6} xs={12}>
                  <div className="text_filed_heading">Select Vedio</div>
                  <div className=" mt-1 mr-2">
                    <div class="form-group mr-2">
                      <select
                        class="form-control"
                        value={vedio}
                        onChange={(e) => {
                          setvedio(e.target.value);
                        }}
                      >
                        <option>Select ....</option>
                        {quizidArry.map((row, index) => (
                          <option value={row._id}>{row.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </Grid>
              </Grid>
              <Grid className="Component_main_grid">
                <Grid item md={12} xs={12}>
                  {" "}
                  <div className="text_filed_heading">Add Question</div>
                  <div className=" mt-1">
                    <textarea
                      type="text"
                      className="form-control "
                      placeholder="Enter Question"
                      autoComplete="off"
                      value={question}
                      onChange={(e) => {
                        setquestion(e.target.value);
                      }}
                    />
                  </div>
                </Grid>
                <Grid item md={12} xs={12}>
                  {" "}
                  <div className="text_filed_heading">Add Title</div>
                  <div className=" mt-1">
                    <textarea
                      type="text"
                      className="form-control "
                      placeholder="Enter Question"
                      autoComplete="off"
                      value={title}
                      onChange={(e) => {
                        settitle(e.target.value);
                      }}
                    />
                  </div>
                </Grid>
                <Grid item md={12} xs={12}>
                  {" "}
                  <div className="text_filed_heading">Add Answer</div>
                  <div className=" mt-1">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter Answer"
                      autoComplete="off"
                      value={answer}
                      onChange={(e) => {
                        setanswer(e.target.value);
                      }}
                    />
                  </div>
                </Grid>
                <Grid className="Component_main_grid">
                  <Grid item md={10} xs={10}>
                    {" "}
                    <div className="text_filed_heading">Add Option</div>
                    <div className=" mt-1">
                      <input
                        type="text"
                        className="form-control "
                        placeholder="Enter Question"
                        autoComplete="off"
                        value={options}
                        onChange={(e) => {
                          setoptions(e.target.value);
                        }}
                      />
                    </div>
                  </Grid>
                  <Grid item md={2} xs={2}>
                    <Button
                      variant="contained"
                      className="button_formatting mt-4 ml-2"
                      onClick={() => {
                        optionArr.push({
                          option: options,
                        });
                        console.log("sgfdgsfd", optionArr);
                        setoptionArr([...optionArr]);
                        setoptions("");
                      }}
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <span className="d-flex formate_data">
                {optionArr.map((row, index) => (
                  <p>
                    {index + 1 + "."}
                    {row.option}
                  </p>
                ))}
              </span>
              <div className="mt-2 pb-3 ">
                <Button
                  variant="contained"
                  className="button_formatting"
                  onClick={addassignment}
                >
                  Create
                </Button>
              </div>
            </Card>
          </Expand>
          <Card classname="main_card p-3">
            <TableContainer>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Question</TableCell>
                    <TableCell>answer</TableCell>
                    <TableCell>Operations</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? filterData.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : filterData
                  ).map((row) => (
                    <TableRow key={row.name}>
                      <TableCell>{row.question}</TableCell>

                      <TableCell>{row.answer}</TableCell>
                      <TableCell>
                        {/* <button type="button" class="btn btn-info mr-4">
                          <i class="fa fa-user-plus pr-1"></i>Add
                        </button> */}
                        <button
                          type="button"
                          class="btn btn-info"
                          onClick={() => deleteassignment(row)}
                        >
                          <i class="fa fa-trash pr-1"></i>Delete
                        </button>
                      </TableCell>
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
          </Dialog>
        </div>
      </div>
      <Loder loading={isloading} />
    </>
  );
}
export default HOC(Assignment);
