import "./Students.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaFolderOpen } from "react-icons/fa6";
import { FaDeleteLeft } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";
import Mark from "../mark";

function Students() {
  let StudentID;
  // useState...
  const [students, setStudents] = useState([]);
  const [stddoc, setstddoc] = useState("");
  const [other, setother] = useState("");
  const [ls, setls] = useState("");

  // useEffect Function for Fetching Data From Backend
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://student-api.sfsschoolpudukkottai.org/studentDetail"
      );
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(fetchData, 100);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // useEffect function for Getting If Contition Value From Allstudents Component
  useEffect(() => {
    const savedStudentId = localStorage.getItem("selectedStudentId");
    setls(savedStudentId);
  }, []);

  // Function to Delete the Students Details
  async function handleDeleteStd(id) {
    try {
      const response = await axios.delete(
        `https://student-api.sfsschoolpudukkottai.org/studentDetail/delete/${id}`
      );
      if (response.status === 200) {
        alert("Successfully StudentDetails Deleted");
        // setRerender(!rerender);
      } else {
        alert("Failed To Delete StudentDetails");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Function to  Changing The  Date Formate
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  // Function to Change Image link to Base64
  function handleStdDocument(e) {
    const stdDoc = e.target.files[0];
    if (stdDoc) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setstddoc(reader.result);
      };
      reader.readAsDataURL(stdDoc);
    }
  }

  // Function to Updata the Students Document
  async function handleDocsubmit(id) {
    const Studentdocument = {
      Document: stddoc,
      Otherremarks: other,
    };
    try {
      const response = await axios.put(
        `https://student-api.sfsschoolpudukkottai.org/studentDetail/document/${id}`,
        Studentdocument
      );

      console.log(response.data);

      if (response.status === 200) {
        alert("Document successfully uploaded");
      } else {
        alert("Failed to update document");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function HandleDocDelete(id, Did) {
    try {
      const response = await axios.delete(
        `https://student-api.sfsschoolpudukkottai.org/delete/${id}/${Did}`
      );
      if (response.status === 200) {
        alert("Successfully StudentDocument Deleted");
      } else {
        alert("Failed To Delete StudentDocument");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const [StudentMark, setStudentMark] = useState({});
  // const [StudentExamType, setStudentExamType] = useState("");
  var setStudentExamType;

  function HandleStudentMark(e) {
    let value = e.target.value.trim();
    const name = e.target.name;

    if (!isNaN(value) && value !== "" && value >= 0 && value <= 100) {
      setStudentMark({
        ...StudentMark,
        [name]: value,
      });
    } else {
      setStudentMark({
        ...StudentMark,
        [name]: "Absent",
      });
    }
  }

  const HandleStudentMarkSubmit = async () => {
    try {
      const response = await axios.put(
        `https://student-api.sfsschoolpudukkottai.org/updateMark/${StudentID}`,
        StudentMark
      );
      if (response.status === 200) {
        alert("Successfully StudentMark Submitted");
      } else {
        alert("Failed To Submit StudentMark");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [totalMarks, setTotalMarks] = useState(0);

  // Function to calculate total marks
  const calculateTotalMarks = (sm, mark) => {
    let total = 0;
    const subjects = [
      mark.sub1,
      mark.sub2,
      mark.sub3,
      mark.sub4,
      mark.sub5,
      mark.sub6,
      mark.sub7,
    ];
    subjects.forEach((subject) => {
      const markValue =
        subject && sm[subject]
          ? sm[subject].toLowerCase() === "absent"
            ? 0
            : parseFloat(sm[subject])
          : 0;
      total += markValue;
    });
    return total;
  };

  return (
    <div>
      {students.map((std) => {
        if (ls === std._id) {
          StudentID = std._id;
          return (
            <div key={std._id}>
              <div className="students" key={std._id}>
                <p className="remove" onClick={() => handleDeleteStd(std._id)}>
                  Remove <FaDeleteLeft style={{ color: "red" }} />
                </p>
                <div className="student-profile">
                  <div className="DB">
                    <img src={std.image} alt=""></img>
                  </div>
                  <div className="name">
                    <p>{std.name}</p>
                    <span>{formatDate(std.dateOfBirth)}</span>
                  </div>
                  <div className="bio">
                    <ul className="ul-1">
                      <li>Father's Name</li>
                      <li>Mother's Name</li>
                      <li>Contact No</li>
                      <li>Date of Birth</li>
                      <li>Class Details</li>
                    </ul>
                    <ul className="ul-2">
                      <li>:</li>
                      <li>:</li>
                      <li>:</li>
                      <li>:</li>
                      <li>:</li>
                    </ul>
                    <ul className="ul-3">
                      <li>{std.fatherName}</li>
                      <li>{std.motherName}</li>
                      <li>{std.phoneNumber}</li>
                      <li>{formatDate(std.dateOfBirth)}</li>
                      <li style={{ textWrap: "nowrap" }}>
                        {std.standard} - {std.section} - {std.group}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="student-document">
                  <div className="att-doc">
                    <label htmlFor="std-doc" className="std-doc">
                      <FaFolderOpen style={{ fontSize: "22px" }} />
                      Add your Documents
                    </label>
                    <input
                      type="file"
                      hidden
                      id="std-doc"
                      onChange={(e) => handleStdDocument(e)}
                    />
                  </div>
                  <div className="other-remarks">
                    <textarea
                      rows={5}
                      className="remarks"
                      placeholder="Other - Remarks"
                      onChange={(e) => setother(e.target.value)}
                    ></textarea>
                  </div>
                  <button
                    onClick={() => handleDocsubmit(std._id)}
                    className="btn-btn"
                  >
                    Submit
                  </button>
                </div>
                <div className="Std-Mark">
                  <select
                    className="new-select"
                    name="examType"
                    onChange={(e) => {
                      setStudentMark((prevState) => ({
                        ...prevState,
                        examType: e.target.value,
                      }));
                      console.log(StudentMark);
                    }}
                  >
                    <option>Select Exam</option>
                    <option>Midterm-I</option>
                    <option>Midterm-II</option>
                    <option>Midterm-III</option>
                    <option>Quarterly</option>
                    <option>Halfyearly</option>
                    <option>Annual</option>
                    <option>Reveision I</option>
                    <option>Reveision II</option>
                    <option>Model</option>
                    <option>Others</option>
                  </select>

                  {Mark.map(function (mark) {
                    if (
                      std.standard === mark.id &&
                      ((std.standard !== "11" && std.standard !== "12") ||
                        (std.standard === "11" && std.group === mark.group) ||
                        (std.standard === "12" && std.group === mark.group))
                    ) {
                      return (
                        <div key={mark.id} className="Std-Mark-ul">
                          <ul>
                            <li>{mark.sub1}</li>
                            <li>{mark.sub2}</li>
                            <li>{mark.sub3}</li>
                            <li>{mark.sub4}</li>
                            <li>{mark.sub5}</li>
                            {mark.sub6 && <li>{mark.sub6}</li>}
                            {mark.sub7 && <li>{mark.sub7}</li>}
                          </ul>
                          <ul>
                            <li>:</li>
                            <li>:</li>
                            <li>:</li>
                            <li>:</li>
                            <li>:</li>
                            {mark.sub6 && <li>:</li>}
                            {mark.sub7 && <li>:</li>}
                          </ul>
                          <ul>
                            <li>
                              <input
                                type="text"
                                name={mark.sub1}
                                onChange={(e) => HandleStudentMark(e)}
                              ></input>
                            </li>
                            <li>
                              <input
                                type="text"
                                name={mark.sub2}
                                onChange={(e) => HandleStudentMark(e)}
                              ></input>
                            </li>
                            <li>
                              <input
                                type="text"
                                name={mark.sub3}
                                onChange={(e) => HandleStudentMark(e)}
                              ></input>
                            </li>
                            <li>
                              <input
                                type="text"
                                name={mark.sub4}
                                onChange={(e) => HandleStudentMark(e)}
                              ></input>
                            </li>
                            <li>
                              <input
                                type="text"
                                name={mark.sub5}
                                onChange={(e) => HandleStudentMark(e)}
                              ></input>
                            </li>
                            {mark.sub6 && (
                              <li>
                                <input
                                  type="text"
                                  name={mark.sub6}
                                  onChange={(e) => HandleStudentMark(e)}
                                ></input>
                              </li>
                            )}
                            {mark.sub7 && (
                              <li>
                                <input
                                  type="text"
                                  name={mark.sub7}
                                  onChange={(e) => HandleStudentMark(e)}
                                ></input>
                              </li>
                            )}
                          </ul>
                        </div>
                      );
                    }
                    return null;
                  })}
                  <button onClick={HandleStudentMarkSubmit} className="btn-btn">
                    Add Mark
                  </button>
                </div>
              </div>
              <div className="docs-box">
                {std.Documents.map(function (docc, index) {
                  return (
                    <>
                      <div key={index}>
                        <span
                          onClick={() => HandleDocDelete(std._id, docc._id)}
                        >
                          <TiDelete />
                        </span>
                        <img src={docc.Document} alt=""></img>
                        <p>{docc.Otherremarks}</p>
                      </div>
                    </>
                  );
                })}
              </div>
              <div>
                {Mark.map(function (mark) {
                  if (
                    std.standard === mark.id &&
                    (std.standard < "11" ||
                      (std.standard === "11" && std.group === mark.group) ||
                      (std.standard === "12" && std.group === mark.group))
                  ) {
                    return (
                      <div key={mark.id} className="time">
                        {std.marks.map(function (sm, index) {
                          return (
                            <div className="timetable" key={index}>
                              <ul className="timetable-ul-1">
                                <li>S.No</li>
                                <li>Subject</li>
                                <li>Mark</li>
                                <li>Exam Title</li>
                              </ul>
                              <ul className="timetable-ul-2">
                                <li>1</li>
                                <li>{mark.sub1}</li>
                                <li>{sm[mark.sub1]}</li>
                                <li>{sm.examType}</li>
                              </ul>
                              <ul className="timetable-ul-2">
                                <li>2</li>
                                <li>{mark.sub2}</li>
                                <li>{sm[mark.sub2]}</li>
                                <li>{sm.examType}</li>
                              </ul>
                              <ul className="timetable-ul-2">
                                <li>3</li>
                                <li>{mark.sub3}</li>
                                <li>{sm[mark.sub3]}</li>
                                <li>{sm.examType}</li>
                              </ul>
                              <ul className="timetable-ul-2">
                                <li>4</li>
                                <li>{mark.sub4}</li>
                                <li>{sm[mark.sub4]}</li>
                                <li>{sm.examType}</li>
                              </ul>
                              <ul className="timetable-ul-2">
                                <li>5</li>
                                <li>{mark.sub5}</li>
                                <li>{sm[mark.sub5]}</li>
                                <li>{sm.examType}</li>
                              </ul>
                              {mark.sub6 && (
                                <ul className="timetable-ul-2">
                                  <li>6</li>
                                  <li>{mark.sub6}</li>
                                  <li>{sm[mark.sub6]}</li>
                                  <li>{sm.examType}</li>
                                </ul>
                              )}
                              {mark.sub7 && (
                                <ul className="timetable-ul-2">
                                  <li>7</li>
                                  <li>{mark.sub7}</li>
                                  <li>{sm[mark.sub7]}</li>
                                  <li>{sm.examType}</li>
                                </ul>
                              )}
                              <ul className="timetable-ul-3">
                                <li>
                                  {" "}
                                  {calculateTotalMarks(sm, mark)} /{" "}
                                  {(mark.sub6 && "600") || (mark.sub7 && "700")}
                                </li>
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
              ;
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}

export default Students;

{
  /* <div className="docs-box">
              {students &&
                students.map(function (doc) {
                  if (ls === doc._id && doc.Documents) {
                    return doc.Documents.map(function (docc, index) {
                      return (
                        <>
                          <div key={index}>
                            <span onClick={() => HandleDocDelete(doc._id, docc._id)}>
                              <TiDelete />
                            </span>
                            <img src={docc.Document} alt=""></img>
                            <p>{docc.Otherremarks}</p>
                          </div>
                        </>
                      );
                    });
                  }
                  return null;
                })}
            </div> */
}
