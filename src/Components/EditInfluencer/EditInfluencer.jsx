import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditInfluencer = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [socialMediaType, setSocialMediaType] = useState("");
  const [socialMedia, setSocialMedia] = useState("");
  const [socialMediaLink, setSocialMediaLink] = useState("");
  const [followers, setFollowers] = useState(0);

  useEffect(() => {
    loadInfluencer();
  }, []);

  const loadInfluencer = async () => {
    const id = params.id;
    await axios
      .get(`https://internshipassessment.onrender.com/api/v1/influencer/${id}`)
      .then((res) => {
        setName(res.data.influencer.name);
        setSocialMedia(res.data.influencer.socialMedia);
        setSocialMediaLink(res.data.influencer.socialMediaLink);
        setFollowers(res.data.influencer.followers);
      });
  };
  const handleUpdateInfluencer = async () => {
    await axios
      .put(
        `https://internshipassessment.onrender.com/api/v1/influencer/${params.id}`,
        { name, socialMedia, socialMediaType, socialMediaLink, followers },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        alert(`${res.data.influencer.name} updated successfully`);
        navigate("/");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div>
      <div className="add_influencer_model">
        <h2>Add Influencer</h2>
        <div className="inputs_wrapper">
          <input
            type="text"
            placeholder="name of influencer"
            className="custom_input"
            value={name}
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
            value={socialMedia}
            onChange={(e) => setSocialMedia(e.target.value)}
          />
          <input
            type="text"
            className="custom_input"
            placeholder="social media link"
            value={socialMediaLink}
            onChange={(e) => setSocialMediaLink(e.target.value)}
          />
          <input
            type="number"
            className="custom_input"
            placeholder="followers"
            value={followers}
            onChange={(e) => setFollowers(e.target.value)}
          />
        </div>
        <button className="addButton" onClick={handleUpdateInfluencer}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default EditInfluencer;
