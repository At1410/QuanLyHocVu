const express = require('express');
const db = require('./src/db/db');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const fs = require("fs");
require('dotenv').config();


const routesGet = require('./src/routes/route');
const routesPost = require('./src/routes/routerPost');
const routesPut = require('./src/routes/routerPut');
const routesDelete = require('./src/routes/routerDelete');
const routesFind = require('./src/routes/routerFind');
const uploadRoutes = require('./src/uploads/uploads.js');

app.use('/', routesGet);

app.use("/", uploadRoutes);

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

