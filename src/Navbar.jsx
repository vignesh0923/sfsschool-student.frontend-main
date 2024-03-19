import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

function Navbar({ setsearchValue }) {
  var navigate = useNavigate();
  const [sidenav, setsidenav] = useState("");

  return (
    <div className="NAVBAR">
      <nav className="nav-stu">
        <h1>sFs</h1>
        <ul>
          <li onClick={() => navigate("/")}>Home</li>
          <li onClick={() => navigate("/Examination")}>Examinations</li>
          <li onClick={() => navigate("/StudentForm")}>Students Form</li>
        </ul>
        <div>
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setsearchValue(e.target.value)}
          />
          <span>
            <BiSearchAlt />
          </span>
        </div>
        <span className="Menu-m" onClick={() => setsidenav("0px")}>
          <GiHamburgerMenu />
        </span>
      </nav>
      <span className="Side-Nav" style={{ marginTop: sidenav }}>
        <ul>
          <li onClick={() => navigate("/")}>Home</li>
          <li onClick={() => navigate("/Examination")}>Examinations</li>
          <li onClick={() => navigate("/StudentForm")}>Students Form</li>
        </ul>
        <p onClick={() => setsidenav("-140px")}>X</p>
      </span>
    </div>
  );
}

export default Navbar;
