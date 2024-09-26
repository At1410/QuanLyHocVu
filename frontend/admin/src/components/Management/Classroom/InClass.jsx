import React, { useEffect, useState } from 'react';

import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';

import Swal from 'sweetalert2';


import {
    styled, Paper, Table,
    TableCell, TableContainer, TableHead, TableRow,
    Modal, Box,
    Typography,
    Button,
    TableBody,
    Pagination, PaginationItem
} from "@mui/material";

import axios from 'axios';

export default function InClass({ open, handleClose, classId }) {

    //Style
    const StylesTableCell = styled(TableCell)({
        fontSize: 15,
        fontWeight: 'bold',
        paddingTop: 8,
        paddingBottom: 8,

    });

    const StylesTableCellCt = styled(TableCell)({
        paddingTop: 5,
        paddingBottom: 5,
    })

    const StyleButton = styled(Button)({
        backgroundColor: '#89b847',
        color: '#ffffff',
        paddingTop: 5,
        paddingBottom: 5,
        float: 'right',
        '&:hover': {
            backgroundColor: '#89b847',
            color: '#ffffff',
        },
    })

    const [dataTG, setDataTG] = useState([]);
    const [dataGD, setDataGD] = useState([]);
    const [dataLop, setDataLop] = useState([]);
    const [children, setChildren] = useState([]);
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/tham-gia')
            .then(response => response.json())
            .then(data => {
                setDataTG(data);
            })
            .catch(error => {
                console.error('Error fetching students:', error);
            });
        fetch('http://localhost:5000/giang-day')
            .then(response => response.json())
            .then(data => {
                setDataGD(data);
            })
            .catch(error => {
                console.error('Error fetching students:', error);
            });
        fetch('http://localhost:5000/tre-em')
            .then(response => response.json())
            .then(data => {
                const filtered = data.filter(child => child.Trang_thai === 1);
                setChildren(filtered);
            })
            .catch(error => {
                console.error('Error fetching students:', error);
            });
        fetch('http://localhost:5000/giao-vien')
            .then(response => response.json())
            .then(data => {
                setTeachers(data);
            })
            .catch(error => {
                console.error('Error fetching students:', error);
            });
        fetch('http://localhost:5000/lop')
            .then(response => response.json())
            .then(data => {
                setDataLop(data);
            })
            .catch(error => {
                console.error('Error fetching students:', error);
            });
    }, []);

    const childrenInClass = dataTG.filter(item => item.id_lop === classId).map(item => item.id_treem);
    const childrenInClassLength = childrenInClass.length;

    const teachersInClass = dataGD.filter(item => item.id_Lop === classId).map(item => item.id_GV);
    const teachersInClassLength = teachersInClass.length;

    const filteredChildren = children.filter(child => childrenInClass.includes(child.id));
    const filteredTeachers = teachers.filter(teacher => teachersInClass.includes(teacher.id));


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

    const handeDeleteChildClass = async (id) => {
        console.log('Xóa trẻ:', id);
        console.log('Xóa trong lop', classId);
        try {
            const result = await Swal.fire({
                title: 'Bạn có chắc chắn không?',
                text: 'Bạn có chắc chắn muốn xóa trẻ này ra khỏi lớp hay không!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Có',
                cancelButtonText: 'Hủy'
            });

            if (!result.isConfirmed) return;

            await axios.delete(`http://localhost:5000/tham-gia/${classId}/${id}`);

            Swal.fire(
                'Đã hoàn thành!',
                'Xóa trẻ ra khỏi lớp!',
                'success'
            );

        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
            Swal.fire(
                'Lỗi!',
                'Có lỗi xảy ra khi xóa dữ liệu.',
                'error'
            );
        }
    }

    const handeDeleteTeacherClass = async (id) => {
        console.log('Xóa gv:', id);
        console.log('Xóa trong lop', classId);
        try {
            const result = await Swal.fire({
                title: 'Bạn có chắc chắn không?',
                text: 'Bạn có chắc chắn muốn xóa giáo viên này ra khỏi lớp hay không!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Có',
                cancelButtonText: 'Hủy'
            });

            if (!result.isConfirmed) return;

            await axios.delete(`http://localhost:5000/giang-day/${classId}/${id}`);

            Swal.fire(
                'Đã hoàn thành!',
                'Xóa giáo viên ra khỏi lớp!',
                'success'
            );

        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
            Swal.fire(
                'Lỗi!',
                'Có lỗi xảy ra khi xóa dữ liệu.',
                'error'
            );
        }
    }

    const [showAddStudentModal, setShowAddStudentModal] = useState(false);
    const [availableChildren, setAvailableChildren] = useState([]);

    const fetchAvailableChildren = async () => {

        try {
            const response = await axios.get(`http://localhost:5000/lop/${classId}`);

            const dataIDLop = response.data;

            const max_students = dataIDLop[0]?.So_luong;

            console.log('Số lượng Max:', max_students);

            if (childrenInClassLength >= max_students) {
                Swal.fire({
                    icon: 'error',
                    title: 'Không thể thêm Trẻ!',
                    text: `Lớp đã đạt giới hạn số lượng trẻ tối đa (${max_students} trẻ).`,
                });
                return;
            }

            // 1. Lấy danh sách id_lop từ dataTG
            const classIdsInParticipation = dataTG.map(item => item.id_lop);

            // console.log(' Lấy danh sách id_lop từ dataTG:', classIdsInParticipation);

            // 2. Lấy các lớp có id_lop trùng và trạng thái === 0 từ bảng lop
            const inactiveClasses = dataLop
                .filter(lop => classIdsInParticipation.includes(lop.id) && lop.trang_thai === 0) // Thay id_lop bằng id
                .map(lop => lop.id);

            // console.log('Các lớp đã hoàn thành:', inactiveClasses);

            //3. Lấy danh sách id_treem từ dataTG với id_lop nằm trong các lớp`trang_thai === 0`
            const childrenInInactiveClasses = dataTG
                .filter(item => inactiveClasses.includes(item.id_lop)) // Lọc những trẻ trong lớp có `trang_thai === 0`
                .map(item => item.id_treem); // Lấy id_treem


            //console.log('Trẻ trong các lớp đã hoàn thành:', childrenInInactiveClasses);

            // 6. Kết hợp hai điều kiện: Trẻ không có trong lớp nào hoặc trẻ trong các lớp đã hoàn thành
            const available = children.filter(child =>
                !dataTG.some(item => item.id_treem === child.id) ||
                childrenInInactiveClasses.includes(child.id)
            );

            // Kiểm tra danh sách trẻ có thể thêm
            //console.log('Trẻ có thể thêm:', available);
            setAvailableChildren(available);
            setShowAddStudentModal(true); // Mở modal

        } catch (error) {
            console.error('Error fetching available children:', error);
            Swal.fire({
                icon: 'error',
                title: 'Có lỗi xảy ra',
                text: 'Không thể lấy dữ liệu trẻ để thêm vào lớp.',
            });
        }
    };

    const handleAddStudent = async (id) => {
        console.log('Thêm trẻ:', id);
        console.log('Vào trong lop', classId);
        try {
            const result = await Swal.fire({
                title: 'Bạn có chắc chắn không?',
                text: 'Bạn có chắc chắn muốn thêm trẻ này vào lớp hay không!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Có',
                cancelButtonText: 'Hủy'
            });

            if (!result.isConfirmed) return;

            await axios.post(`http://localhost:5000/them-tre/${classId}/${id}`);

            Swal.fire(
                'Đã hoàn thành!',
                'Đã thêm trẻ vào lớp!',
                'success'
            );

        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
            Swal.fire(
                'Lỗi!',
                'Trẻ đã ở trong lớp.',
                'error'
            );
        };
    };

    const handleAddTeacherClass = async (id) => {
        console.log('Thêm GV:', id);
        console.log('Vào trong lop', classId);
        try {
            const result = await Swal.fire({
                title: 'Bạn có chắc chắn không?',
                text: 'Bạn có chắc chắn muốn thêm giáo viên này vào lớp hay không!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Có',
                cancelButtonText: 'Hủy'
            });

            if (!result.isConfirmed) return;

            await axios.post(`http://localhost:5000/giang-day/${classId}/${id}`);

            Swal.fire(
                'Đã hoàn thành!',
                'Đã thêm giáo viên vào lớp!',
                'success'
            );

        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
            Swal.fire(
                'Lỗi!',
                'Giáo viên đã ở trong lớp',
                'error'
            );
        };
    };

    const [showAddTeachersModal, setShowAddTeachersModal] = useState(false);
    const [availableTeacher, setAvailableTeacher] = useState([]);

    const fetchAvailableTeachers = async () => {

        try {
            const response = await axios.get(`http://localhost:5000/lop/${classId}`);

            const dataIDLop = response.data;

            const max_Teachers = dataIDLop[0]?.SL_giaovien;

            console.log('Số lượng Max:', max_Teachers);

            if (teachersInClassLength >= max_Teachers) {
                Swal.fire({
                    icon: 'error',
                    title: 'Không thể thêm Giáo viên!',
                    text: `Lớp đã đạt giới hạn số lượng giáo viên tối đa (${max_Teachers} GV).`,
                });
                return;
            }
            // 1. Lấy danh sách id_lop từ dataTG
            const teacherIdsInParticipation = dataGD.map(item => item.id_Lop);

            console.log('Lấy danh sách id_lop từ dataGD:', teacherIdsInParticipation);

            // 2. Lấy các lớp có id_Lop trùng và trạng thái === 0 từ bảng lop
            const inactiveClassesTeacher = dataLop
                .filter(lop => teacherIdsInParticipation.includes(lop.id) && lop.trang_thai === 0) // Thay id_lop bằng id
                .map(lop => lop.id);

            console.log('Các lớp đã hoàn thành:', inactiveClassesTeacher);

            //3. Lấy danh sách id_GV từ dataGD với id_Lop nằm trong các lớp`trang_thai === 0`
            const teacherInInactiveClasses = dataGD
                .filter(item => inactiveClassesTeacher.includes(item.id_Lop)) // Lọc những trẻ trong lớp có `trang_thai === 0`
                .map(item => item.id_GV); // Lấy id_treem


            console.log('GV trong các lớp đã hoàn thành:', teacherInInactiveClasses);

            // 6. Kết hợp hai điều kiện: Trẻ không có trong lớp nào hoặc trẻ trong các lớp đã hoàn thành
            const availableTeacher = teachers.filter(teachers =>
                !dataTG.some(item => item.id_GV === teachers.id) ||
                teacherInInactiveClasses.includes(teachers.id)
            );

            // Kiểm tra danh sách GV có thể thêm
            console.log('GV có thể thêm:', availableTeacher);
            setAvailableTeacher(availableTeacher);
            setShowAddTeachersModal(true); // Mở modal

        } catch (error) {
            console.error('Error fetching available children:', error);
            Swal.fire({
                icon: 'error',
                title: 'Có lỗi xảy ra',
                text: 'Không thể lấy dữ liệu trẻ để thêm vào lớp.',
            });
        }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentChildren = availableChildren.slice(indexOfFirstItem, indexOfLastItem);
    const currentTeacher = availableTeacher.slice(indexOfFirstItem, indexOfLastItem);

    const itemsTableChild = 2;
    const indexOfLastItemChild = currentPage * itemsTableChild;
    const indexOfFirstItemChild = indexOfLastItemChild - itemsTableChild;

    const currentChildrenTable = filteredChildren.slice(indexOfFirstItemChild, indexOfLastItemChild);

    const CustomPaginationItem = styled(PaginationItem)(({ theme }) => ({
        '&.Mui-selected': {
            backgroundColor: '#89b847',
            color: 'white',
        },
    }));

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
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
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        width: '70%',
                        margin: '0 auto',
                        padding: 2,
                        backgroundColor: '#f4f6f8',
                        borderRadius: '8px',
                    }}
                >

                    <Typography
                        sx={{
                            fontWeight: 'bold',
                        }}>
                        DANH SÁCH HỌC SINH CỦA LỚP
                        <StyleButton
                            onClick={fetchAvailableChildren}
                        >Thêm trẻ</StyleButton>
                    </Typography>
                    <TableContainer component={Paper} sx={{
                        width: '100%',
                    }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <StylesTableCell>Họ tên trẻ</StylesTableCell>
                                    <StylesTableCell>Ngày sinh trẻ</StylesTableCell>
                                    <StylesTableCell>Giới tính</StylesTableCell>
                                    <StylesTableCell>Sức khỏe</StylesTableCell>
                                    <StylesTableCell sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        Thao tác
                                    </StylesTableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {currentChildrenTable.length > 0 ? (
                                    currentChildrenTable.map((item) => (
                                        <TableRow key={item.id}>
                                            <StylesTableCellCt>{item.Ten_tre}</StylesTableCellCt>
                                            <StylesTableCellCt>{formatDate(item.Ngay_sinh)}</StylesTableCellCt>
                                            <StylesTableCellCt>{Gender(item.Gioi_tinh)}</StylesTableCellCt>
                                            <StylesTableCellCt>{item.Suc_khoe}</StylesTableCellCt>
                                            <StylesTableCellCt sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                                <RemoveCircleOutlineIcon
                                                    onClick={() => handeDeleteChildClass(item.id)}
                                                    sx={{
                                                        color: '#89b847',
                                                        cursor: 'pointer',
                                                        alignItems: 'center',
                                                        '&:hover': { color: '#d00000' },
                                                    }} />
                                            </StylesTableCellCt>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center">
                                            Chưa có học sinh trong lớp học này.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>

                        <Pagination
                            count={Math.ceil(filteredChildren.length / itemsTableChild)}
                            page={currentPage}
                            onChange={handlePageChange}
                            sx={{
                                marginTop: 1,
                                marginBottom: 1,
                                justifyContent: 'center',
                                display: 'flex',
                                color: '#89b847'
                            }}
                            renderItem={(item) => <CustomPaginationItem {...item} />}
                        />

                    </TableContainer>
                    <Typography
                        sx={{
                            fontWeight: 'bold',
                        }}>
                        DANH SÁCH GIÁO VIÊN CỦA LỚP
                        <StyleButton
                            onClick={fetchAvailableTeachers}
                        >Thêm giáo viên</StyleButton>
                    </Typography>
                    <TableContainer component={Paper} sx={{
                        width: '100%'
                    }}
                    >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <StylesTableCell>Tên nhân viên</StylesTableCell>
                                    <StylesTableCell>Căn cước công dân</StylesTableCell>
                                    <StylesTableCell>Giới tính</StylesTableCell>
                                    <StylesTableCell>Số điện thoại</StylesTableCell>
                                    <StylesTableCell sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        Thao tác
                                    </StylesTableCell>
                                </TableRow>
                            </TableHead>

                            {filteredTeachers.length > 0 ? (
                                filteredTeachers.map((item) => (
                                    <TableRow key={item.id}>
                                        <StylesTableCellCt>{item.Ten_Nhan_Vien}</StylesTableCellCt>
                                        <StylesTableCellCt>{item.CMND}</StylesTableCellCt>
                                        <StylesTableCellCt>{Gender(item.Gioi_tinh)}</StylesTableCellCt>
                                        <StylesTableCellCt>{item.Sdt}</StylesTableCellCt>
                                        <StylesTableCellCt sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                            <RemoveCircleOutlineIcon
                                                onClick={() => handeDeleteTeacherClass(item.id)}
                                                sx={{
                                                    color: '#89b847',
                                                    cursor: 'pointer',
                                                    alignItems: 'center',
                                                    '&:hover': { color: '#d00000' },
                                                }} />
                                        </StylesTableCellCt>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        Chưa có giáo viên trong lớp học này.
                                    </TableCell>
                                </TableRow>
                            )}

                        </Table>
                    </TableContainer>
                </Box>
            </Modal >

            <Modal open={showAddStudentModal} onClose={() => setShowAddStudentModal(false)}
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
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        width: '70%',
                        margin: '0 auto',
                        padding: 2,
                        backgroundColor: '#f4f6f8',
                        borderRadius: '8px',
                    }}
                >
                    <Typography variant="h6" sx={{
                        fontWeight: 'bold',
                    }}>Danh sách trẻ có thể thêm vào lớp
                        <CancelIcon onClick={() => setShowAddStudentModal(false)} sx={{
                            float: 'right',
                            color: '#d00000',
                            cursor: 'pointer',
                            '&:hover': { color: '#c1121f' },
                        }} />
                    </Typography>

                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <StylesTableCell>Mã trẻ</StylesTableCell>
                                    <StylesTableCell>Họ tên trẻ</StylesTableCell>
                                    <StylesTableCell>Ngày sinh</StylesTableCell>
                                    <StylesTableCell>Giới tính</StylesTableCell>
                                    <StylesTableCell sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        Thao tác
                                    </StylesTableCell>
                                </TableRow>
                            </TableHead>
                            <tbody>
                                {currentChildren.length > 0 ? (
                                    currentChildren.map(child => (
                                        <TableRow key={child.id}>
                                            <StylesTableCellCt>{child.id}</StylesTableCellCt>
                                            <StylesTableCellCt>{child.Ten_tre}</StylesTableCellCt>
                                            <StylesTableCellCt>{formatDate(child.Ngay_sinh)}</StylesTableCellCt>
                                            <StylesTableCellCt>{Gender(child.Gioi_tinh)}</StylesTableCellCt>
                                            <StylesTableCellCt sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                                <AddCircleOutlineIcon
                                                    onClick={() => handleAddStudent(child.id)}
                                                    sx={{
                                                        color: '#89b847',
                                                        cursor: 'pointer',
                                                        alignItems: 'center',
                                                        '&:hover': { color: '#1565c0' },
                                                    }} />
                                            </StylesTableCellCt>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center">
                                            Không có trẻ nào sẵn sàng tham gia lớp.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </tbody>
                        </Table>
                    </TableContainer>
                    <Pagination
                        count={Math.ceil(availableChildren.length / itemsPerPage)}
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
                </Box>
            </Modal>

            <Modal open={showAddTeachersModal} onClose={() => setShowAddTeachersModal(false)}
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
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        width: '70%',
                        margin: '0 auto',
                        padding: 2,
                        backgroundColor: '#f4f6f8',
                        borderRadius: '8px',
                    }}
                >
                    <Typography variant="h6" sx={{
                        fontWeight: 'bold',
                    }}>Danh sách giáo viên có thể thêm vào lớp
                        <CancelIcon onClick={() => setShowAddTeachersModal(false)} sx={{
                            float: 'right',
                            color: '#d00000',
                            cursor: 'pointer',
                            '&:hover': { color: '#c1121f' },
                        }} />
                    </Typography>

                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <StylesTableCell>Mã GV</StylesTableCell>
                                    <StylesTableCell>Họ tên GV</StylesTableCell>
                                    <StylesTableCell>Ngày sinh</StylesTableCell>
                                    <StylesTableCell>Giới tính</StylesTableCell>
                                    <StylesTableCell sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        Thao tác
                                    </StylesTableCell>
                                </TableRow>
                            </TableHead>
                            <tbody>
                                {currentTeacher.length > 0 ? (
                                    currentTeacher.map(teacher => (
                                        <TableRow key={teacher.id}>
                                            <StylesTableCellCt>{teacher.id}</StylesTableCellCt>
                                            <StylesTableCellCt>{teacher.Ten_Nhan_Vien}</StylesTableCellCt>
                                            <StylesTableCellCt>{formatDate(teacher.Ngay_sinh)}</StylesTableCellCt>
                                            <StylesTableCellCt>{Gender(teacher.Gioi_tinh)}</StylesTableCellCt>
                                            <StylesTableCellCt sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                                <AddCircleOutlineIcon
                                                    onClick={() => handleAddTeacherClass(teacher.id)}
                                                    sx={{
                                                        color: '#89b847',
                                                        cursor: 'pointer',
                                                        alignItems: 'center',
                                                        '&:hover': { color: '#1565c0' },
                                                    }} />
                                            </StylesTableCellCt>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center">
                                            Không có giáo viên nào sẵn sàng tham gia lớp.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </tbody>
                        </Table>
                    </TableContainer>
                    <Pagination
                        count={Math.ceil(availableTeacher.length / itemsPerPage)}
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
                </Box>
            </Modal>
        </div>
    );
}