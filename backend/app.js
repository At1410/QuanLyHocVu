const express = require('express');
const db = require('./src/db/db');
const cors = require('cors');
const app = express();

// Middleware để parse JSON
app.use(express.json());
app.use(cors());

// Import router từ tệp routes.js
const routes = require('./src/routes/route');

// Sử dụng router cho các route
app.use('/', routes);
app.use('/giao-vien', routes);
app.use('/loai', routes);
app.use('/thong-tin', routes);
app.use('/nhan-vien', routes);
app.use('/dang-ky', routes);

// Cấu hình port và khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

