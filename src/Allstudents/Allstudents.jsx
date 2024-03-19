import "./Allstudents.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Allstudents({ searchValue }) {
  // For Navigation
  var navigate = useNavigate();

  // Use State to store the Values
  const [allStudent, setallStudent] = useState([]);
  const [selectSTD, setselectSTD] = useState("");

  // useEffect For Fetch data from Back End
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get(
          "https://student-api.sfsschoolpudukkottai.org/studentDetail"
        );
        setallStudent(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    loadData();
  }, []);

  // useEffect to Get Value From Local Storage
  useEffect(() => {
    const savedStd = localStorage.getItem("selectedStd");
    setselectSTD(savedStd);
  }, []);

  //Function fro Sending Data to Local Storage
  function handlestudent(id) {
    if (id) {
      localStorage.setItem("selectedStudentId", id);
      navigate("/Students");
      console.log("success");
    } else {
      console.log("failed");
    }
  }

  // Function for Search Filter
  const filterStudents = allStudent.filter((item) => {
    return item.name.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <div className="all-students">
      <p className="standard">{selectSTD}</p>
      <div className="std-box">
        <ul className="std-ul">
          {/* <li className="li-1">S.No</li> */}
          <li className="li-2">Students Name</li>
          <li className="li-3">Class Details</li>
          <li className="li-4">Contact Information</li>
          {/* <li style={{ flex: "0.5", textAlign: "end" }}>Delete</li> */}
        </ul>
        {filterStudents.map(function (a, index) {
          if (a.standard === selectSTD) {
            return (
              <ul
                key={index}
                className="std-ul-1"
                onClick={() => handlestudent(a._id)}
              >
                {/* <li className="li-1">{index + 1}</li> */}
                <li className="li-2">{a.name}</li>
                <li className="li-3">
                  {a.standard} - {a.section} - {a.group}
                </li>
                <li className="li-4">{a.phoneNumber}</li>
                {/* <p className="del">
                  Delete
                  <FaDeleteLeft style={{ color: "red", fontSize: "19px" }} />
                </p> */}
              </ul>
            );
          }
        })}
      </div>
    </div>
  );
}

export default Allstudents;
