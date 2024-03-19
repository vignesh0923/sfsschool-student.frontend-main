import Home from "./Home/Home";
import Navbar from "./Navbar";
import { useState } from "react";
import Studentform from "./Student-Form/Studentform";
import Students from "./Students/Students";
import Allstudents from "./Allstudents/Allstudents";
import Examination from "./Examination/Examination";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  // useState...
  const [searchValue, setsearchValue] = useState("");

  return (
    <div>
      <Navbar setsearchValue={setsearchValue} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/StudentForm" element={<Studentform />} />
          <Route
            path="/Allstudents"
            element={<Allstudents searchValue={searchValue} />}
          />
          <Route path="/Students" element={<Students />} />
          <Route path="/Examination" element={<Examination />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
