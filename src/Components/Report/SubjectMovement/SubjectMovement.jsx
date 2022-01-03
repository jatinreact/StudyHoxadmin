import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { Card, Grid } from "@material-ui/core";
//pagination
import TablePagination from "@material-ui/core/TablePagination";
import { useNavigate } from "react-router-dom";
//dialog vox
import Button from "@material-ui/core/Button";

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

function SubjectMovement(props) {
  let navigate = useNavigate();
  const arry = [
    {
      name: "Physics",
      time: "3 sec",
    },
    {
      name: "Maths",
      time: "3 sec",
    },
    {
      name: "Physics",
      time: "3 sec",
    },
    {
      name: "Physics",
      time: "3 sec",
    },
    {
      name: "Chemistry",
      time: "3 sec",
    },
    {
      name: "Maths",
      time: "3 sec",
    },
    {
      name: "Physics",
      time: "3 sec",
    },
    {
      name: "Chemistry",
      time: "3 sec",
    },
    {
      name: "Maths",
      time: "3 sec",
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
  const filterData = arry.filter((event) => {
    return event.name.toLowerCase().indexOf(titlename.toLowerCase()) !== -1;
  });

  const classes = useStyles();

  return (
    <>
      <div className="home_padding">
        <div className="content_padding">
          <div className="text-center">
            <h4>Subject Movement</h4>

            <p>
              This section will tell you how you traversed each subject at what
              time duration. This will help you manage your time better by
              checking the number of shifts you made between the subjects and
              time spent between these switches.
            </p>
          </div>
          <Card classname="main_card p-3">
            <TableContainer>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Order</TableCell>
                    <TableCell>Time Spent</TableCell>
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
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.time}</TableCell>
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
    </>
  );
}
export default SubjectMovement;
