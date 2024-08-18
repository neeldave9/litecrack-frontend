import React, { useContext } from "react";
import axios from "axios";
import { fetchConfig } from "../utils/fetchConfig";
import { useState, useRef, useEffect } from "react";
import { useFileName } from "../context/FileContext";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";

function DecryptHash() {
  const [hash, setHash] = useState("");
  const [decryptMessage, setDecryptMessage] = useState("");
  const [isDecrypting, setIsDecrypting] = useState(false);
  const intervalRef = useRef(null);

  const { fileName, setFileName } = useFileName();

  const handleHashChange = (event) => {
    setHash(event.target.value);
  };

  /**
   * Decrypts the hash entered by the user using the selected wordlist.
   */
  const onDecryptClick = async () => {
    if (!hash) {
      setDecryptMessage("No hash entered");
      return;
    }

    console.log(fileName);
    const BACKEND_URL = await fetchConfig();
    setIsDecrypting(true);

    axios
      .post(`${BACKEND_URL}/hash/upload`, {
        hash: hash,
        wordlist: fileName,
      })
      .then((response) => {
        console.log(response);
        if (response.data.hashed) {
          setDecryptMessage(response.data.hashed);
          setIsDecrypting(false);
        } else if (response.data.status === "PENDING") {
          setDecryptMessage("Still Cracking...");
        } else if (response.data.status === "FAILED") {
          setDecryptMessage("Failed to crack the hash.");
          setIsDecrypting(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setIsDecrypting(false);
      });
  };

  /**
   * Checks if the user is decrypting a hash and sets an interval to check the status of the decryption.
   */
  useEffect(() => {
    if (isDecrypting) {
      intervalRef.current = setInterval(() => {
        onDecryptClick();
      }, 3000);
      setDecryptMessage("Decrypting...");
    }
    return () => clearInterval(intervalRef.current);
  }, [isDecrypting]);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={50}>
          <Form>
            <Row md>
              <Col md={50}>
                <h5>Enter a Hash:</h5>
                <Form.Group controlId="formHash">
                  <Form.Control
                    type="text"
                    placeholder="Enter hash"
                    onChange={handleHashChange}
                    size="lg"
                    style={{ width: "100%" }}
                  />
                </Form.Group>
              </Col>
              <Col md={20} className="d-flex align-items-end">
                <Button
                  variant="primary"
                  onClick={onDecryptClick}
                  disabled={isDecrypting}
                  style={{ marginTop: "10px", width: "100%" }}
                >
                  {isDecrypting ? (
                    <>
                      <Spinner animation="border" size="sm" /> Decrypting...
                    </>
                  ) : (
                    "Decrypt"
                  )}
                </Button>
              </Col>
            </Row>
            {decryptMessage && (
              <Alert
                dismissible
                onClose={() => setDecryptMessage("")}
                variant={
                  decryptMessage.includes("Failed")
                    ? "danger"
                    : isDecrypting
                    ? "info"
                    : "success"
                }
                className="mt-3"
              >
                {decryptMessage}
              </Alert>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default DecryptHash;
