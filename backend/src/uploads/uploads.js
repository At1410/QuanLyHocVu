const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const router = express.Router();


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "employee_photos",
        allowed_formats: ["jpg", "png", "jpeg"],
    },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("image_nv"), (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }

    const imageUrl = req.file.path;

    res.status(200).json({ url: imageUrl });
});

module.exports = router;