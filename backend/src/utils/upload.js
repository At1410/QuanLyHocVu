const upload async (req, res, next) => {
    try {
        await upload(req, res);
        if (req.file == undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
        }
        next();
    } catch (error) {
        console.error('Upload error:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
}