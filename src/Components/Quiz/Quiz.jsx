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

function Quiz(props) {
  const [Expandbox, setExpandbox] = useState(false);
  const [vedioidDataArry, setvedioidDataArry] = useState([]);
  const [isloading, setisloading] = useState(false);
  const [isupdated, setisupdated] = useState(false);
  const [QuizDataArry, setQuizDataArry] = useState([]);
  let navigate = useNavigate();

  //videoid
  useEffect(() => {
    window.scrollTo(0, 0);

    try {
      setisloading(true);
      let url = getBaseUrl() + "api/video_lectures/public/all";
      axios.get(url).then(
        (res) => {
          setvedioidDataArry(res.data.data);
          setisloading(false);
          console.log("getvideoiddata ", res);
        },
        (error) => {
          console.log("error ", error);
          setisloading(false);
        }
      );
    } catch (error) {
      console.log("error ", error);
      setisloading(false);
    }

    ///get quiz
    try {
      setisloading(true);
      let url = getBaseUrl() + "api/quizs/all";
      axios.get(url).then(
        (res) => {
          setQuizDataArry(res.data.data);
          setisloading(false);
          console.log("getquizddata ", res);
        },
        (error) => {
          console.log("error ", error);
          setisloading(false);
        }
      );
    } catch (error) {
      console.log("error ", error);
      setisloading(false);
    }
  }, [isupdated]);

  const [videoId, setvideoId] = useState("");
  const [title, settitle] = useState("");
  const [type, settype] = useState("");
  const [description, setdescription] = useState("");

  const addquiz = () => {
    try {
      let url = getBaseUrl() + "api/quizs/add";
      setisloading(true);

      let temp = {
        videoId,
        title,
        type,
        description,
      };
      axios
        .post(url, temp)
        .then(
          (res) => {
            console.log("data seriese:::", res);
            setisloading(false);
            navigate("/quiz");
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

  ///delect quiz

  const deletequiz = (row) => {
    let id = row._id;
    setisloading(true);
    let url = getBaseUrl() + `api/quizs/delete/${id}`;
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
  // const filterData = QuizDataArry.filter((event) => {
  //   return event.type.toLowerCase().indexOf(titlename.toLowerCase()) !== -1;
  // });

  const classes = useStyles();

  return (
    <>
      <div className="home_padding">
        <div className="content_padding">
          <Grid className="Component_main_grid mb-3">
            <Grid item md={9}>
              <h3 className="mb-2">Add Quiz</h3>
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
                  <div className="text_filed_heading mb-1">Select Vedio</div>

                  <div class="form-group mr-2">
                    <select
                      class="form-control"
                      value={videoId}
                      onChange={(e) => {
                        setvideoId(e.target.value);
                      }}
                    >
                      <option>Select ....</option>
                      {vedioidDataArry.map((row, index) => (
                        <option value={row._id}>{row.title}</option>
                      ))}
                    </select>
                  </div>
                </Grid>
                <Grid item md={6} xs={12}>
                  <div className="text_filed_heading">Add Title</div>
                  <div className=" mt-1">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter Title"
                      autoComplete="off"
                      value={title}
                      onChange={(e) => {
                        settitle(e.target.value);
                      }}
                    />
                  </div>
                </Grid>
              </Grid>

              <Grid className="Component_main_grid">
                <Grid item md={12} xs={12}>
                  <div className="text_filed_heading">Add Types</div>
                  <div className=" mt-1 mr-2">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter Type"
                      autoComplete="off"
                      value={type}
                      onChange={(e) => {
                        settype(e.target.value);
                      }}
                    />
                  </div>
                </Grid>
                <Grid item md={12} xs={12}>
                  <div className="text_filed_heading">Add Description</div>
                  <div className=" mt-1">
                    <textarea
                      type="text"
                      className="form-control "
                      autoComplete="off"
                      value={description}
                      onChange={(e) => {
                        setdescription(e.target.value);
                      }}
                    />
                  </div>
                </Grid>
              </Grid>

              <div className="mt-2 pb-3 ">
                <Button
                  variant="contained"
                  className="button_formatting"
                  onClick={addquiz}
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
                    <TableCell>Title</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Operations</TableCell>
                    <TableCell>Add Questions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? QuizDataArry.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : QuizDataArry
                  ).map((row) => (
                    <TableRow key={row.name}>
                      <TableCell>{row?.title}</TableCell>

                      <TableCell>{row?.type}</TableCell>
                      <TableCell>{row?.description}</TableCell>
                      <TableCell>
                        <button
                          type="button"
                          class="btn btn-info mr-4"
                          onClick={() => setEditDailogOpen(!EditDailogOpen)}
                        >
                          <i class="fa fa-edit"></i>Edit
                        </button>
                        <button
                          type="button"
                          class="btn btn-info"
                          onClick={() => deletequiz(row)}
                        >
                          <i class="fa fa-trash pr-1"></i>Delete
                        </button>
                      </TableCell>
                      <TableCell
                        className="text-info addvedio"
                        onClick={() => navigate("/assignment")}
                      >
                        Add Questions
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                true
                rowsPerPageOptions={false}
                component="div"
                count={QuizDataArry.length}
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
              Update Vedio
              <span className="float-right icon_color"></span>
            </DialogTitle>
            <DialogContent>
              <Grid className="Component_main_grid">
                <Grid item md={6} xs={12}>
                  <div className="text_filed_heading">Select Vedio</div>

                  <div class="form-group mr-2">
                    <select class="form-control">
                      <option>Select ....</option>

                      <option value="vedio">vedio</option>
                      <option value="vedio">vedio</option>
                      <option value="vedio">vedio</option>
                      <option value="vedio">vedio</option>
                    </select>
                  </div>
                </Grid>
                <Grid item md={6} xs={12}>
                  <div className="text_filed_heading">Add Title</div>
                  <div className=" mt-1">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter Title"
                      autoComplete="off"
                    />
                  </div>
                </Grid>
              </Grid>

              <Grid className="Component_main_grid">
                <Grid item md={12} xs={12}>
                  {" "}
                  <div className="text_filed_heading">Add Types</div>
                  <div className=" mt-1 mr-2">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter Type"
                      autoComplete="off"
                    />
                  </div>
                </Grid>
                <Grid item md={12} xs={12}>
                  <div className="text_filed_heading">Description</div>
                  <div className=" mt-1">
                    <textarea
                      type="text"
                      className="form-control "
                      autoComplete="off"
                    />
                  </div>
                </Grid>
              </Grid>
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
export default HOC(Quiz);
