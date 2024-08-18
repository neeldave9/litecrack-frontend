import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import UploadFiles from "../../components/UploadFiles";
import DecryptHash from "../../components/DecryptHash";
import logo from "../../assets/logo.png";
import { useEffect } from "react";
import { fetchConfig } from "../../utils/fetchConfig";
import axios from "axios";
import NetworkError from "../../components/NetworkError";
import FileNameProvider from "../../context/FileContext";

const Home = () => {
  const [error, setError] = useState(false);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    const checkBackendUrl = async () => {
      try {
        const BACKEND_URL = await fetchConfig();
        const response = await axios.get(`${BACKEND_URL}/wordlist`);
        if (response.status === 200) {
          console.log("Backend URL is available and can be connected to.");
        }
      } catch (error) {
        setError(true);
      }
    };
    checkBackendUrl();
  }, []);

  if (error) {
    return <NetworkError />;
  }
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#0066CC",
      }}
    >
      <Container
        style={{
          border: "1px solid black",
          padding: "20px",
          backgroundColor: "white",
          maxWidth: "max-content",
        }}
      >
        <Row style={{ marginBottom: "10px" }}>
          <Col>
            <div style={{ textAlign: "center" }}>
              <img
                src={logo}
                alt="LiteCrack Logo"
                style={{ width: "100px", height: "100px" }}
              />
              <h1>LiteCrack</h1>
            </div>
          </Col>
        </Row>
        <FileNameProvider>
          <Row style={{ marginBottom: "10px" }}>
            <Col xs={12} md={20}>
              <UploadFiles />
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col xs={12} md={30}>
              <DecryptHash />
            </Col>
          </Row>
        </FileNameProvider>
      </Container>
    </div>
  );
};

export default Home;
