import React, { useState, useEffect, useRef } from "react";
import "./App.css"; // You can style modal here

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const modalRef = useRef();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: ""
  });

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleClose();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

const handleSubmit = (e) => {
  e.preventDefault();
  const { username, email, phone, dob } = formData;

  if (!username) {
    alert("Please fill out the Username.");
    return;
  }
  if (!email) {
    alert("Please fill out the Email Address.");
    return;
  }
  if (!phone) {
    alert("Please fill out the Phone Number.");
    return;
  }
  if (!dob) {
    alert("Please fill out the Date of Birth.");
    return;
  }

  // Email must contain "@"
  if (!email.includes("@")) {
    alert("Invalid email. Please check your email address.");
    return;
  }

  // Phone number must be exactly 10 digits
  if (!/^\d{10}$/.test(phone)) {
    alert("Invalid phone number. Please enter a 10-digit phone number.");
    return;
  }

  // Date of birth cannot be in the future
  const selectedDate = new Date(dob);
  const today = new Date();

  // Remove time portion for accurate comparison
  selectedDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  if (selectedDate > today) {
    alert("Invalid date of birth. Date of birth cannot be in the future.");
    return;
  }

  // All fields are valid
  alert("Form submitted successfully!");

  setFormData({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });
  setModalOpen(false);
};


  return (
    <div className="App">
      <h1>User Details Modal</h1>
      <button onClick={handleOpen}>Open Form</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content" ref={modalRef}>
            <h2>Fill Details</h2>
            <form onSubmit={handleSubmit}>
              <label>Username:</label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleChange}
              />

              <label>Email Address:</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />

              <label>Phone Number:</label>
              <input
                type="text"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
              />

              <label>Date of Birth:</label>
              <input
                type="date"
                id="dob"
                value={formData.dob}
                onChange={handleChange}
              />

              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
