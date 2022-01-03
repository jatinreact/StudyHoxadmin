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

function AddCourse(props) {
  const [teacherDataArry, setteacherDataArry] = useState([]);
  const [Expandbox, setExpandbox] = useState(false);
  const [isupdated, setisupdated] = useState(false);
  const [isloading, setisloading] = useState(false);
  // const [radiovalue, setradiovalue] = useState("Free");

  const [teachername, setteachername] = useState("");
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");
  const [rating, setrating] = useState("");
  const [years, setyears] = useState("");
  const [images, setimages] = useState(null);
  const [courseDataArry, setcourseDataArry] = useState([]);
  const [subjectDataArry, setsubjectDataArry] = useState([]);
  //error
  const [teachernameError, setteachernameError] = useState(false);
  const [nameError, setnameError] = useState(false);
  const [priceError, setpriceError] = useState(false);
  const [descriptionError, setdescriptionError] = useState(false);
  const [ratingError, setratingError] = useState(false);
  const [yearsError, setyearsError] = useState(false);
  const [imagesError, setimagesError] = useState(null);

  let navigate = useNavigate();

  // handle click  for radio button
  // const radioHandler = (event) => {
  //   setradiovalue(event.target.value);
  // };
  // const [nameEdit, setnameEdit] = useState("");
  // const [priceEdit, setpriceEdit] = useState("");
  // const [descriptionEdit, setdescriptionEdit] = useState("");
  // const [ratingEdit, setratingEdit] = useState("");
  // const [yearsEdit, setyearsEdit] = useState("");
  // const [EditId, setEditId] = useState("");

  // const updatecourse = (row) => {
  //   setEditDailogOpen(!EditDailogOpen);
  //   setnameEdit(row.name);
  //   setpriceEdit(row.price);
  //   setdescriptionEdit(row.description);
  //   setratingEdit(row.rating);
  //   setyearsEdit(row._id);
  // };

  ///get subject
  useEffect(() => {
    window.scrollTo(0, 0);
    try {
      setisloading(true);
      let url = getBaseUrl() + "api/subject/all";
      axios.get(url).then(
        (res) => {
          setsubjectDataArry(res.data.data);
          setisloading(false);
          console.log("getsubject ", res);
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

    try {
      setisloading(true);
      let url = getBaseUrl() + "api/teachers/all";
      axios.get(url).then(
        (res) => {
          setteacherDataArry(res.data.data);
          setisloading(false);
          console.log("teachergetdata ", res);
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

    ////get datacourse
  }, []);

  useEffect(() => {
    try {
      setisloading(true);
      let url = getBaseUrl() + "api/courses/all";
      axios.get(url).then(
        (res) => {
          setcourseDataArry(res.data.data);
          setisloading(false);
          console.log("coursedata ", res);
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

  ////add course

  const addcourses = () => {
    if (!blankValidator(teachername)) {
      setteachernameError(true);
      return;
    }
    if (!blankValidator(name)) {
      setnameError(true);
      return;
    }
    if (!blankValidator(price)) {
      setpriceError(true);
      return;
    }

    if (!blankValidator(rating)) {
      setratingError(true);
      return;
    }
    if (!blankValidator(images)) {
      setimagesError(true);
      return;
    }
    if (!blankValidator(years)) {
      setyearsError(true);
      return;
    }
    if (!blankValidator(description)) {
      setdescriptionError(true);
      return;
    }
    setisloading(true);
    let url = getBaseUrl() + "api/courses/add";
    console.log("data response add course:::", url);
    const fd = new FormData();

    fd.append("teacherId", teachername);
    fd.append("name", name);
    fd.append("price", price);
    fd.append("description", description);
    fd.append("rating", rating);
    fd.append("years", years);

    //********* HERE IS THE CHANGE ***********

    fd.append("image", images);

    axios
      .post(url, fd)
      .then(
        (res) => {
          console.log("add courses:::", res);
          setteachername("");
          setname("");
          setprice("");
          setdescription("");
          setrating("");
          setyears("");
          setimages("");
          setisupdated(!isupdated);
          setisloading(false);
        },

        (error) => {
          console.log("add courses:::", error);
          setisloading(false);
        }
      )
      .catch((e) => {
        console.log("add courses:::", e);
        setisloading(false);
      });
  };

  ///delect course

  const deletecourse = (row) => {
    let id = row._id;
    setisloading(true);
    let url = getBaseUrl() + `api/courses/delete/${id}`;
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
  const filterData = courseDataArry.filter((event) => {
    return event.name.toLowerCase().indexOf(titlename.toLowerCase()) !== -1;
  });

  const classes = useStyles();

  return (
    <>
      <div className="home_padding">
        <div className="content_padding">
          <Grid className="Component_main_grid mb-3">
            <Grid item md={9}>
              <h3 className="mb-2">Add Course</h3>
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

              {/* <Grid className="Component_main_grid">
                <Grid item md={12} xs={12}>
                  <div className="d-flex">
                    <div class="form-check pr-3 mb-3">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        checked={radiovalue === "Free"}
                        value="Free"
                        onChange={(e) => radioHandler(e)}
                      />
                      <label class="form-check-label" for="flexRadioDefault1">
                        Free Course
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        checked
                        checked={radiovalue === "Paid"}
                        value="Paid"
                        onChange={(e) => radioHandler(e)}
                      />
                      <label class="form-check-label" for="flexRadioDefault2">
                        Paid Course
                      </label>
                    </div>
                  </div>
                </Grid>
              </Grid> */}

              <Grid className="Component_main_grid">
                <Grid item md={6} xs={12}>
                  <div className="text_filed_heading">Select Teacher</div>
                  <div className=" mt-1 mr-2">
                    <div class="form-group mr-2">
                      <select
                        class="form-control"
                        value={teachername}
                        onChange={(e) => {
                          setteachernameError(false);
                          setteachername(e.target.value);
                        }}
                      >
                        <option>Select ....</option>
                        {teacherDataArry.map((row, index) => (
                          <option value={row._id}>
                            {row.fname} {row.lname}
                          </option>
                        ))}
                      </select>
                      {teachernameError && (
                        <span className="text-danger">Select Teacher Name</span>
                      )}
                    </div>
                  </div>
                </Grid>
                <Grid item md={6} xs={12}>
                  {/* <div className="text_filed_heading">Select Subject</div>
                  <div className=" mt-1 mr-2">
                    <div class="form-group mr-2">
                      <select
                        class="form-control"
                        value={name}
                        onChange={(e) => {
                          setnameError(false);
                          setname(e.target.value);
                        }}
                      >
                        <option>Select ....</option>
                        {subjectDataArry.map((row, index) => (
                          <option value={row._id}>
                            {row.fname} {row.sname}
                          </option>
                        ))}
                      </select>{" "}
                      {nameError && (
                        <span className="text-danger">Select Name</span>
                      )}
                    </div>
                  </div> */}
                  <div className="text_filed_heading">Enter Name</div>
                  <div className=" mt-1 mr-2">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter Name"
                      autoComplete="off"
                      value={name}
                      onChange={(e) => {
                        setnameError(false);
                        setname(e.target.value);
                      }}
                    />{" "}
                    {nameError && (
                      <span className="text-danger">Select Name</span>
                    )}
                  </div>
                </Grid>
              </Grid>

              <Grid className="Component_main_grid">
                <Grid item md={6} xs={12}>
                  <div className="text_filed_heading">Add Price</div>
                  <div className=" mt-1 mr-2">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter Price"
                      autoComplete="off"
                      value={price}
                      onChange={(e) => {
                        setprice(e.target.value);
                        setpriceError(false);
                      }}
                    />{" "}
                    {priceError && (
                      <span className="text-danger">Enter Price</span>
                    )}
                  </div>
                  {/* {radiovalue === "Free" ? (
                    ""
                  ) : ( */}
                  {/* <div>
                    <div className="text_filed_heading">Price(in Rs.)</div>
                    <div className=" mt-1 mr-2">
                      <input
                        type="text"
                        className="form-control "
                        placeholder="Enter Price"
                        autoComplete="off"
                      />
                    </div>
                  </div> */}
                  {/* )} */}
                </Grid>
                <Grid item md={6} xs={12}>
                  {" "}
                  <div className="text_filed_heading">Add Rating</div>
                  <div className=" mt-1 ">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter Rating"
                      autoComplete="off"
                      value={rating}
                      onChange={(e) => {
                        setrating(e.target.value);
                        setratingError(false);
                      }}
                    />
                    {ratingError && (
                      <span className="text-danger">Enter Rating</span>
                    )}
                  </div>
                </Grid>
              </Grid>

              <Grid className="Component_main_grid">
                <Grid item md={6} xs={12}>
                  <div className="text_filed_heading">Select Images</div>
                  <div className=" mt-1 mr-2">
                    <input
                      type="file"
                      className="form-control "
                      placeholder="Enter Years"
                      autoComplete="off"
                      onChange={(e) => {
                        setimages(e.target.files[0]);
                        setimagesError(false);
                      }}
                    />
                    {imagesError && (
                      <span className="text-danger">Select image</span>
                    )}
                  </div>
                </Grid>
                <Grid item md={6} xs={12}>
                  <div className="text_filed_heading">Add Years</div>
                  <div className=" mt-1">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter Years"
                      autoComplete="off"
                      value={years}
                      onChange={(e) => {
                        setyears(e.target.value);
                        setyearsError(false);
                      }}
                    />{" "}
                    {yearsError && (
                      <span className="text-danger">Enter Year</span>
                    )}
                  </div>
                </Grid>
              </Grid>
              <div className="text_filed_heading mt-2">Add Description</div>
              <div className=" mt-1">
                <textarea
                  row="3"
                  type="text"
                  className="form-control "
                  placeholder="Add Description"
                  autoComplete="off"
                  value={description}
                  onChange={(e) => {
                    setdescription(e.target.value);
                    setdescriptionError(false);
                  }}
                />
                {descriptionError && (
                  <span className="text-danger">Add Description</span>
                )}
              </div>

              <div className="mt-2 pb-3 ">
                <Button
                  variant="contained"
                  className="button_formatting"
                  onClick={addcourses}
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
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>price</TableCell>
                    <TableCell>Rating</TableCell>

                    <TableCell>Operations</TableCell>
                    <TableCell>Add Video</TableCell>
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
                        <img
                          src={getBaseUrl() + `${row.image.url}`}
                          style={{ height: "70px", width: "70px" }}
                        />
                      </TableCell>
                      <TableCell>{row.name}</TableCell>

                      <TableCell>{row.price}</TableCell>
                      <TableCell>{row.rating}</TableCell>
                      <TableCell>
                        <button
                          type="button"
                          class="btn btn-info mr-4"
                          // onClick={() => updatecourse(row)}
                        >
                          <i class="fa fa-edit"></i>Edit
                        </button>
                        <button
                          type="button"
                          class="btn btn-info"
                          onClick={() => deletecourse(row)}
                        >
                          <i class="fa fa-trash pr-1"></i>Delete
                        </button>
                      </TableCell>
                      <TableCell
                        className="text-info addvedio"
                        onClick={() => navigate("/vedio")}
                      >
                        Add Vedio
                      </TableCell>
                      <TableCell
                        className="text-info addvedio"
                        onClick={() =>
                          navigate("/coursematerial", {
                            state: {
                              data: row,
                            },
                          })
                        }
                      >
                        Add Study Material
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
            aria-labelledby="form-dialog-title"
            maxWidth="sm"
            fullWidth="fullWidth"
          >
            <DialogTitle>
              Update Course
              <span className="float-right icon_color"></span>
            </DialogTitle>
            <DialogContent>
              <div className="text-right">
                {/* <span className="icon_color hover_cursor">
                  <i
                    className="fa fa-times cursor"
                    onClose={() => setEditDailogOpen(!EditDailogOpen)}
                  ></i>
                </span> */}
              </div>
              <Grid className="Component_main_grid">
                <Grid item md={6} xs={12}>
                  <div className="text_filed_heading">Add TeacherId</div>
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
                  <div className="text_filed_heading">Add Name</div>
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
                  <div className="text_filed_heading">Add Price</div>
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
                  <div className="text_filed_heading">Add Rating</div>
                  <div className=" mt-1">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter Rating"
                      autoComplete="off"
                    />
                  </div>
                </Grid>
              </Grid>

              <Grid className="Component_main_grid">
                <Grid item md={12} xs={12}>
                  {" "}
                  <div className="text_filed_heading">Add Years</div>
                  <div className=" mt-1">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter Years"
                      autoComplete="off"
                    />
                  </div>
                </Grid>
              </Grid>
              <div className="text_filed_heading mt-2">Add Description</div>
              <div className=" mt-1">
                <textarea
                  row="3"
                  type="text"
                  className="form-control "
                  placeholder="Add Description"
                  autoComplete="off"
                />
              </div>

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
export default HOC(AddCourse);
