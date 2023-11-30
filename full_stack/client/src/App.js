// LoginRegisterPage.jsx
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Container, Form, FormGroup, Input } from "reactstrap";
import "./LoginRegisterPage.css"; // Import the CSS file for styling
const LoginRegisterPage = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(false); // State for login error
  const [emptyInputError, setEmptyInputError] = useState(false); // State for empty input error
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // const handleLogin = () => {
  //   // Check if the entered credentials are valid
  //   if (!username || !password) {
  //     // Check for empty inputs
  //     setEmptyInputError(true);
  //     setLoginError(false);
  //     toast.error("Please enter both username and password.");
  //     console.log("Please enter both username and password.");
  //     return;
  //   }

  //   if (username === "admin" && password === "admin123") {
  //     setLoggedIn(true);
  //     setLoginError(false);
  //     setEmptyInputError(false);
  //     // Handle any additional logic for a successful login
  //     console.log("Successfully logged in!");
  //     navigate("/recruit");
  //     toast.success("Welcome! You have successfully logged in.");
  //   } else {
  //     // Handle invalid login
  //     setLoginError(true);
  //     setEmptyInputError(false);
  //     toast.warning("Invalid credentials. Please try again.");
  //     console.log("Invalid credentials. Please try again.");
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.message);
      const { access_token, message } = response.data;
      if (access_token) {
        // Update the state with the token
        props.setToken(access_token);

        // Save the token to local storage
        localStorage.setItem("token", access_token);

        // Navigate to the "/recruit" route
        navigate("/recruit");
      } else {
        console.log(message);
      } // You can handle the success message accordingly
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Please check your email and password");
      } else {
        toast.error("Something went wrong please try again");
      }
    }
  };

  const handleRegister = () => {
    // Handle registration logic
    navigate("/register");
    console.log("Registering with:", { username, password });
  };

  return (
    <div className="login-register-page">
      <Container>
        <Form className="login-register-form">
          <h1>Login</h1>
          {/* {emptyInputError && (
            <Alert color="danger">
              Please enter both username and password.
            </Alert>
          )} */}
          {/* {loginError && (
            <Alert color="danger">Invalid credentials. Please try again.</Alert>
          )} */}
          <FormGroup
            className={`custom-input ${emptyInputError ? "error" : ""}`}
          >
            <Input
              style={{ marginBottom: "0.5rem" }}
              type="text"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Email ID"
            />
          </FormGroup>
          <FormGroup
            className={`custom-input ${emptyInputError ? "error" : ""}`}
          >
            <Input
              style={{ margin: "0.5rem" }}
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Password"
            />
          </FormGroup>
          <div>
            <Button
              className="btn-primary"
              style={{ marginLeft: "12rem", marginRight: "0.5rem" }}
              color="primary"
              onClick={handleLogin}
            >
              Login
            </Button>
            <Button color="secondary" onClick={handleRegister}>
              Register
            </Button>
          </div>
        </Form>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default LoginRegisterPage;
