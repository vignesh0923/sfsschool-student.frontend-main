import { useRef, useState } from "react";
import "./Examination.css";
function Examination() {
  const [SelectOption, setSelectOption] = useState("Biology");

  function HandleSelectOption(e) {
    setSelectOption(e.target.value);
  }

  const [inputone, setinputone] = useState("");
  const [inputtwo, setinputtwo] = useState("");
  const [inputthree, setinputthree] = useState("");
  const [inputfour, setinputfour] = useState("");
  const [allValues, setAllValues] = useState([]);

  async function handleButton() {
    setAllValues((prev) => [
      ...prev,
      { inputone, inputtwo, inputthree, inputfour },
    ]);
  }

  const printRef = useRef();

  const handlePrint = () => {
    const content = printRef.current;
    const pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();
    pri.document.write(`
      <html>
        <head>
          <title>Print content</title>
          <style>
          .timetable {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .timetable-ul-1 {
            width: 80%;
            padding: 0px;
            color: black;
            margin: 0px;
            text-align: center;
            display: grid;
            font-size: 16px;
            font-family: "poppins", sans-serif;
            border: 2px solid #1d2939;
            border-radius: 10px 10px 0px 0px;
            grid-template-columns: 1fr 1fr 1fr 1fr;
          }
          .timetable-ul-1 > li {
            padding: 8px 12px;
            list-style: none;
            font-size: 16px;
            font-family: "poppins", sans-serif;
          }
          .timetable-ul-2 {
            background-color: white;
            width: 80%;
            font-family: "poppins", sans-serif;
            padding: 0px;
            margin: 0px;
            font-size: 16px;
            text-align: center;
            display: grid;
            border-bottom: 2px solid #01fe7e;
            border-left: 2px solid #01fe7e;
            border-right: 2px solid #01fe7e;
            grid-template-columns: 1fr 1fr 1fr 1fr;
          }
          .timetable-ul-2 > li {
            padding: 6px 12px;
            color: #000000;
            list-style: none;
            font-size: 16px;
            font-family: "poppins", sans-serif;
          }
          </style>
        </head>
        <body>
          ${content.innerHTML}
        </body>
      </html>
    `);
    pri.document.close();
    pri.focus();
    pri.print();
  };

  return (
    <div className="Examination">
      <div className="TIMETABLE">
        <select
          onChange={(e) => setinputone(e.target.value)}
          style={{ width: "220px" }}
        >
          <option>Class 1-10</option>
          <option>UKG</option>
          <option>LKG</option>
          <option>1-STD</option>
          <option>2-STD</option>
          <option>3-STD</option>
          <option>4-STD</option>
          <option>5-STD</option>
          <option>6-STD</option>
          <option>7-STD</option>
          <option>8-STD</option>
          <option>9-STD</option>
          <option>10-STD</option>
          <option>11-STD</option>
          <option>12-STD</option>
        </select>
        <input
          style={{ width: "200px" }}
          type="date"
          onChange={(e) => setinputtwo(e.target.value)}
        />
        <select
          onChange={(e) => setinputthree(e.target.value)}
          style={{ width: "220px" }}
        >
          <option>Select Subject</option>
          <option>Tamil</option>
          <option>English</option>
          <option>Maths</option>
          <option>Science</option>
          <option>Social Science</option>
          <option>Physice</option>
          <option>Chemistry</option>
          <option>Biology</option>
          <option>Computer Science</option>
          <option>Accounts</option>
          <option>Commerce</option>
        </select>
        <select
          onChange={(e) => setinputfour(e.target.value)}
          style={{ width: "220px" }}
        >
          <option>Select Session</option>
          <option>Forenoon</option>
          <option>Afternoon</option>
        </select>
        <button className="btn-btn" onClick={() => handleButton()}>
          Add
        </button>
      </div>
      <div ref={printRef} className="timetable">
        <ul className="timetable-ul-1">
          <li>Class</li>
          <li>Subject</li>
          <li>Date</li>
          <li>Session</li>
        </ul>
        {allValues &&
          allValues.map((all, index) => (
            <ul key={index} className="timetable-ul-2">
              <li>{all.inputone}</li>
              <li>{all.inputtwo}</li>
              <li>{all.inputthree}</li>
              <li>{all.inputfour}</li>
            </ul>
          ))}
      </div>
      <div className="button-container">
        <button className="print-btn" onClick={handlePrint}>
          Print
        </button>
      </div>{" "}
      <iframe
        id="ifmcontentstoprint"
        style={{
          height: "0px",
          width: "0px",
          position: "absolute",
          visibility: "hidden",
        }}
        title="Printing content"
      ></iframe>
      <iframe
        id="ifmcontentstoprint"
        style={{ height: "0px", width: "0px", position: "absolute" }}
      ></iframe>
    </div>
  );
}
export default Examination;
