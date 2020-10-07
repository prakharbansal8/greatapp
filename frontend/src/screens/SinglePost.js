import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import NavCollapse from "../components/NavCollapse";
import TimelineButton from "../components/TimelineButton";
import UploadForm from "../components/UploadForm";
import Categories from "./Timeline/Categories";
import Featured from "./Timeline/Featured";

const SinglePost = (props) => {
  const [idOfPost, setidOfPost] = useState("");
  const [post1, setpost1] = useState([]);
  const [isShow, setisShow] = useState(false);
  const loggedUser = JSON.parse(localStorage.getItem("User"));
  const handleClick = (event) => {
    setisShow(!isShow);
  };
  const commentSubmit = (e) => {
    e.preventDefault();

    if (e.target.comment.value.length < 1) return;
    console.log(e.target.comment.value);
    const commentData = {
      comment: e.target.comment.value,
      idOfPost: idOfPost,
    };
    axios
      .post("http://localhost:8098/addcomment", commentData)
      .then((res) => {
        // this.props.showImages();
        // e.target.reset();
        console.log(res.data);
        // this.setState({ aftr: res.data });
        setpost1(res.data);
      })
      .catch((err) => {
        console.log("errr", err);
      });
  };
  useEffect(() => {
    const ax = {
      idOfPost: props.match.params._id,
    };
    setidOfPost(props.match.params._id);
    axios
      .post("http://localhost:8098/getSinglePost", ax)
      .then((res) => {
        // this.props.showImages();

        console.log("0th element", res.data[0]);
        setpost1(res.data[0]);
        console.log("Post 1------->", this.state.post1);
        // consol
      })
      .catch((err) => {
        console.log("errr", err);
      });
  }, [props.match.params._id]);
  const { comment = [] } = post1;
  return (
    <div>
      <Header />
      <NavCollapse />

      <div className="container">
        <div className="content">
          <div className="content_rgt">
            <TimelineButton onClick={handleClick} btntxt="Upload Post" />
            {isShow ? <UploadForm loggedUser={loggedUser} /> : ""}

            <TimelineButton onClick={""} btntxt="Invite Friends" />
            <Categories />
            <Featured />
          </div>
          <div className="content_lft">
            {/* {this.state.post1.map((path, index) => ( */}
            <div className="contnt_2">
              <div className="div_a">
                <div className="div_title">{post1.title}</div>
                <div className="btm_rgt">
                  <div className="btm_arc">Cats</div>
                </div>
                <div className="div_top">
                  <div className="div_top_lft">
                    <img src="../images/img_6.png" />
                    {post1.email}
                  </div>
                  <div className="div_top_rgt">
                    <span className="span_date">{post1.date}</span>
                    <span className="span_time">{post1.time}</span>
                  </div>
                </div>
                <div className="div_image">
                  <img src={"http://localhost:8098/" + post1.imageupload} alt="pet" />
                </div>
                <div className="div_btm">
                  <div className="btm_list">
                    <ul>
                      <li>
                        <a href="#">
                          <span className="btn_icon">
                            <img src="../images/icon_001.png" alt="share" />
                          </span>
                          Share
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span className="btn_icon">
                            <img src="../images/icon_002.png" alt="share" />
                          </span>
                          Flag
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span className="btn_icon">
                            <img src="../images/icon_003.png" alt="share" />
                          </span>
                          0 Likes
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span className="btn_icon">
                            <img src="../images/icon_004.png" alt="share" />
                          </span>
                          {comment.length} Comments
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* ))} */}
            <div className="contnt_3">
              <ul>
                {comment.map((path, index) => (
                  <li>
                    <div className="list_image">
                      <div className="image_sec">
                        <img src="../images/post_img.png" />
                      </div>
                      <div className="image_name">Bharat</div>
                    </div>
                    <div className="list_info">{path}</div>
                    <input type="button" defaultValue="Reply" className="orng_btn" />
                  </li>
                ))}

                <li>
                  <div className="cmnt_div1">
                    <form onSubmit={commentSubmit}>
                      <input type="text" name="comment" placeholder="Enter your Comment" className="cmnt_bx1" />
                      <input type="submit" className="sub_bttn1" defaultValue="Submit Comment" />
                    </form>
                  </div>
                </li>
              </ul>
              {/* <div className="view_div">
                <a href="#">View more</a>
              </div> */}
            </div>
          </div>
        </div>
        <div className="clear" />
      </div>
    </div>
  );
};
export default SinglePost;
