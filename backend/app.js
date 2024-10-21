const express = require('express');
const db = require('./src/db/db');
const cors = require('cors');
const app = express();

// Middleware để parse JSON
app.use(express.json());
app.use(cors());


const multer = require('multer');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const upload = multer({ dest: 'uploads/' }); // Lưu file tạm thời vào thư mục 'uploads'

// Cấu hình Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

// Route để upload ảnh
app.post('/upload', upload.single('file'), (req, res) => {
    const path = req.file.path; // Lấy đường dẫn file tạm thời

    // Upload lên Cloudinary
    cloudinary.uploader.upload(path, { folder: 'employee_photos' }, (error, result) => {
        if (error) {
            return res.status(500).send('Error uploading to Cloudinary');
        }

        res.json({ url: result.secure_url });
    });
});

// Import router từ tệp routes.js
const routesGet = require('./src/routes/route');
const routesPost = require('./src/routes/routerPost');
const routesPut = require('./src/routes/routerPut');
const routesDelete = require('./src/routes/routerDelete');
const routesFind = require('./src/routes/routerFind');

// Sử dụng router cho các route;

app.use('/', routesGet);

app.get('/tim-kiem/nhan-vien', routesFind);
app.get('/tim-kiem/thong-tin', routesFind);

app.post('/dang-ky', routesPost);
app.post('/thong-tin', routesPost);
app.post('/nhan-vien', routesPost);
app.post('/treem-phuhuynh', routesPost);
app.post('/lop', routesPost);
app.post('/them-tre/:id_lop/:id_treem', routesPost);
app.post('/giang-day/:id_Lop/:id_GV', routesPost);
app.post('/dk-nghi-hoc/:id_tre', routesPost);

app.put('/thong-tin/:id', routesPut);
app.put('/nhan-vien/:id', routesPut);
app.put('/lop/:id', routesPut);
app.put('/trang-thai/:id', routesPut);
app.put('/danh_dau/:id', routesPut);
app.put('/tre-em/:id', routesPut);
app.put('/phu-huynh/:id', routesPut);
app.put('/trang-thai-tre/:id', routesPut);
app.put('/trang-thai-lop/:id', routesPut);


app.delete('/thong-tin/:id', routesDelete);
app.delete('/nhan-vien/:id', routesDelete);
app.delete('/phieuDK/:id', routesDelete);
app.delete('/lop/:id', routesDelete);
app.delete('/tre-em/:id', routesDelete);
app.delete('/phu-huynh/:id', routesDelete);
app.delete('/tham-gia/:id_lop/:id_treem', routesDelete);
app.delete('/giang-day/:id_Lop/:id_GV', routesDelete);


// Cấu hình port và khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

