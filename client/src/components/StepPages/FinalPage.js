import React from "react";
import { useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import axios from "axios";
import baseURL from "../../config/baseUrl";

export default function FinalPage(props) {
  const [imageSelected, setImageSelected] = useState({ preview: false, raw: "" });
  // console.log(baseURL);
  const fileHandler = (e) => {

    if (e.target.files.length) {
      setImageSelected({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  
    const saveItem = async (e) => {
      e.preventDefault();
      let fd = new FormData();
      fd.append("category", props.state.category);
      fd.append("location", props.state.location);
      if (props.state.PostOrSearch === 'Post item') {
        fd.append("usedState", true);
      }else{
        fd.append("usedState", false);
      }
      // fd.append("PostOrSearch", props.state.PostOrSearch);
      if (props.state.usedState === 'Used') {
        fd.append("usedState", true);
      }else{
        fd.append("usedState", false);
      }
      
      fd.append("name", props.state.name);
      fd.append("userId", localStorage.getItem("userId"));
      fd.append("description", props.state.description);
      fd.append("image",imageSelected.raw);
      fd.append("upload_preset","ml_default");
  //  console.log('fddddddddd...', fd);

   try{
     axios({
        method: "POST",
        url: `${baseURL}/api/items`,
        baseURL: baseURL,
        data: fd,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          console.log("resssssssssssss", res);
        })
   }catch(err) {
          console.log(err);
        };
        window.location.replace('/items');
  };


  // console.log('propssssss',props);
  return (
    <div>
      <div className="">
        <form
          className="form my-5  w-100"
          onSubmit={saveItem}
          encType="multipart/form-data"
        >
          <label htmlFor="upload-button" className="float-left mb-3">
            {imageSelected.preview ? (
              <div>
                <img
                  src={imageSelected.preview}
                  alt="profile-pic"
                  className=" ml-3"
                  style={{
                    width: "70%",
                    height: "50%",
                    boxShadow: "3px 3px 6px 2px #173F5F",
                  }}
                />
                <span
                  style={{ float: "left" }}
                  className="ml-3 mb-4 d-flex flex-direction-column align-items-start"
                >
                  <span className="text-dark col-3 ">
                    <BiImageAdd
                      style={{ fontSize: "xxx-large", float: "left" }}
                    />
                  </span>
                  <br />
                  <h6 className="text-secondary col-7 m-3">Upload photo</h6>
                </span>
              </div>
            ) : (
              <span
                style={{ float: "left" }}
                className="ml-3 mb-4 d-flex flex-direction-column  "
              >
                <span className="text-dark col-6 ">
                  <BiImageAdd
                    style={{ fontSize: "xxx-large", float: "left" }}
                  />
                </span>
                <br />
                <h6 className="text-secondary col-6 m-3">Upload photo</h6>
              </span>
            )}
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            multiple
            style={{ display: "none" }}
            id="upload-button"
            onChange={fileHandler}
          />

          <br />
          <br />
          <button className='btn btn-primary' type="submit">Post Item</button>
        </form>
      </div>
      {/* // <p>
      //   <b>Name:</b> {props.state.name}
      // </p>
      // <p>
      //   <b>category:</b> {props.state.category}
      // </p>
      // <p>
      //   <b>discreption:</b> {props.state.discreption}
      // </p>
      // <p>
      //   <b>location:</b> {props.state.location}
      // </p>
      // <p>
      //   <b>post or search for:</b> {props.state.PostOrSearch}
      // </p>
      // <p>
      //   <b>Used or New:</b>
      //   {props.state.usedState}
      // </p> */}
    </div>
  );
}
