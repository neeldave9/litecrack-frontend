import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { fetchConfig } from "../utils/fetchConfig";
import {
  ProgressBar,
  Row,
  Col,
  Form,
  Button,
  Container,
  Alert,
} from "react-bootstrap";
import { useFileName } from "../context/FileContext";

/**
 * Renders a component that allows the user to upload a text file and select a word list.
 */
function UploadFiles() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState({ started: false, percentage: 0 });
  const [message, setMessage] = useState(null);
  const [wordList, setWordList] = useState([]);
  const { fileName, setFileName } = useFileName();
  /**
   * Fetches the list of available word lists from the backend.
   */
  useEffect(() => {
    wordListSelector();
  }, []);

  /**
   * Fetches the list of available word lists from the backend and sets the state.
   */
  const wordListSelector = async () => {
    const BACKEND_URL = await fetchConfig();
    axios
      .get(`${BACKEND_URL}/wordlist`)
      .then((response) => {
        const keys = response.data.map((item) => item.key);
        setWordList(keys);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /**
   * Handles the file upload process.
   */
  const handleUpload = async () => {
    await setProgress({ started: false, percentage: 0 });
    const BACKEND_URL = await fetchConfig();

    if (!file) {
      setMessage("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setMessage("Uploading file...");
    setProgress((prevState) => {
      return { ...prevState, started: true };
    });

    axios
      .post(`${BACKEND_URL}/wordlist/upload/${fileName}`, formData, {
        onUploadProgress: (progressEvent) => {
          setProgress((prevState) => {
            return { ...prevState, percentage: progressEvent.progress * 100 };
          });
        },
        headers: {
          "Custom-Header": "value",
        },
      })
      .then((res) => {
        setMessage("File uploaded successfully");
        wordListSelector();
      })
      .catch((error) => {
        setMessage(error.response.data.message);
        console.error(error);
      });
  };

  /**
   * Handles the change event of the word list dropdown.
   */
  const handleDropdownChange = (e) => {
    setFileName(e.target.value);
  };

  return (
    <Container>
      <Row>
        <Col md={50} className="text-left">
          <h5>Choose a file to upload:</h5>
          <Form>
            <Form.Group
              controlId="formFile"
              className="mb-3"
              style={{ display: "grid" }}
            >
              <Form.Control
                onChange={(e) => {
                  const selectedFile = e.target.files[0];
                  if (
                    selectedFile &&
                    selectedFile.type === "text/plain" &&
                    selectedFile.size <= 100000
                  ) {
                    setFile(selectedFile);
                    const fn = selectedFile.name;
                    const filteredName = fn.replace(".txt", "");
                    setFileName(filteredName);
                  } else {
                    setFile("");
                    setMessage("Please select a text file under 100kb");
                  }
                }}
                type="file"
                accept="text/plain"
              />
              <Button
                onClick={handleUpload}
                disabled={!file}
                variant="primary"
                style={{ marginTop: "10px", width: "100%" }}
              >
                Upload
              </Button>
            </Form.Group>

            {progress.started && (
              <ProgressBar
                now={progress.percentage}
                label={`${progress.percentage}%`}
                style={{ margin: "10px 0", height: "30px" }}
                bg="info"
              />
            )}

            {message && (
              <Alert
                variant={
                  message.includes("success")
                    ? "success"
                    : message.includes("Uploading")
                    ? "info"
                    : "danger"
                }
                dismissible
                onClose={() => setMessage("")}
              >
                {message}
              </Alert>
            )}
          </Form>
        </Col>
      </Row>

      <Row>
        <Col md={50}>
          <h5>Select a Word List:</h5>
          <Form style={{ margin: "10px 0" }}>
            <Form.Group style={{ margin: "10px 0" }}>
              <Form.Control
                as="select"
                value={fileName}
                onChange={handleDropdownChange}
                style={{ margin: "10px 0" }}
              >
                {wordList.map((word) => (
                  <option key={word} value={word}>
                    {word}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default UploadFiles;
