import React, { useEffect, useState } from "react";

import {
    Paper, styled, Pagination,
    PaginationItem, Grid, Typography
} from '@mui/material';

import ReorderIcon from '@mui/icons-material/Reorder';
import ReplayIcon from '@mui/icons-material/Replay';

import InClassStop from "./InClassStop";
import SearchClass from "./SearchClass";

import axios from 'axios';
import Swal from 'sweetalert2';

export default function ClassStop() {

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

    const StyleButton = styled('button')({
        color: '#89b847',
        borderRadius: 3,
        backgroundColor: "#fffff",
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        border: '2px solid #89b847',
        borderColor: "#89b847",
        alignItems: 'left',
        '&:hover': {
            cursor: 'pointer',
        }
    });

    const StyleDiv = styled('div')({
        textAlign: 'center',
        marginTop: 20,
    });

    const StyleDivItem = styled('div')({
        textAlign: 'left',
        color: '#000000',
        marginLeft: 20,
    });


    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/lop-loai`)
            .then(response => response.json())
            .then(data => {
                const filteredData = data.filter(item => item.trang_thai === 0);
                setData(filteredData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const filteredData = data.filter(item =>
        item.Ten_lop && item.Ten_lop.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [classList, setClassList] = useState({
        Loai_lop: '',
        Ten_lop: '',
        Ngay_DB: '',
        Ngay_KT: '',
        So_luong: '',
        SL_giaovien: '',
        Hoc_phi: '',
    });

    console.log(classList);

    const handleTick = async (id, trang_thai) => {

        setClassList({
            Loai_lop: data.Loai_lop,
            Ten_lop: data.Ten_lop,
            Ngay_DB: data.Ngay_DB,
            Ngay_KT: data.Ngay_KT,
            So_luong: data.So_luong,
            SL_giaovien: data.SL_giaovien,
            Hoc_phi: data.Hoc_phi,
        });

        try {
            const result = await Swal.fire({
                title: 'Bạn có chắc chắn không?',
                text: 'Bạn có chắc chắn rằng lớp học chưa hoàn thành hay không!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Có',
                cancelButtonText: 'Hủy'
            });

            if (!result.isConfirmed) return;

            const newStatus = trang_thai === 1 ? 0 : 1;

            await axios.put(`${process.env.REACT_APP_API_URL}/trang-thai-lop/${id}`, { ...setClassList, trang_thai: newStatus });

            setData((prevData) =>
                prevData.map((item) => (item.id === id ? { ...item, trang_thai: newStatus } : item))
            );

            Swal.fire(
                'Đã cập nhât!',
                'Lớp học đã được khôi phục trạng thái!',
                'success'
            );

        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
            Swal.fire(
                'Lỗi!',
                'Có lỗi xảy ra khi cập nhật dữ liệu.',
                'error'
            );
        }
    };

    const [openModal, setOpenModal] = useState(false);
    const [currentClassId, setCurrentClassId] = useState(null);

    const handleOpenModal = (item) => {
        setCurrentClassId(item.id);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px',
            }}>
                <SearchClass onSearch={handleSearch} />
            </div>

            {filteredData.length === 0 ? (
                <Typography sx={{ textAlign: 'center', marginTop: 2, fontSize: 18, color: '#000000' }}>
                    Không tìm thấy lớp phù hợp.
                </Typography>
            ) : (

                <StyleDiv>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {currentData.map((item) => (
                            <Grid key={item.id} item xs={4}>
                                <Item>
                                    <Grid item xs={10}>
                                        <StyleDivItem>
                                            <p>Loại lớp: {item.Loai_lop}</p>
                                            <p>Mã lớp: {item.id}</p>
                                            <p>Tên lớp: {item.Ten_lop}</p>
                                            <p>Ngày bắt đầu: {formatDate(item.Ngay_DB)}</p>
                                            <p>Ngày kết thúc: {formatDate(item.Ngay_KT)}</p>
                                            <p>Số lượng trẻ: {item.So_luong}</p>
                                            <p>Số lượng giáo viên: {item.SL_giaovien}</p>
                                            <p>Học phí: {item.Hoc_phi}</p>
                                        </StyleDivItem>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            marginRight: '10px',
                                            marginLeft: '10px'
                                        }}>
                                            <StyleButton
                                                onClick={() => handleOpenModal(item)}
                                                sx={{
                                                    '&:hover': {
                                                        backgroundColor: "#75a73f",
                                                        color: "#ffffff",
                                                    },
                                                }}>
                                                <ReorderIcon />
                                            </StyleButton>
                                            <StyleButton
                                                onClick={() => handleTick(item.id)}
                                                sx={{
                                                    '&:hover': {
                                                        backgroundColor: "#75a73f",
                                                        color: "#ffffff",
                                                    },
                                                }}>
                                                <ReplayIcon />
                                            </StyleButton>
                                        </div>
                                    </Grid>
                                </Item>
                            </Grid>
                        ))}

                    </Grid>
                </StyleDiv>

            )}



            <Pagination
                count={Math.ceil(filteredData.length / itemsPerPage)}
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

            <InClassStop
                open={openModal}
                handleClose={handleCloseModal}
                classId={currentClassId}
            />
        </div>
    );
};