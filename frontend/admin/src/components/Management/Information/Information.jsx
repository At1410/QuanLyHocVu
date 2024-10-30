import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Grid, Modal, styled, Typography, TextField, Button, Box, Pagination, PaginationItem } from "@mui/material";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Information({ searchTerm }) {
    // Style
    const CustomPaginationItem = styled(PaginationItem)(({ theme }) => ({
        '&.Mui-selected': {
            backgroundColor: '#89b847',
            color: 'white',
        },
    }));

    const StyleDiv = styled('div')({
        padding: '10px',
        margin: '10px',
        border: '2px solid #75a73f',
        borderRadius: 5,
        display: 'flex',
    });

    const StyleButton = styled('button')({
        borderRadius: 3,
        backgroundColor: "#ffffff",
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        border: '2px solid #89b847',
        '&:hover': {
            cursor: 'pointer'
        }
    });

    // Xử lý
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/thong-tin`)
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

    // Lọc dữ liệu dựa trên từ khóa tìm kiếm
    const filteredData = data.filter(item =>
        item.TenDM.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Tính toán dữ liệu hiển thị trên mỗi trang
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Bạn có chắc chắn không?',
            text: 'Bạn sẽ không thể phục hồi dữ liệu đã xóa!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có, xóa nó!',
            cancelButtonText: 'Hủy'
        });

        if (!result.isConfirmed) return;

        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/thong-tin/${id}`);
            Swal.fire(
                'Đã xóa!',
                'Dữ liệu của bạn đã được xóa.',
                'success'
            );

            setData(data.filter(item => item.id !== id));
        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
            Swal.fire(
                'Lỗi!',
                'Có lỗi xảy ra khi xóa dữ liệu.',
                'error'
            );
        }
    };

    const [tenDM, settenDM] = useState('');
    const [noiDung, setnoiDung] = useState('');
    const [openDM, setopenDM] = useState(false);
    const [currentItem, setcurrentItem] = useState('');

    const handleEdit = (item) => {
        setcurrentItem(item);
        settenDM(item.TenDM);
        setnoiDung(item.NoiDung);
        setopenDM(true);
    };

    const handleClose = () => {
        setopenDM(false);
    };

    const handleSave = async () => {
        const Ten_DM = tenDM || '';
        const Noi_Dung = noiDung || '';
        if (Ten_DM.trim() === '' || Noi_Dung.trim() === '') {
            Swal.fire(
                'Lỗi!',
                'Tên danh mục và nội dung không thể để trống.',
                'error'
            );
            return;
        }

        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/thong-tin/${currentItem.id}`, {
                TenDM: Ten_DM,
                NoiDung: Noi_Dung,
            });
            Swal.fire(
                'Đã cập nhật!',
                'Dữ liệu của bạn đã được cập nhật.',
                'success'
            );
            setData(data.map(item =>
                item.id === currentItem.id
                    ? { ...item, TenDM: tenDM, NoiDung: noiDung } : item
            ));
            handleClose();
        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
            handleClose();
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
                <Grid container spacing={3}>
                    <Grid item xs={2}>
                        <Typography sx={{ fontWeight: 'bold' }}>Tên danh mục</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography sx={{ fontWeight: 'bold' }}>Nội dung</Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography sx={{ fontWeight: 'bold' }}>Thao tác</Typography>
                    </Grid>
                </Grid>
            </StyleDiv>
            {currentData.map(item => (
                <StyleDiv key={item.id}>
                    <Grid container spacing={3}>
                        <Grid item xs={2}>
                            <Typography variant='h5'> {item.TenDM} </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Typography> {item.NoiDung} </Typography>
                        </Grid>
                        <Grid item xs>
                            <div style={{ display: 'flex', flexDirection: 'column', }}>
                                <StyleButton onClick={() => handleEdit(item)} sx={{
                                    color: "#89b847",
                                    '&:hover': {
                                        backgroundColor: "#75a73f",
                                        color: "#ffffff",
                                    },
                                }}>
                                    <ModeEditIcon />
                                </StyleButton>
                                <StyleButton onClick={() => handleDelete(item.id)}
                                    sx={{
                                        borderColor: "#d00000",
                                        color: "#d00000",
                                        '&:hover': {
                                            backgroundColor: "#d00000",
                                            color: "#ffffff",
                                        },
                                    }}>
                                    <DeleteIcon />
                                </StyleButton>
                            </div>
                        </Grid>
                    </Grid>
                </StyleDiv>
            ))}

            <Pagination
                count={Math.ceil(filteredData.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                sx={{
                    marginTop: 2,
                    marginBottom: 2,
                    justifyContent: 'center',
                    display: 'flex',
                }}
                renderItem={(item) => <CustomPaginationItem {...item} />}
            />

            {/* Modal */}
            <Modal open={openDM} onClose={handleClose}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000,
                }}
            >
                <Box
                    component="form"
                    sx={{
                        display: "flex",
                        flexDirection: 'column',
                        gap: 2,
                        width: '50%',
                        margin: '0 auto',
                        padding: 2,
                        backgroundColor: '#f4f6f8',
                        borderRadius: '8px',
                        zIndex: 1000,
                    }}
                >
                    <TextField
                        size="small"
                        fullWidth
                        label="Tên danh mục*"
                        name="TenDM"
                        variant="outlined"
                        value={tenDM}
                        onChange={(e) => settenDM(e.target.value)}
                    />

                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Nội dung*"
                        name="NoiDung"
                        variant="outlined"
                        value={noiDung}
                        onChange={(e) => setnoiDung(e.target.value)}
                    />

                    <Button variant="contained" onClick={handleSave}
                        sx={{
                            backgroundColor: '#89b847',
                            '&:hover': {
                                backgroundColor: '#75a73f',
                            },
                        }}
                    >
                        Lưu
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}
