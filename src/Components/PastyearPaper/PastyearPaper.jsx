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

function PastyearPaper(props) {
  const [Expandbox, setExpandbox] = useState(false);
  const [isloading, setisloading] = useState("");
  const [isupdated, setisupdated] = useState("");
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [file, setfile] = useState(null);
  const [studyDataArry, setstudyDataArry] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    try {
      setisloading(true);
      let url = getBaseUrl() + "api/studymaterial/getallnocourse";
      axios.get(url).then(
        (res) => {
          setstudyDataArry(res.data.data);
          setisloading(false);
          console.log("getstudydata ", res);
        },
        (error) => {
          setisloading(false);
        }
      );
    } catch (error) {
      setisloading(false);
    }
  }, []);

  const addstudymaterial = () => {
    try {
      let url = getBaseUrl() + "api/studymaterial/add";
      setisloading(true);

      const fd = new FormData();

      fd.append("name", name);
      fd.append("description", description);

      //********* HERE IS THE CHANGE ***********

      fd.append("file", file);

      axios
        .post(url, fd)
        .then(
          (res) => {
            console.log("data studymaterial:::", res);
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
  const filterData = studyDataArry.filter((event) => {
    return event.name.toLowerCase().indexOf(titlename.toLowerCase()) !== -1;
  });

  const classes = useStyles();

  return (
    <>
      <div className="home_padding">
        <div className="content_padding">
          <Grid className="Component_main_grid mb-3">
            <Grid item md={9}>
              <h3 className="mb-2">Add Study Material</h3>
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
                  <div className="text_filed_heading">Add Name</div>
                  <div className=" mt-1 mr-2">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter name"
                      autoComplete="off"
                      value={name}
                      onChange={(e) => {
                        setname(e.target.value);
                      }}
                    />
                  </div>
                </Grid>
                <Grid item md={6} xs={12}>
                  <div className="text_filed_heading">Add Description</div>
                  <div className=" mt-1">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter Description"
                      autoComplete="off"
                      value={description}
                      onChange={(e) => {
                        setdescription(e.target.value);
                      }}
                    />
                  </div>
                </Grid>
              </Grid>

              <Grid className="Component_main_grid">
                <Grid item md={12} xs={12}>
                  {" "}
                  <div className="text_filed_heading">Add File</div>
                  <div className=" mt-1 mr-2">
                    <input
                      type="file"
                      className="form-control "
                      placeholder="Enter Type"
                      autoComplete="off"
                      onChange={(e) => {
                        setfile(e.target.files[0]);
                      }}
                    />
                  </div>
                </Grid>
              </Grid>

              <div className="mt-2 pb-3 ">
                <Button
                  variant="contained"
                  className="button_formatting"
                  onClick={addstudymaterial}
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
                    <TableCell>Description</TableCell>

                    <TableCell>Operations</TableCell>
                    <TableCell>Add More</TableCell>
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
                        <img src={getBaseUrl() + `${row.link}`} />
                      </TableCell>
                      <TableCell>{row.description}</TableCell>

                      <TableCell>{row.stream}</TableCell>
                      <TableCell>
                        <button
                          type="button"
                          class="btn btn-info mr-4"
                          onClick={() => setEditDailogOpen(!EditDailogOpen)}
                        >
                          <i class="fa fa-edit"></i>Edit
                        </button>
                        <button type="button" class="btn btn-info">
                          <i class="fa fa-trash pr-1"></i>Delete
                        </button>
                      </TableCell>
                      <TableCell
                        className="text-info addvedio"
                        // onClick={() => navigate("/ncert")}
                      >
                        Add Vedio
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
              Update Past Paper
              <span className="float-right icon_color"></span>
            </DialogTitle>
            <DialogContent>
              <Grid className="Component_main_grid">
                <Grid item md={6} xs={12}>
                  <div className="text_filed_heading">Add Title</div>
                  <div className=" mt-1 mr-2">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter Title"
                      autoComplete="off"
                    />
                  </div>
                </Grid>
                <Grid item md={6} xs={12}>
                  <div className="text_filed_heading">Select Year</div>
                  <div className=" mt-1">
                    <input
                      type="month"
                      className="form-control "
                      placeholder="Enter year"
                      autoComplete="off"
                    />
                  </div>
                </Grid>
              </Grid>

              <Grid className="Component_main_grid">
                <Grid item md={12} xs={12}>
                  {" "}
                  <div className="text_filed_heading">Add Paper</div>
                  <div className=" mt-1 mr-2">
                    <input
                      type="file"
                      className="form-control "
                      placeholder="Enter Type"
                      autoComplete="off"
                    />
                  </div>
                </Grid>
                {/* <Grid item md={12} xs={12}>
                  <div className="text_filed_heading">Add Description</div>
                  <div className=" mt-1">
                    <textarea
                      type="text"
                      className="form-control "
                      autoComplete="off"
                    />
                  </div>
                </Grid> */}
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
export default HOC(PastyearPaper);
