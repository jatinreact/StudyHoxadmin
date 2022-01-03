import React, { useEffect } from "react";
import HOC from "../../Common/HOC";
import { useNavigate } from "react-router-dom";
import { Card, Grid } from "@material-ui/core";

import "./Home.css";
const Home = (props) => {
  let navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  //local array
  const home = [
    { show: "Add Subject", link: "/subject" },
    { show: "Add Teachers ", link: "/teachers" },
    { show: "Add courses", link: "/addCourse" },
    // { show: "Add Questions", link: "/assignment" },
    // { show: "Add videos", link: "/vedio" },
    { show: "Manage students ", link: "/student" },

    { show: "Payment ", link: "/payment" },
    // { show: "Add Quiz", link: "/quiz" },
    { show: "Add Study Material", link: "/pastyearPaper" },
    { show: "Generate Paper", link: "/genratePaper" },

    { show: "Report Card ", link: "/student" },
    // { show: "Add Banner ", link: "bannerList" },
    // { show: "Product Upload Bulk ", link: "productupload" },
  ];
  return (
    <div className="home_padding">
      <div className="content_padding_home">
        <div className="main_div ">
          <div className="container">
            <div className="row">
              {home.map((item, index) => (
                <div className="col-md-4  col-lg-4">
                  <Card
                    className="main_card Card_shadow "
                    onClick={() => navigate(`${item.link}`)}
                  >
                    <div className="main_content d-flex justify-content-between">
                      <p>
                        <span className="">
                          <i class="fa fa-plus" aria-hidden="true"></i>
                        </span>
                        {item.show}
                      </p>
                      <span className="">{item.data}</span>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HOC(Home);
