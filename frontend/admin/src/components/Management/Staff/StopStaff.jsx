import React, { useEffect, useState } from 'react';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { Pagination, PaginationItem } from '@mui/material';

function StopStaff() {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',
    }));

    const CustomPaginationItem = styled(PaginationItem)(({ theme }) => ({
        '&.Mui-selected': {
            backgroundColor: '#89b847',
            color: 'white',
        },
    }));

    const StyleDiv = styled('div')({
        textAlign: 'center',
        marginTop: 20,
    });

    const StyleImg = styled('img')({
        width: '150px', // Điều chỉnh kích thước ảnh
        height: '250px',
        objectFit: 'cover',
        borderRadius: '5px',
        marginLeft: '10px',
    });

    const StyleDivItem = styled('div')({
        textAlign: 'left',
        color: '#000000',
    });

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;


    useEffect(() => {
        fetch('http://localhost:5000/nhan-vien')
            .then(response => response.json())
            .then(data => {
                const filteredData = data.filter(employee => employee.trang_thai === 0);
                // console.log(filteredData);
                setData(filteredData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    // Xử lý thay đổi trang
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // Tính toán dữ liệu nhân viên hiển thị trên mỗi trang
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const Gender = (data) => {
        if (data === 1) {
            return 'Nam';
        } else {
            return 'Nữ';
        }
    };

    return (
        <div>
            <StyleDiv>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {currentData.map((item, index) => (
                        <Grid key={`${item.id}-${index}`} item xs={6}>
                            <Item>
                                <Grid item xs={4}>
                                    <StyleImg src={item.image_nv} alt={item.Ten_Nhan_Vien} />
                                </Grid>
                                <Grid item xs={6}>
                                    <StyleDivItem>
                                        <p>Tên Giáo Viên: {item.Ten_Nhan_Vien}</p>
                                        <p>Ngày sinh: {formatDate(item.Ngay_sinh)}</p>
                                        <p>Giới tính: {Gender(item.Gioi_tinh)}</p>
                                        <p>Địa chỉ: {item.Dia_chi}</p>
                                        <p>Quê quán: {item.Que_quan}</p>
                                        <p>Số điện thoại: {item.Sdt}</p>
                                        <p>CCCD: {item.CMND}</p>
                                        <p>Công việc:  {item.Ten_chuc_vu}</p>
                                    </StyleDivItem>
                                </Grid>
                            </Item>
                        </Grid>
                    ))}
                </Grid>
            </StyleDiv>

            <Pagination
                count={Math.ceil(data.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                sx={{
                    marginTop: 2,
                    justifyContent: 'center',
                    display: 'flex',
                }}

                renderItem={(item) => <CustomPaginationItem {...item} />}
            />
        </div>
    );
}

export default StopStaff;

