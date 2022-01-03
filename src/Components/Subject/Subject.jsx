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

function Addteachers(props) {
  const [Expandbox, setExpandbox] = useState(false);
  const [EditDailogOpen, setEditDailogOpen] = useState("");
  const [isloading, setisloading] = useState(false);
  const [subjectDataArry, setsubjectDataArry] = useState([]);
  const [isupdated, setisupdated] = useState(false);
  const [subject, setsubject] = useState("");

  //edit subject
  const [subjectEdit, setsubjectEdit] = useState("");
  const [EditId, setEditId] = useState("");
  const Editsubject = (row) => {
    setEditDailogOpen(!EditDailogOpen);
    setsubjectEdit(row.sname);
    setEditId(row._id);
  };

  ///edit subject

  const editsubject = (ID) => {
    let id = ID;

    let url = getBaseUrl() + `api/subject/update/${id}`;
    let temp = {
      sname: subjectEdit,
    };
    axios
      .patch(url, temp)
      .then(
        (res) => {
          console.log("edit subject:::", res);
          setisupdated(!isupdated);
          setEditDailogOpen(!EditDailogOpen);
          showNotificationMsz(res.data.msg, "success");
        },

        (error) => {
          console.log("data response error:::", error);
          showNotificationMsz(error, "danger");
        }
      )
      .catch((e) => {
        console.log("data response error:::", e);
        showNotificationMsz(e, "danger");
      });
  };

  let navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    try {
      let url = getBaseUrl() + "api/subject/all";
      axios.get(url).then(
        (res) => {
          setsubjectDataArry(res.data.data);

          console.log("getsubject ", res);
        },
        (error) => {}
      );
    } catch (error) {}
  }, [isupdated]);

  ///delete
  const deletesubject = (row) => {
    let id = row._id;

    let url = getBaseUrl() + `api/subject/delete/${id}`;
    axios
      .delete(url)
      .then(
        (res) => {
          console.log("data response:::", res);
          setisupdated(!isupdated);
          showNotificationMsz(res.data.msg, "success");
        },

        (error) => {
          console.log("data response error:::", error);
          showNotificationMsz(error, "danger");
        }
      )
      .catch((e) => {
        console.log("data response error:::", e);
        showNotificationMsz(e, "danger");
      });
  };

  const addsubject = () => {
    try {
      let url = getBaseUrl() + "api/subject/add";
      setisloading(true);

      let temp = {
        sname: subject,
      };
      axios
        .post(url, temp)
        .then(
          (res) => {
            console.log("data seriese:::", res);
            setisloading(false);
            // navigate("/home");
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
  const filterData = subjectDataArry.filter((event) => {
    return event.sname.toLowerCase().indexOf(titlename.toLowerCase()) !== -1;
  });

  const classes = useStyles();

  return (
    <>
      <div className="home_padding">
        <div className="content_padding">
          <Grid className="Component_main_grid mb-3">
            <Grid item md={9}>
              <h3 className="mb-2">Add Subject</h3>
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
                <Grid item md={12} xs={12}>
                  <div className="text_filed_heading">Subject Name</div>
                  <div className=" mt-1 mr-2">
                    <input
                      type="text"
                      className="form-control "
                      placeholder="Enter Subject Name"
                      autoComplete="off"
                      value={subject}
                      onChange={(e) => {
                        setsubject(e.target.value);
                      }}
                    />{" "}
                  </div>
                </Grid>
              </Grid>

              <div className="mt-2 pb-3 ">
                <Button
                  variant="contained"
                  className="button_formatting"
                  onClick={addsubject}
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
                    <TableCell>Name</TableCell>

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
                  ).map((row, index) => (
                    <TableRow key={row.name}>
                      <TableCell>{row.sname}</TableCell>

                      <TableCell>
                        <button
                          type="button"
                          class="btn btn-info mr-4"
                          // onClick={() => setEditDailogOpen(!EditDailogOpen)}
                          onClick={() => Editsubject(row)}
                        >
                          <i class="fa fa-edit"></i>Edit
                        </button>
                        <button
                          type="button"
                          class="btn btn-info"
                          onClick={() => deletesubject(row)}
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
              Update Subject Name
              <span className="float-right icon_color"></span>
            </DialogTitle>
            <DialogContent>
              <div className="text_filed_heading">Subject Name</div>
              <div className=" mt-1 mr-2">
                <input
                  type="text"
                  className="form-control "
                  placeholder="Enter Name"
                  autoComplete="off"
                  value={subjectEdit}
                  onChange={(e) => {
                    setsubjectEdit(e.target.value);
                  }}
                />{" "}
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                className="button_formatting"
                onClick={() => setEditDailogOpen(!EditDailogOpen)}
              >
                Cancel
              </Button>
              <Button
                className="button_formatting"
                onClick={() => editsubject(EditId)}
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      <Loder loading={isloading} />
    </>
  );
}
export default HOC(Addteachers);
