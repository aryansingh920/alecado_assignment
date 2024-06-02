// App.js

import React, { useState } from "react";
import axios from "axios";

// Create an instance of axios with baseURL
const api = axios.create({
  baseURL: "http://localhost:3005", // Replace with your backend URL
});

function App() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [message, setMessage] = useState("");
  const [fileHash, setFileHash] = useState("");
  const [signature, setSignature] = useState("");

  // Function to handle file upload
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  // Function to upload and sign the file
  const uploadFile = async () => {
    try
    {
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post("/uploadFile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success)
      {
        setMessage(`File uploaded successfully. Transaction hash: ${response.data.transactionHash}`);
      } else
      {
        setMessage(`Error: ${response.data.error}`);
      }
    } catch (error)
    {
      console.error("Error:", error);
      setMessage(`Error: ${error.message}`);
    }
  };

  // Function to get file's information and signature
  const getFileInformation = async () => {
    try
    {
      const response = await api.get(`/getFile/${fileName}`);

      if (response.data.success)
      {
        setFileHash(response.data.fileHash);
        setSignature(response.data.signature);
        setMessage("File information and signature retrieved successfully.");
      } else
      {
        setMessage(`Error: ${response.data.error}`);
      }
    } catch (error)
    {
      console.error("Error:", error);
      setMessage(`Error: ${error.message}`);
    }
  };

  // Function to sign the file
  const signFile = async () => {
    try
    {
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post("/signFile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success)
      {
        setFileHash(response.data.fileHash);
        setSignature(response.data.signature);
        setMessage("File signed successfully.");
      } else
      {
        setMessage(`Error: ${response.data.error}`);
      }
    } catch (error)
    {
      console.error("Error:", error);
      setMessage(`Error: ${error.message}`);
    }
  };

  // Function to check where a file is signed
  const checkSignature = async () => {
    try
    {
      const response = await api.get(`/checkSignature/${fileHash}`);

      if (response.data.success)
      {
        setMessage(`File with hash ${fileHash} is signed: ${response.data.signature}`);
      } else
      {
        setMessage(`Error: ${response.data.error}`);
      }
    } catch (error)
    {
      console.error("Error:", error);
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>File Signing Application</h1>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={uploadFile}>Upload & Sign File</button>
      </div>
      <hr />
      {message && <p>{message}</p>}
      <div>
        <button onClick={getFileInformation}>Get File Information & Signature</button>
        <button onClick={signFile}>Sign File</button>
        <button onClick={checkSignature}>Check Signature</button>
        <hr />
      </div>
      <div>
        <h3>File Information</h3>
        <p>File Name: {fileName}</p>
        <p>File Hash: {fileHash}</p>
        <p>Signature: {signature}</p>
      </div>
    </div>
  );
}

export default App;
