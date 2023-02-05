import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Influencer from "../Influencer/Influencer";
import "./Influencers.css";

const Influencers = () => {
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initial, setInitial] = useState([]);

  const sorting = (col) => {
    if (col === "followers") {
      const sorted = [...influencers].sort((a, b) =>
        a[col] < b[col] ? 1 : -1
      );
      setInfluencers(sorted);
      console.log(sorted);
    } else {
      if (col === "time") {
        setInfluencers([...initial]);
      } else {
        console.log(col);
        const sorted = [...influencers].sort((a, b) =>
          a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
        );
        setInfluencers(sorted);
        console.log(sorted);
      }
    }
  };

  useEffect(() => {
    loadInfluencers();
  }, []);

  const loadInfluencers = async () => {
    setLoading(true);
    await axios
      .get("https://internshipassessment.onrender.com/api/v1/influencers")
      .then((res) => {
        console.log(res.data);
        setInfluencers([...res.data.influencers].reverse());
        setInitial([...res.data.influencers].reverse());
        console.log(influencers);
      })
      .catch((err) => {
        alert(err.message);
      });

    setLoading(false);
  };

  const searchIfluencer = async (e) => {
    if (e.target.value === "") {
      return loadInfluencers();
    } else {
      setLoading(true);
      await axios
        .get(
          `https://internshipassessment.onrender.com/api/v1/influencers/${e.target.value}`
        )
        .then((res) => {
          setInfluencers(res.data.influencers);
          console.log(influencers);
        })
        .catch((err) => {
          alert(err.message);
        });
      setLoading(false);
    }
  };

  return (
    <div className="influencers">
      <div className="influencers_header">
        <input
          type="text"
          className="search_input"
          placeholder="Search Influencer"
          onChange={(e) => searchIfluencer(e)}
        />
        <div className="select_wrapper">
          <p>Sort By:</p>
          <select
            name=""
            id=""
            onChange={(e) => sorting(e.target.value)}
            className="sort_by"
          >
            <option value="name">Name</option>
            <option value="followers">Followers</option>
            <option value="socialMedia">Social Media</option>
            <option value="time">Time</option>
          </select>
        </div>
        <Link to="/addinfluencer" className="addButton">
          Add Influencer
        </Link>
      </div>
      {loading ? (
        "loading..."
      ) : (
        <div className="influencers_wrapper">
          {influencers?.map((influencer) => {
            return (
              <Influencer
                influencer={influencer}
                key={influencer._id}
                loadInfluencer={loadInfluencers}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Influencers;
