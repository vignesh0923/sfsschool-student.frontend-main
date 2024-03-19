import "./Home.css";
import data from "../data";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  // For Navigation
  var navigate = useNavigate();

  // useState for Store Value
  const [stdValue, setstdValue] = useState("All");

  // Function fro Filtering Data
  function getstdvalue(std) {
    setstdValue(std);
  }

  // Set Data To Local Storage
  function selectStdclass(std) {
    if (std) {
      localStorage.setItem("selectedStd", std);
      navigate("/Allstudents");
    } else {
      console.log("FAILED");
    }
  }

  return (
    <div className="Home">
      <div className="Home-left">
        <p className="home-head">Students</p>
        <section className="home-sec">
          <button className="home-btn" onClick={() => getstdvalue("All")}>
            All
          </button>
          <button className="home-btn" onClick={() => getstdvalue("nursery")}>
            Nursery
          </button>
          <button className="home-btn" onClick={() => getstdvalue("primary")}>
            Primary <span>school</span>
          </button>
          <button className="home-btn" onClick={() => getstdvalue("secondary")}>
            Secondary <span>school</span>
          </button>
          <button
            className="home-btn"
            onClick={() => getstdvalue("higher secondary")}
          >
            Higher Secondary <span>school</span>
          </button>
        </section>
      </div>
      <div className="Home-right">
        <section>
          {data.map(function (e) {
            if (stdValue === "All" || stdValue === e.title) {
              return (
                <p key={e.std} onClick={() => selectStdclass(e.std)}>
                  {e.std} std
                </p>
              );
            } else {
              return null;
            }
          })}
        </section>
      </div>
    </div>
  );
}

export default Home;
