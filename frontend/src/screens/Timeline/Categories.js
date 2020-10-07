import React from "react";

function Categories() {
  return (
    <>
      <div className="rght_cate">
        <div className="rght_cate_hd" id="rght_cat_bg">
          Categories
        </div>
        <div className="rght_list">
          <ul>
            <li>
              <a href="javascript:void(0);">
                <span className="list_icon">
                  <img src="./.././../images/icon_01.png" alt="up" />
                </span>{" "}
                CATS
              </a>
            </li>
            <li>
              <a href="javascript:void(0);">
                <span className="list_icon">
                  <img src="./../images/icon_02.png" alt="up" />
                </span>{" "}
                Dogs
              </a>
            </li>
            <li>
              <a href="javascript:void(0);">
                <span className="list_icon">
                  <img src="./../images/icon_03.png" alt="up" />
                </span>{" "}
                Birds
              </a>
            </li>
            <li>
              <a href="javascript:void(0);">
                <span className="list_icon">
                  <img src="./../images/icon_04.png" alt="up" />
                </span>{" "}
                Rabbit
              </a>
            </li>
            <li>
              <a href="javascript:void(0);">
                <span className="list_icon">
                  <img src="./../images/icon_05.png" alt="up" />
                </span>{" "}
                Others
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Categories;
