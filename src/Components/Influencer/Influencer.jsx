import React, { useState } from "react";
import "./Influencer.css";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Modal } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

const Influencer = ({ influencer, loadInfluencer }) => {
  const {
    name,
    followers,
    _id,
    socialMedia,
    socialMediaType,
    socialMediaLink,
  } = influencer;

  const handleDeleteInfluencer = async () => {
    await axios
      .delete(
        `https://internshipassessment.onrender.com/api/v1/influencer/${_id}`
      )
      .then((res) => {
        alert("Influencer deleted");
        loadInfluencer();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="influencer">
      <p className="name">
        <span className="lable">Name: </span>
        <a href={socialMediaLink} target="_blank">
          {name}
        </a>
      </p>
      <p className="name">
        <span className="lable">Social media: </span>
        {socialMedia}
      </p>
      <p className="followers">
        <span className="lable">Followers: </span> {followers}
      </p>
      <Link to={`/editinfluencer/${_id}`} className="edit">
        <BorderColorIcon />
      </Link>
      <button className="delete" onClick={handleDeleteInfluencer}>
        <DeleteForeverIcon />
      </button>
    </div>
  );
};

export default Influencer;
