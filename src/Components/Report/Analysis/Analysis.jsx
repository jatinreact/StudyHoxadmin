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

function Analysis() {
  let navigate = useNavigate();

  const arry = [
    {
      chapter: "Fluid Mechanics",
      Concept: "Escape Velocity",
      Difficulty: "Moderate",
      Alloted: "2 min",
      Spent: "2 min 23 s",
      Attempted: "Yes",
      Answer: "Incorrect",
      Overview: "Overtimed",
    },
    {
      chapter: "Fluid Mechanics",
      Concept: "Escape Velocity",
      Difficulty: "Moderate",
      Alloted: "2 min",
      Spent: "2 min 23 s",
      Attempted: "Yes",
      Answer: "Incorrect",
      Overview: "Overtimed",
    },
    {
      chapter: "Fluid Mechanics",
      Concept: "Escape Velocity",
      Difficulty: "Moderate",
      Alloted: "2 min",
      Spent: "2 min 23 s",
      Attempted: "Yes",
      Answer: "Incorrect",
      Overview: "Overtimed",
    },
    {
      chapter: "Fluid Mechanics",
      Concept: "Escape Velocity",
      Difficulty: "Moderate",
      Alloted: "2 min",
      Spent: "2 min 23 s",
      Attempted: "Yes",
      Answer: "Incorrect",
      Overview: "Overtimed",
    },
    {
      chapter: "Fluid Mechanics",
      Concept: "Escape Velocity",
      Difficulty: "Moderate",
      Alloted: "2 min",
      Spent: "2 min 23 s",
      Attempted: "Yes",
      Answer: "Incorrect",
      Overview: "Overtimed",
    },
    {
      chapter: "Fluid Mechanics",
      Concept: "Escape Velocity",
      Difficulty: "Moderate",
      Alloted: "2 min",
      Spent: "2 min 23 s",
      Attempted: "Yes",
      Answer: "Incorrect",
      Overview: "Overtimed",
    },
    {
      chapter: "Fluid Mechanics",
      Concept: "Escape Velocity",
      Difficulty: "Moderate",
      Alloted: "2 min",
      Spent: "2 min 23 s",
      Attempted: "Yes",
      Answer: "Incorrect",
      Overview: "Overtimed",
    },
    {
      chapter: "Fluid Mechanics",
      Concept: "Escape Velocity",
      Difficulty: "Moderate",
      Alloted: "2 min",
      Spent: "2 min 23 s",
      Attempted: "Yes",
      Answer: "Incorrect",
      Overview: "Overtimed",
    },
  ];

  const chemistry = [
    {
      chapter: "Chemical Bonding",
      Concept: "Pi Bonding",
      Difficulty: "Easy",
      Alloted: "1 min",
      Spent: "3 min 43s",
      Attempted: "Yes",
      Answer: "Correct",
      Overview: "Overtimed",
    },
    {
      chapter: "d and f Block Elements",
      Concept: "Paramagnetism",
      Difficulty: "Moderate",
      Alloted: "2 min",
      Spent: "2 min 28s",
      Attempted: "Yes",
      Answer: "Incorrect",
      Overview: "Overtimed",
    },
    {
      chapter: "Chemical Bonding",
      Concept: "Pi Bonding",
      Difficulty: "Easy",
      Alloted: "1 min",
      Spent: "3 min 43s",
      Attempted: "Yes",
      Answer: "Correct",
      Overview: "Overtimed",
    },
    {
      chapter: "Chemical Bonding",
      Concept: "Pi Bonding",
      Difficulty: "Easy",
      Alloted: "1 min",
      Spent: "3 min 43s",
      Attempted: "Yes",
      Answer: "Correct",
      Overview: "Overtimed",
    },
    {
      chapter: "Chemical Bonding",
      Concept: "Pi Bonding",
      Difficulty: "Easy",
      Alloted: "1 min",
      Spent: "3 min 43s",
      Attempted: "Yes",
      Answer: "Correct",
      Overview: "Overtimed",
    },
  ];

  const maths = [
    {
      chapter: "Complex Numbers",
      Concept: "Algebra of Complex Numbers",
      Difficulty: "Easy",
      Alloted: "1 min 30",
      Spent: "1 min 42s",
      Attempted: "Yes",
      Answer: "Correct",
      Overview: "Overtimed",
    },
    {
      chapter: "52 Indefinite Integration ",
      Concept: "Integration of Trigonometric Functions",
      Difficulty: "Easy",
      Alloted: "1 min 30",
      Spent: "1 min 42s",
      Attempted: "Yes",
      Answer: "Correct",
      Overview: "Overtimed",
    },
    {
      chapter: "Inverse Trigonometric Functions ",
      Concept: "Integration of Trigonometric Functions",
      Difficulty: "Easy",
      Alloted: "1 min 30",
      Spent: "1 min 42s",
      Attempted: "Yes",
      Answer: "Correct",
      Overview: "Overtimed",
    },
    {
      chapter: "Inverse Trigonometric Functions ",
      Concept: "Integration of Trigonometric Functions",
      Difficulty: "Easy",
      Alloted: "1 min 30",
      Spent: "1 min 42s",
      Attempted: "Yes",
      Answer: "Correct",
      Overview: "Overtimed",
    },
    {
      chapter: "Inverse Trigonometric Functions ",
      Concept: "Integration of Trigonometric Functions",
      Difficulty: "Easy",
      Alloted: "1 min 30",
      Spent: "1 min 42s",
      Attempted: "Yes",
      Answer: "Correct",
      Overview: "Overtimed",
    },
    {
      chapter: "Inverse Trigonometric Functions ",
      Concept: "Integration of Trigonometric Functions",
      Difficulty: "Easy",
      Alloted: "1 min 30",
      Spent: "1 min 42s",
      Attempted: "Yes",
      Answer: "Correct",
      Overview: "Overtimed",
    },
  ];
  //   useEffect(() => {
  //     window.scrollTo(0, 0);
  //   }, []);

  const classes = useStyles();

  return (
    <>
      <div className="home_padding">
        <div className="content_padding">
          <div className="text-center mt-4">
            <h4>Physics Analysis</h4>
          </div>
          <Card classname="main_card p-3">
            <TableContainer>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <h5>Chapter</h5>
                    </TableCell>
                    <TableCell>
                      <h5>Concept</h5>
                    </TableCell>
                    <TableCell>
                      <h5>Difficulty</h5>
                    </TableCell>
                    <TableCell>
                      <h5>Alloted</h5>
                    </TableCell>
                    <TableCell>
                      <h5>Spent</h5>
                    </TableCell>
                    <TableCell>
                      <h5>Attempted</h5>
                    </TableCell>
                    <TableCell>
                      <h5>Answer</h5>
                    </TableCell>
                    <TableCell>
                      <h5>Overview</h5>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {arry.map((row, index) => (
                    <TableRow key={row.name}>
                      <TableCell>{row.chapter}</TableCell>
                      <TableCell>{row.Concept}</TableCell>
                      <TableCell>{row.Difficulty}</TableCell>
                      <TableCell>{row.Alloted}</TableCell>
                      <TableCell>{row.Attempted}</TableCell>
                      <TableCell>{row.Answer}</TableCell>
                      <TableCell>{row.Overview}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
          {/* section Chemistry */}
          <div className="text-center mt-4">
            <h4>Chemistry Analysis</h4>
          </div>
          <Card classname="main_card p-3">
            <TableContainer>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <h5>Chapter</h5>
                    </TableCell>
                    <TableCell>
                      <h5>Concept</h5>
                    </TableCell>
                    <TableCell>
                      <h5>Difficulty</h5>
                    </TableCell>
                    <TableCell>
                      <h5>Alloted</h5>
                    </TableCell>
                    <TableCell>
                      <h5>Spent</h5>
                    </TableCell>
                    <TableCell>
                      <h5>Attempted</h5>
                    </TableCell>
                    <TableCell>
                      <h5>Answer</h5>
                    </TableCell>
                    <TableCell>
                      <h5>Overview</h5>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {chemistry.map((row, index) => (
                    <TableRow key={row.name}>
                      <TableCell>{row.chapter}</TableCell>
                      <TableCell>{row.Concept}</TableCell>
                      <TableCell>{row.Difficulty}</TableCell>
                      <TableCell>{row.Alloted}</TableCell>
                      <TableCell>{row.Attempted}</TableCell>
                      <TableCell>{row.Answer}</TableCell>
                      <TableCell>{row.Overview}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>

          {/* maths section */}

          <div className="text-center mt-4">
            <h4>Mathematics Analysis</h4>
          </div>
          <Card classname="main_card p-3">
            <TableContainer>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <h5>Chapter</h5>
                    </TableCell>
                    <TableCell>
                      <h5>Concept</h5>
                    </TableCell>
                    <TableCell>
                      <h5>Difficulty</h5>
                    </TableCell>
                    <TableCell>
                      <h5>Alloted</h5>
                    </TableCell>
                    <TableCell>
                      <h5>Spent</h5>
                    </TableCell>
                    <TableCell>
                      <h5>Attempted</h5>
                    </TableCell>
                    <TableCell>
                      <h5>Answer</h5>
                    </TableCell>
                    <TableCell>
                      <h5>Overview</h5>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {arry.map((row, index) => (
                    <TableRow key={row.name}>
                      <TableCell>{row.chapter}</TableCell>
                      <TableCell>{row.Concept}</TableCell>
                      <TableCell>{row.Difficulty}</TableCell>
                      <TableCell>{row.Alloted}</TableCell>
                      <TableCell>{row.Attempted}</TableCell>
                      <TableCell>{row.Answer}</TableCell>
                      <TableCell>{row.Overview}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </div>
      </div>
    </>
  );
}
export default Analysis;
