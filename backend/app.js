const express = require('express');
const app = express();

// Middleware để parse JSON
app.use(express.json());

// Tạo một route
app.get('/', (req, res) => {
    res.send('Hello, welcome to the project!');
});

// Cấu hình port và khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
