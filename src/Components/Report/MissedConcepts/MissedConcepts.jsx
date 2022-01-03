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

function MissedConcepts(props) {
  let navigate = useNavigate();
  const arry = [
    {
      name: "Escape Velocity",
    },
    {
      name: "Torque",
    },
    {
      name: "Instantaneous Velocity",
    },
    {
      name: "Speed of Light in Medium",
    },
    {
      name: "Conservation of Momentum",
    },
    {
      name: "Ideal Gas Equation",
    },
    {
      name: "Velocity of EM Waves",
    },
    {
      name: "Joules Law of Heating",
    },
    {
      name: "Maths",
    },
  ];

  const chemistry = [
    {
      name: "Paramagnetism",
    },
    {
      name: "Reagents for Different Groups",
    },
    {
      name: "Acid Base Equilibrium",
    },
    {
      name: "Proteins",
    },
    {
      name: "Conductivity",
    },
    {
      name: "Dipole Moment",
    },
    {
      name: "Outer Orbital Complexes",
    },
    {
      name: "Aromatic Isomers",
    },
    {
      name: "Huckel Rule",
    },
  ];

  const maths = [
    {
      name: "Integration of Trigonometric Functions",
    },
    {
      name: "General Term",
    },
    {
      name: "Angle Bisector and Coplanarity",
    },
    {
      name: "Monotonicity",
    },
    {
      name: "Properties of Definite Integrals",
    },
    {
      name: "Transformation Formulas",
    },
    {
      name: "Section Formula",
    },
    {
      name: "Chord With Given Mid Point",
    },
    {
      name: "Heights and Distances",
    },
    {
      name: "Area Between Curves",
    },
  ];
  //   useEffect(() => {
  //     window.scrollTo(0, 0);
  //   }, []);
  const [EditDailogOpen, setEditDailogOpen] = useState("");

  const classes = useStyles();

  return (
    <>
      <div className="home_padding">
        <div className="content_padding">
          <div className="text-center mt-4">
            <h4>Missed Concepts</h4>

            <p>
              This section will list all the concepts you got wrong in the exam
              on an individual subject level. This information becomes relevant
              for you as you will now need to spend some time brushing up the
              concept.
            </p>
            <h4>Physics</h4>
          </div>
          <Card classname="main_card p-3">
            <TableContainer>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <h5>Concept</h5>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {arry.map((row, index) => (
                    <TableRow key={row.name}>
                      <TableCell>{row.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
          {/* section Chemistry */}

          <div className="text-center">
            <h4 className="mt-4">Chemistry</h4>
          </div>
          <Card classname="main_card p-3">
            <TableContainer>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <h5>Concept</h5>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {chemistry.map((row, index) => (
                    <TableRow key={row.name}>
                      <TableCell>{row.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>

          {/* section physics */}

          <div className="text-center">
            <h4 className="mt-4">Maths</h4>
          </div>
          <Card classname="main_card p-3">
            <TableContainer>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <h5>Concept</h5>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {maths.map((row, index) => (
                    <TableRow key={row.name}>
                      <TableCell>{row.name}</TableCell>
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
export default MissedConcepts;
