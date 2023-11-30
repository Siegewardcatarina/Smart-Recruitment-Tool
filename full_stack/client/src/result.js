import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import "./App.css";
import ControlledAccordions from "./ControlledAccordions";
// import "./LoginRegisterPage.css";

function Result(props) {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState(null);
  const [accordionData, setAccordionData] = useState([]);
  const [accordion, setAccordion] = useState(-1);
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState({});

  const handleLogout = async () => {
    // Perform your logout logic here
    try {
      const response = await axios.post("http://localhost:5000/logout");
      if (typeof props.token === "function") {
        props.token(); // Assuming this function is responsible for handling the token
      }
      navigate("/");
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Axios error:", error);
    }
  };

  function toggleAccordion(index) {
    setAccordion((prevState) => (prevState === index ? -1 : index));
  }

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handlePromptClick = async (prompt) => {
    setInputText(prompt);
    try {
      const token = localStorage.getItem("token"); // Replace 'yourTokenKey' with the actual key you use to store the token
      console.log(token);
      const response = await axios.post(
        "http://localhost:5000/process_text",
        {
          text: prompt,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + props.token,
          },
        }
      );
      // const { result, total_length } = response.data;
      console.log(response.data);
      if (typeof response.data.result === "string") {
        setResult(response.data.result.split(", "));
      } else {
        setResult([response.data.result]); // If not a string, treat it as a single item array
      }
      const newAccordionData = [
        ...accordionData,
        { prompt: prompt, result: response.data.result },
      ];
      setAccordionData(newAccordionData);
      console.log(newAccordionData);
    } catch (error) {
      console.error("Error sending request to the backend:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/process_text",
        {
          text: inputText,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + props.token,
          },
        }
      );
      console.log(response.data);
      if (typeof response.data.result === "string") {
        setResult(response.data.result.split(", "));
      } else {
        setResult([response.data.result]); // If not a string, treat it as a single item array
      }
      const newAccordionData = [
        ...accordionData,
        { prompt: inputText, result: response.data.result },
      ];
      setAccordionData(newAccordionData);
      console.log(newAccordionData);
    } catch (error) {
      console.error("Error sending request to the backend:", error);
    }
  };

  const renderAccordionItems = () => {
    if (accordionData && accordionData.length > 0) {
      return <ControlledAccordions accordionData={accordionData} />;
    } else {
      return null; // Or you can render a message or anything else when accordionData is null or empty
    }
  };

  const prompts = [
    "Give me names of employees from bangalore.",
    "Give me names of employees whose role is AI/ML architect with 3 years experience",
    "Give me number of employees whose stay in Jaipur",
  ];

  return (
    <div className="login-register-page">
      <Row>
        <div>
          <div style={{ marginBottom: "0.5rem" }}>
            <Label>Recommended Prompts:</Label>
          </div>
          <Row>
            {prompts.map((prompt, index) => (
              <Col
                xs="4"
                key={index}
                style={{ marginBottom: "0.5rem", cursor: "pointer" }}
                onClick={() => {
                  handlePromptClick(prompt);
                  document.getElementById("submitForm").click();
                }}
              >
                <div
                  style={{
                    width: "400px",
                    height: "40px",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    cursor: "pointer",
                    textDecoration: "underline",
                    color: "blue",
                  }}
                >
                  {prompt}
                </div>
              </Col>
            ))}
          </Row>
        </div>

        <Form id="submitForm" onSubmit={handleFormSubmit}>
          <FormGroup>
            <div style={{ marginBottom: "0.5rem" }}>
              <Label>Enter you prompt:</Label>
            </div>
            <Input
              style={{ width: "400px", height: "40px" }}
              type="textarea"
              value={inputText}
              onChange={handleInputChange}
              placeholder="Enter text"
            />
          </FormGroup>
          <div style={{ marginBottom: "0.5rem" }}>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </div>
        </Form>

        {renderAccordionItems()}

        {/* Display the result in a textarea only if results exist */}
        {result && (
          <div>
            <div style={{ marginBottom: "0.5rem" }}>
              <Label>Result</Label>
            </div>
            <textarea
              style={{ width: "400px" }}
              readOnly
              rows="10"
              value={result
                .map((item, index) => `${index + 1}. ${item}`)
                .join("\n")}
            />
          </div>
        )}
      </Row>
      <Row>
        <div>
          <Button color="danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Row>
    </div>
  );
}

export default Result;
