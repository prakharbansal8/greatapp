 
import axios from "axios";
import Baseurl from "../config/index.js";

const APICaller = (method, url, data) => {
  const option = {
    method,
    url: Baseurl + url,
    data,
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
    },
  };

  return new Promise((resolve, reject) => {

    axios({ ...option })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default APICaller;