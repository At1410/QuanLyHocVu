import React, { useEffect, useState } from 'react';
import { Grid, styled, Pagination, PaginationItem, Paper } from "@mui/material";

export default function RegisterLeave() {

    //Style
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
        textAlign: 'center',
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
        marginTop: '15px',
    });

    const StyleDivItem = styled('div')({
        textAlign: 'left',
        color: '#000000',
        marginLeft: 30,
    });

    //Xử lý
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/dk-nghi-hoc`)
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${day}-${month}-${year}`;
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
                        <Grid key={index} item xs={6} >
                            <Item>
                                <StyleDivItem>
                                    <p>Mã trẻ: {item.id_tre}</p>
                                    <p>Họ tên trẻ: {item.Ten_tre}</p>
                                    <p>Ngày sinh: {formatDate(item.Ngay_sinh)}</p>
                                    <p>Giới tính:  {Gender(item.Gioi_tinh)} </p>
                                    <p>Ngày nghỉ: {formatDate(item.ngay_nghi)}</p>
                                    <p>Ngày đi học lại: {formatDate(item.ngay_hoc_lai)}</p>
                                    <p>Lý do: {item.ly_do}</p>
                                </StyleDivItem>
                            </Item>
                        </Grid>
                    ))}
                </Grid>
            </StyleDiv >

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
        </div >
    );
}