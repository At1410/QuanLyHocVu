import React, { useEffect, useState } from "react";


import { Paper, styled, Pagination, PaginationItem, Grid } from '@mui/material';

import ReorderIcon from '@mui/icons-material/Reorder';
import ReplayIcon from '@mui/icons-material/Replay';

import Swal from 'sweetalert2';
import axios from "axios";
import ModalParents from "./ModalParents";

export default function ChildStop() {

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
        borderRadius: 3,
        backgroundColor: "#ffffff",
        color: '#89b847',
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        border: '2px solid #89b847',
        borderColor: "#89b847",
        alignItems: 'left',
        '&:hover': {
            backgroundColor: '#89b847',
            color: '#ffffff',
            cursor: 'pointer',
        }
    });

    const StyleDiv = styled('div')({
        textAlign: 'center',
        marginTop: 30,
    });

    const StyleDivItem = styled('div')({
        textAlign: 'left',
        color: '#000000',
        marginLeft: 10,
    });


    const [data, setData] = useState([]);
    const [parent, setParent] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        fetch('http://localhost:5000/tre-em')
            .then(response => response.json())
            .then(data => {
                const filteredData = data.filter(item => item.Trang_thai === 0);
                setData(filteredData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        fetch('http://localhost:5000/phu-huynh')
            .then(response => response.json())
            .then(data => {
                setParent(data);
            })
            .catch(error => {
                console.error('Error fetching parent:', error);
            });
    }, []);

    const [isModalParentsOpen, setIsModalParentsOpen] = useState(false);
    const [ParentOf, setParentOf] = useState([]);

    const handleOpenModalParents = (item) => {
        const filterParent = parent.filter(parent => parent.id_PH === item.PH_id);
        console.log(filterParent);
        setParentOf(filterParent);
        setIsModalParentsOpen(true);
    };

    const handleCloseModalParents = () => {
        setIsModalParentsOpen(false);
    };

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
        return `${year}-${month}-${day}`;
    };

    const Gender = (data) => {
        if (data === 1) {
            return 'Nam';
        } else {
            return 'Nữ';
        }
    };

    const [childList, setChildList] = useState({
        Ten_tre: '',
        Gioi_tinh: '',
        Ngay_sinh: '',
        Suc_khoe: '',
    });

    console.log(childList);

    const handleTick = async (id, Trang_thai) => {

        setChildList({
            Ten_tre: data.Ten_tre,
            Gioi_tinh: data.Gioi_tinh,
            Ngay_sinh: data.Ngay_sinh,
            Suc_khoe: data.Suc_khoe,
        });

        try {
            const result = await Swal.fire({
                title: 'Bạn có chắc chắn không?',
                text: 'Bạn có chắc chắn rằng trẻ sẽ tiếp tục học tại nhà trẻ không!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Có',
                cancelButtonText: 'Hủy'
            });

            if (!result.isConfirmed) return;

            const newStatus = Trang_thai === 1 ? 0 : 1;

            await axios.put(`http://localhost:5000/trang-thai-tre/${id}`, { ...setChildList, Trang_thai: newStatus });

            setData((prevData) =>
                prevData.map((item) => (item.id === id ? { ...item, Trang_thai: newStatus } : item))
            );

            Swal.fire(
                'Đã cập nhât!',
                'Trẻ em sẽ được tiếp tục theo học!',
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

    return (
        <div>
            <StyleDiv>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {currentData.map(item => (
                        <Grid key={item.id} item xs={4}>
                            <Item>
                                <Grid item xs={10}>
                                    <StyleDivItem>
                                        <p>Mã trẻ: {item.id}</p>
                                        <p>Tên trẻ: {item.Ten_tre}</p>
                                        <p>Giới tính: {Gender(item.Gioi_tinh)}</p>
                                        <p>Ngày sinh: {formatDate(item.Ngay_sinh)}</p>
                                        <p>Sức khỏe: {item.Suc_khoe}</p>
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
                                            onClick={() => handleOpenModalParents(item)}
                                        >
                                            <ReorderIcon />
                                        </StyleButton>
                                        <StyleButton
                                            onClick={() => handleTick(item.id, item.Trang_thai)}
                                        >
                                            <ReplayIcon />
                                        </StyleButton>
                                    </div>
                                </Grid>
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
                    color: '#89b847'
                }}

                renderItem={(item) => <CustomPaginationItem {...item} />}
            />

            <ModalParents open={isModalParentsOpen} handleClose={handleCloseModalParents} parent={ParentOf} />
        </div >
    );
}