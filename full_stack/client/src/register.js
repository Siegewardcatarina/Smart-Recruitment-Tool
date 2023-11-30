import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    confirm_password: "",
    // csrf_token: "", // Include CSRF token in the form state
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const csrfResponse = await axios.get("http://localhost:5000/csrf_token");
      // const csrfToken = csrfResponse.data.csrf_token;
      // const formDataWithCSRF = {
      //   ...formData,
      //   csrf_token: csrfToken,
      // };
      const response = await axios.post(
        "http://localhost:5000/register",
        formData, // Use formDataWithCSRF instead of formData
        {
          headers: {
            "Content-Type": "application/json",
            // "X-CSRFToken": csrfToken, // Include the CSRF token in the headers
          },
        }
      );
      console.log(response);
      navigate("/");
    } catch (error) {
      console.error("Axios error:", error.response.data.error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <div>
      <h1>Registration</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="number">Phone Number:</label>
        <input
          type="text"
          id="number"
          name="number"
          value={formData.number}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="confirm_password">Confirm Password:</label>
        <input
          type="password"
          id="confirm_password"
          name="confirm_password"
          value={formData.confirm_password}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account? <a href="/">Log in here</a>.
      </p>
      <ToastContainer />
    </div>
  );
};

export default Register;
