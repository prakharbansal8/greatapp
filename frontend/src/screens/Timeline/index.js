import React, { useState, useEffect } from "react";
import UploadForm from "../../components/UploadForm";
import Images from "../../components/Images";
import Header from "../../components/Header/Header";
import axios from "axios";
import NavCollapse from "../../components/NavCollapse";
import TimelineButton from "../../components/TimelineButton";
import Categories from "./Categories";
import Featured from "./Featured";
import Checkbox from "./Checkbox";
import UserDetails from "./UserDetails";

const Timeline = (props) => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log(token);
      axios
        .post(
          "http://localhost:8098/verifyToken",
          {},
          {
            headers: { authorization: token },
          }
        )
        .then((res) => {
          console.log("result", res.data.success);
          if (res.data.success) {
            props.history.push({
              pathname: "/timeline",
              data: loggedUser,
            });
          } else {
            alert("Session Expired");
            props.history.push({
              pathname: "/login",
            });
          }
        });
    } else {
      props.history.push({
        pathname: "/login",
      });
    }
  }, []);

  const [isShow, setisShow] = useState(false);
  const [imagesdata, setimagesdata] = useState([]);
  const [loggedUser, setloggedUser] = useState(JSON.parse(localStorage.getItem("User")));

  const showImages = (event) => {
    axios
      .get("http://localhost:8098/getimages", {})
      .then((res) => {
        setimagesdata(res.data.reverse());
      })
      .catch((err) => {
        console.log("errr", err);
      });
  };

  const handleClick = (event) => {
    setisShow(!isShow);
  };

  console.log("Data from header", loggedUser);
  return (
    <div>
      <Header loggedInUser={loggedUser} />

      <NavCollapse />
      <div className="container">
        <div className="content">
          <div className="content_rgt">
            <TimelineButton onClick={handleClick} btntxt="Upload Post" />

            {isShow ? <UploadForm showImages={showImages} loggedUser={loggedUser} /> : ""}

            <TimelineButton onClick={""} btntxt="Invite Friends" />
            <Categories />
            <Featured />
          </div>
          <div className="content_lft">
            <div className="contnt_1">
              <div className="list_1">
                <ul>
                  <li>
                    <Checkbox label="Friends" />
                  </li>
                  <li>
                    <Checkbox label="Flagged" />
                  </li>
                </ul>
              </div>
              <UserDetails loggedUser={loggedUser} />
            </div>

            <Images showImages={showImages} imagesdata={imagesdata} />
          </div>
        </div>
        <div className="clear" />
      </div>
    </div>
  );
};

export default Timeline;
