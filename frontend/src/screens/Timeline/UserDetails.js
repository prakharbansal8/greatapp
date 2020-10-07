import React from "react";
import InsideNav from "./InsideNav";

function UserDetails(props) {
  const { loggedUser } = props;
  return (
    <>
      <div className="timeline_div">
        <div className="timeline_div1">
          <div className="profile_pic">
            <img src="images/timeline_img1.png" />
            <div className="profile_text">
              <a href="javascript:void(0);">Change Profile Pic</a>
            </div>
          </div>
          <div className="profile_info">
            <div className="edit_div">
              <a href="javascript:void(0);">
                Edit <img src="images/timeline_img.png" />
              </a>
            </div>
            <div className="profile_form">
              <ul>
                <li>
                  <div className="div_name1">Name :</div>
                  <div className="div_name2">{loggedUser && loggedUser.first + " " + loggedUser.last}</div>
                </li>
                <li>
                  <div className="div_name1">Sex :</div>
                  <div className="div_name2">Male</div>
                </li>
                <li>
                  <div className="div_name1">Description :</div>
                  <div className="div_name3">
                    This is an example of a comment. You can create as many comments like this one or sub comments as
                    you like and manage all of your content inside Account.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <InsideNav />
      </div>
    </>
  );
}

export default UserDetails;
