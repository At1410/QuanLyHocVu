import React, { useEffect, useState } from 'react';

import { styled, Pagination, PaginationItem } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function Teacher() {
    //Style
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
        textAlign: 'left',
        display: 'flex', // Sử dụng flexbox để bố trí các phần tử ngang hàng
        alignItems: 'center',
    }));

    const CustomPaginationItem = styled(PaginationItem)(({ theme }) => ({
        '&.Mui-selected': {
            backgroundColor: '#ff99ac',
            color: 'white',
        },
    }));

    const StyleDiv = styled('div')({
        textAlign: 'center',
        marginTop: 90,
        marginBottom: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '1200px',
        paddingLeft: '15px',
        paddingRight: '15px',
    });

    const StyleImg = styled('img')({
        width: '150px', // Điều chỉnh kích thước ảnh
        height: '150px',
        objectFit: 'cover',
        borderRadius: '5px',
        marginRight: '20px', // Thêm khoảng cách giữa ảnh và thông tin
    });

    const StyleDivItem = styled('div')({
        textAlign: 'left',
        marginLeft: 10,
        color: '#000000',
    });

    //Xử lý
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/giao-vien')
            .then(response => response.json())
            .then(data => {
                const filteredData = data.filter(employee => employee.trang_thai === 1);
                setData(filteredData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

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

    //Hiện thị
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    // Xử lý thay đổi trang
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // Tính toán dữ liệu nhân viên hiển thị trên mỗi trang
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <StyleDiv>
            <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                direction={isMobile ? 'column' : 'row'}
            >
                {currentData.map(item => (
                    <Grid item xs={6} key={`${item.id}-${item.Ten_Nhan_Vien}`}>
                        <Item>
                            <StyleImg src={item.image_nv} alt={item.Ten_Nhan_Vien} />
                            <StyleDivItem>
                                <p>Tên Giáo Viên: {item.Ten_Nhan_Vien}</p>
                                <p>Ngày sinh: {formatDate(item.Ngay_sinh)}</p>
                                <p>Giới tính: {Gender(item.Gioi_tinh)}</p>
                            </StyleDivItem>
                        </Item>
                    </Grid>
                ))}

            </Grid>

            <Pagination
                count={Math.ceil(data.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                sx={{
                    marginTop: 2,
                    justifyContent: 'center',
                    display: 'flex',
                    color: '#89b847'
                }}

                renderItem={(item) => <CustomPaginationItem {...item} />}
            />
        </StyleDiv>
    );
}

export default Teacher;