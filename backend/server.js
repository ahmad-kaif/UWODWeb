require("dotenv").config();

const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const { spawn } = require("child_process");

const app = express();

// === Serve Annotated Images ===
app.use("/annotated", express.static(path.join(__dirname, "annotated")));

// === Multer Setup ===
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "uploads";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + "-" + Math.round(Math.random() * 1e9) + ext);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|bmp|tiff|tif|webp)$/)) {
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
});

// === Middleware ===
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "https://uwodweb.onrender.com",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// === Main Detection Route ===
app.post("/api/detect", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image file provided" });
  }

  console.log("Received file:", req.file);

  try {
    const pythonProcess = spawn("python3", [
      path.join(__dirname, "ai-model/detect.py"),
      "--image",
      req.file.path,
    ]);

    let result = "";
    let error = "";

    pythonProcess.stdout.on("data", (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      error += data.toString();
    });

    pythonProcess.on("close", (code) => {
      try {
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
      } catch (err) {
        console.error("Error deleting uploaded file:", err);
      }

      if (code !== 0) {
        console.error("Python process error:", error);
        return res.status(500).json({ error: "Detection failed" });
      }

      try {
        const { detections, annotated_image_path } = JSON.parse(result);

        if (!detections || detections.length === 0) {
          return res.json({
            message: "No objects detected in the image",
            detections: [],
          });
        }

        // Extract filename and form public URL
        const fileName = path.basename(annotated_image_path);
        const imageUrl = `${req.protocol}://${req.get("host")}/annotated/${fileName}`;

        return res.json({
          message: "Detection successful",
          detections,
          imageUrl,
        });

      } catch (e) {
        console.error("Failed to process detection results:", e);
        console.error("Raw output:", result);
        res.status(500).json({ error: "Failed to process detection results" });
      }
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error occurred" });
  }
});

// === Start Server ===
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
