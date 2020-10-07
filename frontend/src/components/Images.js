import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Images = (props) => {
  const { imagesdata, showImages } = props;
  useEffect(() => {
    showImages();
  }, []);
  return (
    <div>
      {imagesdata.map((path, index) => (
        <div className="contnt_2">
          <div className="div_a">
            <div className="div_title">{path.title}</div>
            <div className="btm_rgt">
              <div className="btm_arc">{path.category}</div>
            </div>
            <div className="div_top">
              <div className="div_top_lft">
                <img src="images/img_6.png" />
                {path.email}
              </div>
              <div className="div_top_rgt">
                <span className="span_date">{path.date}</span>
                <span className="span_time">{path.time}</span>
              </div>
            </div>
            <Link to={`/singlepost/${path._id}`}>
              <div className="div_image">
                <img src={"http://localhost:8098/" + path.imageupload} alt="pet" />
                {/* {this.state.paths.map((path, index) => (
                <img src={"images/" + path} alt="hgfg" />
              ))} */}
              </div>
            </Link>
            <div className="div_btm">
              <div className="btm_list">
                <ul>
                  <li>
                    <a href="#">
                      <span className="btn_icon">
                        <img src="images/icon_001.png" alt="share" />
                      </span>
                      Share
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="btn_icon">
                        <img src="images/icon_002.png" alt="share" />
                      </span>
                      Flag
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="btn_icon">
                        <img src="images/icon_003.png" alt="share" />
                      </span>
                      0 Likes
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="btn_icon">
                        <img src="images/icon_004.png" alt="share" />
                      </span>
                      {path.comment.length} Comments
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Images;
