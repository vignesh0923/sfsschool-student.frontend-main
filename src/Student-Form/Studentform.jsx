import { useState } from "react";
import "./Studentform.css";

function Studentform() {
  // Use State to manage the input fields values
  const [standard, setStandard] = useState("");
  const [group, setGroup] = useState("");
  const [section, setSection] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  // const [qrCodeUrl, setQrCodeUrl] = useState("");

  // Function to handle Input  Image to Base64
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Functio For Sendind Data To Server
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
      name: formData.get("user_name"),
      fatherName: formData.get("user_father"),
      motherName: formData.get("user_mother"),
      gender: formData.get("user_gender"),
      address: formData.get("user_address"),
      dateOfBirth: formData.get("user_dob"),
      phoneNumber: formData.get("user_phonenumber"),
      image: imageBase64,
      standard: standard,
      group: group,
      section: section,
    };

    try {
      const response = await fetch(
        "https://student-api.sfsschoolpudukkottai.org/studentDetail/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) throw new Error("Network response was not ok.");
      const responseData = await response.json();
      alert("Form submitted successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="main">
      <div className="head">
        <h1>Add Student Details</h1>
      </div>
      <form className="staff-form" onSubmit={handleSubmit}>
        <div>
          <p>First Name :</p>
          <input type="text" name="user_name" required />
          <p>Father's Name :</p>
          <input type="text" name="user_father" required />
          <p>Mother's Name :</p>
          <input type="text" name="user_mother" required />
          <p>Gender :</p>
          <input
            type="radio"
            required
            name="user_gender"
            style={{ width: "50px" }}
            value="Male"
          />
          Male
          <input
            type="radio"
            required
            name="user_gender"
            style={{ width: "50px" }}
            value="Female"
          />
          Female
        </div>
        <div>
          <p>Address :</p>
          <input
            type="text"
            name="user_address"
            required
            style={{
              color: "black",
            }}
          />
          <p>Date of Birth :</p>
          <input type="date" name="user_dob" required />
          <p>Phone Number :</p>
          <input
            type="tel"
            name="user_phonenumber"
            required
            pattern="[0-9]{10}"
          />
          <p>Select Image :</p>
          <input
            type="file"
            accept=".jpeg , .jpg , .png"
            required
            onChange={handleFileChange}
          />
        </div>

        <div className="right-div">
          <p>Select Standard :</p>
          <select
            onChange={(e) => setStandard(e.target.value)}
            value={standard}
          >
            <option value="select">select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="LKG">LKG</option>
            <option value="UKG">UKG</option>
          </select>
          <p>Select Group : (Only for 11'th 12'th)</p>
          <select onChange={(e) => setGroup(e.target.value)} value={group}>
            <option>Subject</option>
            <option>Computer Science</option>
            <option>Biology</option>
            <option>Economics</option>
            <option>Commerce</option>
            <option>Accounts</option>
          </select>
          <p>Select Section :</p>
          <select onChange={(e) => setSection(e.target.value)} value={section}>
            <option>Section</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
            <option>D</option>
            <option>E</option>
          </select>
          <input type="submit" value="Submit" className="btn-1" />
        </div>
      </form>
      {/* {qrCodeUrl && <img src={qrCodeUrl} alt="Student Details QR Code" />} */}
    </div>
  );
}

export default Studentform;
