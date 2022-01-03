import React, { Component, PropTypes, useState, useEffect } from "react";
import { Grid, Card } from "@material-ui/core";
import RichTextEditor from "react-rte-17";
// import RichTextEditor from "react-rte";
import { useNavigate } from "react-router-dom";
import HOC from "../../Common/HOC";
//DIALOG BOX
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";

const GenratePaper = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [rte, setrte] = useState(RichTextEditor.createEmptyValue());
  const [EditDailogOpen, setEditDailogOpen] = useState("");
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const onChange = (value) => {
    setrte(value);
    if (props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      props.onChange(value.toString("html"));
    }
  };

  return (
    <>
      <div className="content_padding_component">
        <nav aria-label="breadcrumb">
          <div className="content_width">
            <Grid className="Component_main_grid">
              <Grid item md={10}>
                <div className="level_content">
                  <h2 className="pl-5 py-3">Genrate Paper</h2>
                </div>
              </Grid>
              <Grid item md={2}>
                <div className="level_content">
                  <div>
                    <button
                      type="button"
                      class="btn btn-info mr-4 mt-3"
                      onClick={() => navigate(-1)}
                    >
                      <i class="fa fa-arrow-left"></i>Go Back
                    </button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </nav>
        <div className="container">
          {/* <div className="mb-3 mt-3">
            <Grid className="Component_main_grid">
              <Grid item md={3}>
                <div className="text_filed_heading pl-1 ">Medium *</div>
                <div className=" mt-1 mr-2">
                  <select class="custom-select custom-select-md mb-3">
                    <option selected>Select</option>
                    <option value="1">Medium-1</option>
                    <option value="2">Medium-2</option>
                    <option value="3">Medium-3</option>
                  </select>
                </div>
              </Grid>
              <Grid item md={3}>
                <div className="text_filed_heading pl-1 ">Board *</div>
                <div className=" mt-1 mr-2">
                  <select class="custom-select custom-select-md mb-3">
                    <option selected>Select</option>
                    <option value="1">Board-1</option>
                    <option value="2">Board-2</option>
                    <option value="3">Board-3</option>
                  </select>
                </div>
              </Grid>
              <Grid item md={3}>
                <div className="text_filed_heading pl-1 ">Grade Type *</div>
                <div className=" mt-1 mr-2">
                  <select class="custom-select custom-select-md mb-3">
                    <option selected>Select</option>
                    <option value="1">Grade-1</option>
                    <option value="2">Grade-2</option>
                    <option value="3">Grade-3</option>
                  </select>
                </div>
              </Grid>
              <Grid item md={3}>
                <div className="text_filed_heading pl-1 ">Course Name *</div>
                <div className=" mt-1 mr-2">
                  <select class="custom-select custom-select-md mb-3">
                    <option selected>Select</option>
                    <option value="1">Course-1</option>
                    <option value="2">Course-2</option>
                    <option value="3">Course-3</option>
                  </select>
                </div>
              </Grid>
            </Grid>

            <Grid className="Component_main_grid">
              <Grid item md={3}>
                <div className="text_filed_heading pl-1 ">Topics *</div>
                <div className=" mt-1 mr-2">
                  <select class="custom-select custom-select-md mb-3">
                    <option selected>Select</option>
                    <option value="1">Chapter-1</option>
                    <option value="2">Chapter-2</option>
                    <option value="3">Chapter-3</option>
                  </select>
                </div>
              </Grid>
              <Grid item md={3}>
                <div className="text_filed_heading pl-1 ">Level *</div>
                <div className=" mt-1 mr-2">
                  <select class="custom-select custom-select-md mb-3">
                    <option selected>Select</option>
                    <option value="1">Chapter-1</option>
                    <option value="2">Chapter-2</option>
                    <option value="3">Chapter-3</option>
                  </select>
                </div>
              </Grid>
              <Grid item md={3}>
                <div className="text_filed_heading pl-1 ">Question Type *</div>
                <div className=" mt-1 mr-2">
                  <select class="custom-select custom-select-md mb-3">
                    <option selected>Select</option>
                    <option value="1">Chapter-1</option>
                    <option value="2">Chapter-2</option>
                    <option value="3">Chapter-3</option>
                  </select>
                </div>
              </Grid>
              <Grid item md={3}>
                <div className="text_filed_heading pl-1 ">Heading*</div>
                <div className=" mt-1 mr-2">
                  <select class="custom-select custom-select-md mb-3">
                    <option selected>Select</option>
                    <option value="1">Chapter-1</option>
                    <option value="2">Chapter-2</option>
                    <option value="3">Chapter-3</option>
                  </select>
                </div>
              </Grid>
            </Grid>
          </div> */}
          <Grid className="Component_main_grid">
            <Grid item md={7}>
              <div>
                <span>
                  <h6 className="mt-3">Question *</h6>
                </span>
              </div>
              {/* RichTextEditor */}

              <div className="">
                <RichTextEditor
                  className="employment_jobdescribe"
                  value={rte}
                  onChange={onChange}
                />
              </div>
            </Grid>
            <Grid item md={5}>
              <div className="typeclass_main  my-4 pt-3">
                <Card className="p-4">
                  <Grid className="Component_main_grid">
                    <Grid item md={6}>
                      <div className="text_filed_heading pl-1">
                        Paper Name *
                      </div>
                      <div className=" mt-1 mr-2">
                        <input
                          type="text"
                          className="form-control "
                          autoComplete="off"
                        />
                      </div>
                    </Grid>
                    <Grid item md={6}>
                      <div className="text_filed_heading pl-1 ">
                        Paper Date *
                      </div>
                      <div className=" mt-1 mr-2">
                        <input
                          type="date"
                          className="form-control "
                          autoComplete="off"
                        />
                      </div>
                    </Grid>
                  </Grid>

                  <Grid className="Component_main_grid mt-3">
                    <Grid item md={4}>
                      {" "}
                      <div className="text_filed_heading pl-1 ">
                        Paper Marks *
                      </div>
                      <div className=" mt-1 mr-2">
                        <input
                          type="number"
                          className="form-control "
                          autoComplete="off"
                        />
                      </div>
                    </Grid>
                    <Grid item md={4}>
                      <div className="text_filed_heading pl-1 ">
                        Paper Duration *
                      </div>
                      <div className=" mt-1 mr-2">
                        <input
                          type="text"
                          className="form-control "
                          autoComplete="off"
                        />
                      </div>
                    </Grid>
                    <Grid item md={4}>
                      <div className="text_filed_heading_paper pl-1 ">
                        Paper Instruction *
                      </div>
                      <div className="mr-2">
                        <button
                          type="button"
                          class="btn btn-primary text_filed_heading_paperr"
                          onClick={() => setEditDailogOpen(!EditDailogOpen)}
                        >
                          Add instruction
                        </button>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid className="Component_main_grid">
                    <Grid item md={6}>
                      <div className="text_filed_heading pl-1 ">Level *</div>
                      <div className=" mt-1 mr-2">
                        <select class="custom-select custom-select-md mb-3">
                          <option selected>Select</option>
                          <option value="1">Level-1</option>
                          <option value="2">Level-2</option>
                          <option value="3">Level-3</option>
                        </select>
                      </div>
                    </Grid>
                    <Grid item md={6}>
                      <div className="text_filed_heading pl-1 ">
                        Question Type *
                      </div>
                      <div className=" mt-1 mr-2">
                        <select class="custom-select custom-select-md mb-3">
                          <option selected>Select</option>
                          <option value="1">Long Question</option>
                          <option value="2">Short Question</option>
                          <option value="3">
                            Level-3Multiplication (MCQs)
                          </option>
                        </select>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid className="Component_main_grid">
                    <Grid item md={8}>
                      <div className="text_filed_heading pl-1">Heading *</div>
                      <div className=" mt-1 mr-2">
                        <select class="custom-select custom-select-md mb-3">
                          <option selected>Select</option>
                          <option value="1">Heading-1</option>
                          <option value="2">Heading-2</option>
                          <option value="3">Heading-3</option>
                        </select>
                      </div>
                    </Grid>
                    <Grid item md={4}>
                      <div className="text_filed_heading pl-1 ">T. Mark *</div>
                      <div className=" mt-1 mr-2">
                        <input
                          type="text"
                          className="form-control "
                          autoComplete="off"
                        />
                      </div>
                    </Grid>
                  </Grid>

                  <Grid className="Component_main_grid">
                    <Grid item md={12}>
                      <div className="text_filed_heading pl-1 ">
                        Choose Chapter
                      </div>
                      <div className=" mt-1 mr-2">
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox1"
                            value="option1"
                          />
                          <label class="form-check-label" for="inlineCheckbox1">
                            Polynomial
                          </label>
                        </div>{" "}
                        <br />
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox2"
                            value="option2"
                          />
                          <label class="form-check-label" for="inlineCheckbox2">
                            Chemistry
                          </label>
                        </div>
                        <br />
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox2"
                            value="option2"
                          />{" "}
                          <br />
                          <label class="form-check-label" for="inlineCheckbox2">
                            Gravitation
                          </label>
                        </div>
                      </div>
                    </Grid>
                  </Grid>

                  <Grid className="Component_main_grid mt-4">
                    <Grid item md={3}>
                      <div className="text_filed_heading pl-1 ">Total Que</div>
                      <div className=" mt-1 mr-2">
                        <input
                          type="number"
                          className="form-control "
                          autoComplete="off"
                        />
                      </div>
                    </Grid>
                    <Grid item md={3}>
                      <div className="text_filed_heading pl-1 ">Enter Que.</div>
                      <div className=" mt-1 mr-2">
                        <input
                          type="number"
                          className="form-control "
                          autoComplete="off"
                        />
                      </div>
                    </Grid>
                    <Grid item md={3}>
                      <div className="text_filed_heading pl-1 ">
                        Restart Que.
                      </div>
                      <div className=" mt-1 mr-2">
                        <input
                          type="number"
                          className="form-control "
                          autoComplete="off"
                        />
                      </div>
                    </Grid>
                    <Grid item md={3}>
                      <div className="text_filed_heading pl-1 ">Randomiz</div>
                      <div className=" mt-1 mr-2">
                        <input
                          class="form-check-input ml-4"
                          type="checkbox"
                          id="inlineCheckbox2"
                          value="option2"
                        />
                      </div>
                    </Grid>
                  </Grid>
                  <Grid className="Component_main_grid mt-4">
                    <Grid item md={6}>
                      <button type="button" class="btn btn-info mb-3 mt-4">
                        Export Paper
                      </button>
                    </Grid>
                    <Grid item md={6}>
                      <button type="button" class="btn btn-info mt-4">
                        Transfer To Paper
                      </button>
                    </Grid>
                  </Grid>
                </Card>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>

      <Dialog
        open={EditDailogOpen}
        onClose={() => setEditDailogOpen(!EditDailogOpen)}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth="fullWidth"
      >
        <DialogTitle>
          Add Instruction
          <span className="float-right icon_color"></span>
        </DialogTitle>
        <DialogContent>
          <RichTextEditor
            className="employment_jobdescribe"
            value={rte}
            onChange={onChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            className="button_formatting"
            onClick={() => setEditDailogOpen(!EditDailogOpen)}
          >
            Cancel
          </Button>
          <Button className="button_formatting">Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default HOC(GenratePaper);
