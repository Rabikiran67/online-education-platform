import React, { useState } from "react";
import { Button, LinearProgress, Typography, Box } from "@mui/material";
import { storage } from "../services/firebase"; // Import Firebase Storage service
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Firebase storage methods

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    setUploading(true);

    // Create a reference to Firebase Storage with a file path
    const storageRef = ref(storage, `uploads/${selectedFile.name}`);

    // Upload the file using uploadBytesResumable for progress tracking
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    // Monitor upload progress
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get progress percentage
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        // Handle errors
        console.error("Upload failed:", error);
        setUploading(false);
      },
      () => {
        // Get the download URL once the upload is complete
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setDownloadURL(url); // Store the download URL
          setUploading(false);
          alert("File uploaded successfully!");
        });
      }
    );
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", my: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Upload Your File
      </Typography>

      {/* File selection input */}
      <input
        accept="image/*,application/pdf"
        type="file"
        onChange={handleFileChange}
        style={{ marginBottom: "16px" }}
      />

      {/* File upload button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={uploading || !selectedFile}
        sx={{ mb: 2 }}
      >
        {uploading ? "Uploading..." : "Upload"}
      </Button>

      {/* Progress bar */}
      {uploading && (
        <Box sx={{ width: "100%", mb: 2 }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      )}

      {/* Display download URL */}
      {downloadURL && (
        <Typography variant="body2" color="textSecondary">
          File uploaded successfully!{" "}
          <a href={downloadURL} target="_blank" rel="noopener noreferrer">
            View File
          </a>
        </Typography>
      )}
    </Box>
  );
};

export default FileUpload;
