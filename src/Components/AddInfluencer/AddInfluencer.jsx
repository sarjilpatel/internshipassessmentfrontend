import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddInfluencer = () => {
  const [name, setName] = useState("");
  const [socialMediaType, setSocialMediaType] = useState("");
  const [socialMedia, setSocialMedia] = useState("");
  const [socialMediaLink, setSocialMediaLink] = useState("");
  const [followers, setFollowers] = useState(0);

  const navigate = useNavigate();

  const handleAddInfluencer = async () => {
    await axios
      .post(
        "https://internshipassessment.onrender.com/api/v1/influencers",
        { name, socialMedia, socialMediaType, socialMediaLink, followers },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        alert(`${res.data.user.name} added successfully`);
        navigate("/");
      })
      .catch((err) => alert(err.message));
    console.log({
      name,
      socialMedia,
      socialMediaType,
      socialMediaLink,
      followers,
    });
  };
  return (
    <div
      style={{
        backgroundColor: "black",
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="add_influencer_model">
        <h2>Add Influencer</h2>
        <div className="inputs_wrapper">
          <input
            type="text"
            placeholder="name of influencer"
            className="custom_input"
            onChange={(e) => setName(e.target.value)}
          />
          <select
            name=""
            id=""
            className="social_media"
            onChange={(e) => setSocialMediaType(e.target.value)}
          >
            <option value="">Type of social media</option>
            <option value="Instagram">Instagram</option>
            <option value="Snapchat">Snapchat</option>
            <option value="Twitter">Twitter</option>
            <option value="Facebook">Facebook</option>
          </select>
          <input
            type="text"
            className="custom_input"
            placeholder="social media username"
            onChange={(e) => setSocialMedia(e.target.value)}
          />
          <input
            type="text"
            className="custom_input"
            placeholder="social media link"
            onChange={(e) => setSocialMediaLink(e.target.value)}
          />
          <input
            type="number"
            className="custom_input"
            placeholder="followers"
            onChange={(e) => setFollowers(e.target.value)}
          />
        </div>
        <button className="addButton" onClick={handleAddInfluencer}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddInfluencer;
