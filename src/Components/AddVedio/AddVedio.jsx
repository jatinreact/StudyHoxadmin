import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import HOC from "../../Common/HOC";
import { Card, fade, Grid } from "@material-ui/core";
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

function AddVedio(props) {
  const [Expandbox, setExpandbox] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [isupdated, setisupdated] = useState(false);
  const [courseDataArry, setcourseDataArry] = useState([]);
  const [vedioDataArry, setvedioDataArry] = useState([]);
  const [courseid, setcourseid] = useState("");
  const [title, settitle] = useState("");
  const [types, settypes] = useState("");
  const [video, setvideo] = useState(null);
  const [EditDailogOpen, setEditDailogOpen] = useState("");

  let navigate = useNavigate();

  //courseid
  useEffect(() => {
    window.scrollTo(0, 0);

    try {
      setisloading(true);
      let url = getBaseUrl() + "api/courses/all";
      axios.get(url).then(
        (res) => {
          setcourseDataArry(res.data.data);
          setisloading(false);
          console.log("getcourseiddata ", res);
        },
        (error) => {
          setisloading(false);
        }
      );
    } catch (error) {
      setisloading(false);
    }

    ///get vedio
    try {
      setisloading(true);
      let url = getBaseUrl() + "api/video_lectures/all";
      axios.get(url).then(
        (res) => {
          setvedioDataArry(res.data.data);
          setisloading(false);
          console.log("getvideodata ", res);
        },
        (error) => {
          setisloading(false);
        }
      );
    } catch (error) {
      setisloading(false);
    }
  }, [isupdated]);

  const addvedio = () => {
    try {
      let url = getBaseUrl() + "api/video_lectures/add";
      setisloading(true);

      const fd = new FormData();

      fd.append("courseId", courseid);
      fd.append("title", title);
      fd.append("types", types);

      //********* HERE IS THE CHANGE ***********

      fd.append("video", video);

      axios
        .post(url, fd)
        .then(
          (res) => {
            console.log("data seriese:::", res);
            setisloading(false);

            setisupdated(!isupdated);
            showNotificationMsz(res.data.msg, "success");
            setisloading(false);
          },

          (error) => {
            setisloading(false);
            console.log("data response error:::", error);
            showNotificationMsz(error, "danger");
            setisloading(false);
          }
        )
        .catch((e) => {
          setisloading(false);
          console.log("data response error:::", e);
          showNotificationMsz(e, "danger");
          setisloading(false);
        });
    } catch (error) {
      setisloading(false);
    }
  };

  ///delect vedio

  const deletevedio = (row) => {
    let id = row._id;
    setisloading(true);
    let url = getBaseUrl() + `api/video_lectures/delete/${id}`;
    axios
      .delete(url)
      .then(
        (res) => {
          console.log("data delete:::", res);
          setisupdated(!isupdated);
          showNotificationMsz(res.data.msg, "success");
          setisloading(false);
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
  const filterData = vedioDataArry.filter((event) => {
    return event.title.toLowerCase().indexOf(titlename.toLowerCase()) !== -1;
  });

  const classes = useStyles();

  return (
    <>
      <div className="home_padding">
        <div className="content_padding">
          <Grid className="Component_main_grid mb-3">
            <Grid item md={9}>
              <h3 className="mb-2">Add Video</h3>
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
                  <div className="text_filed_heading">Select Course</div>
                  <div className=" mt-1 mr-2">
                    <div class="form-group mr-2">
                      <select
                        class="form-control"
                        value={courseid}
                        onChange={(e) => {
                          setcourseid(e.target.value);
                        }}
                      >
                        {" "}
                        <option>Select ....</option>
                        {courseDataArry.map((row, index) => (
                          <option value={row._id}>{row.name}</option>
                        ))}
                      </select>
                    </div>
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
                <Grid item md={6} xs={12}>
                  {" "}
                  <div className="text_filed_heading">Add Types</div>
                  <div className=" mt-1 mr-2">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter Type"
                      autoComplete="off"
                      value={types}
                      onChange={(e) => {
                        settypes(e.target.value);
                      }}
                    />
                  </div>
                </Grid>
                <Grid item md={6} xs={12}>
                  <div className="text_filed_heading">Add Vedio</div>
                  <div className=" mt-1">
                    <input
                      type="file"
                      accept="video/*"
                      className="form-control "
                      autoComplete="off"
                      onChange={(e) => setvideo(e.target.files[0])}
                    />
                  </div>
                </Grid>
              </Grid>

              <div className="mt-2 pb-3 ">
                <Button
                  variant="contained"
                  className="button_formatting"
                  onClick={addvedio}
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
                    <TableCell>Vedio</TableCell>

                    <TableCell>Title</TableCell>
                    {/* <TableCell>Types</TableCell> */}
                    <TableCell>Operations</TableCell>
                    <TableCell>Add Quiz</TableCell>
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
                      <TableCell>
                        <video width="220" height="140" controls>
                          <source
                            src={getBaseUrl() + row.link}
                            accept="video/*"
                          />
                        </video>
                      </TableCell>

                      <TableCell>{row.title}</TableCell>

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
                          onClick={() => deletevedio(row)}
                        >
                          <i class="fa fa-trash pr-1"></i>Delete
                        </button>
                      </TableCell>
                      <TableCell
                        className="text-info addvedio"
                        onClick={() => navigate("/quiz")}
                      >
                        Add Quiz
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
              <Grid className="Component_main_grid">
                <Grid item md={6} xs={12}>
                  <div className="text_filed_heading">Add CourseId</div>
                  <div className=" mt-1 mr-2">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter TeacherId"
                      autoComplete="off"
                    />
                  </div>
                </Grid>
                <Grid item md={6} xs={12}>
                  <div className="text_filed_heading">Add Title</div>
                  <div className=" mt-1">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter Name"
                      autoComplete="off"
                    />
                  </div>
                </Grid>
              </Grid>

              <Grid className="Component_main_grid">
                <Grid item md={6} xs={12}>
                  {" "}
                  <div className="text_filed_heading">Add Types</div>
                  <div className=" mt-1 mr-2">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter Price"
                      autoComplete="off"
                    />
                  </div>
                </Grid>
                <Grid item md={6} xs={12}>
                  {" "}
                  <div className="text_filed_heading">Add Vedio</div>
                  <div className=" mt-1">
                    <input
                      type="file"
                      className="form-control "
                      autoComplete="off"
                    />
                  </div>
                </Grid>
              </Grid>

              <div className="mt-2 pb-3 ">
                <Button variant="contained" className="button_formatting">
                  Create
                </Button>
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
export default HOC(AddVedio);
