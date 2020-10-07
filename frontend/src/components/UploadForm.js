import React, { useState } from "react";
import axios from "axios";
// import Images from "./Images";
import Loader from "../components/Loader";

const UploadForm = (props) => {
  // this.state = {
  const { loggedUser } = props;
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [email, SetEmail] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const handleInputChange = (event) => {
    // console.log("handle");
    setSelectedFile(event.target.files[0]);
  };
  const submitForm = (event) => {
    // console.log("submit called");

    event.preventDefault();
    const data = new FormData();
    data.append("myfile", selectedFile);
    console.log(selectedFile);
    // console.log(event.target.value);
    data.append("title", title);
    data.append("category", category);
    data.append("email", loggedUser.email);
    // console.log(data.datas);
    setisLoading(true);
    setTimeout(() => {
      axios
        .post("http://localhost:8098/uploadimage", data)
        .then((res) => {
          setisLoading(false);
          setCategory("");
          // setSelectedFile(null);
          document.getElementById("myfile").value = "";
          setTitle("");
          SetEmail("");
          props.showImages();

          console.log(res.data);
        })
        .catch((err) => {
          console.log("errr", err);
        });
    }, 5000);
  };

  return (
    <div>
      {isLoading && <Loader isLoading={isLoading} />}
      <form id="uploadForm" onSubmit={submitForm} encType="multipart/form-data" autoComplete="off">
        <label for="FileTitle" value="FileTitle">
          Title
        </label>
        <input
          type="text"
          id="FileTitle"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          name="title"
          value={title}
          placeholder="Enter Title to be Displayed"
          required
        />
        <br />
        <br />
        <label for="Category" value="FileTitle">
          Category
        </label>
        <input
          type="text"
          id="Category"
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
          }}
          name="category"
          placeholder="Category"
          required
        />
        <br />
        <br />

        <label for="myfile">Select a file:</label>

        <input type="file" id="myfile" name="myfile" onChange={handleInputChange} required />
        <br />
        <br />
        <input type="Submit" class="btn btn-info" name="Submit" />
        <br />
      </form>
    </div>
  );
};
export default UploadForm;
