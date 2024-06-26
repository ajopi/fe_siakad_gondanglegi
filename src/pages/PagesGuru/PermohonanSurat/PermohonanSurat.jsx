import React, { useEffect, useState } from 'react'
import NavbarDefault from '../../../components/NavbarDefault/NavbarDefault'
import './PermohonanSurat.css'
import SidebarDefault from '../../../components/SidebarDefault/SidebarDefault'
import FormPermohonanSurat from '../../../components/FormPermohonanSurat/FormPermohonanSurat'
import TitlePageAndButton from '../../../components/TitlePageAndButton/TitlePageAndButton'
import axios from 'axios'

// MUI TABlE
import { Button, TablePagination, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table } from '@mui/material'

// MUI ICONS
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationDialog from '../../../components/ConfirmationDialog/ConfirmationDialog'
import authServices from '../../../Services/auth.services'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataSurat } from '../../../redux/slice/getDataSurat'

const PermohonanSurat = () => {
    const { data, loading, error } = useSelector((state) => state.getDataSuratReducer);
    const dispatch = useDispatch();

    // handle button click create surat 
    const [clicked, setClicked] = useState(0);
    const handleBtnCreateSurat = () => {
        setClicked(clicked + 1);
        console.log(clicked);
    }

    //===============================TABLE MUI===============================
    const columns = [
        {
            id: 'no',
            label: 'No',
            width: '10%'
        },
        {
            id: 'tujuan',
            label: 'Tujuan',
            width: '30%'
        },
        {
            id: 'status',
            label: 'Status',
            width: '30%',
            align: 'center'
        },
        {
            id: 'action',
            label: 'Action',
            width: '30%',
            align: 'center'
        },
    ];
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    //===============================USEEFFECT untuk get data dari Redux===============================
    useEffect(() => {
        dispatch(fetchDataSurat())
    }, [dispatch])

    useEffect(() => {
        const getData = data.map((value, index) => {
            return {
                no: index + 1,
                tujuan: value.keperluan,
                status: value.validation ? "Done" : "Pending",
                id: value.id
            }
        })
        setRows(getData);
    }, [data])




    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    // MODAL DIALOG
    const [open, setOpen] = useState(false);
    const [dataSuratId, setDataSuratId] = useState(null);

    const handleOpen = (e) => {
        setDataSuratId(e);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }



    // function untuk menghapus data surat by id
    const handleDelete = (e) => {
        e.preventDefault();
        console.log("button clicked");
        try {
            authServices.handleDeleteSurat(dataSuratId);
            setOpen(false);
            window.location.reload();
        } catch (error) {
            alert(error.message)
        }
    }





    const handleFormCreateSurat = () => {
        if (clicked === 0) {
            return <div className='container_wrapper_permohonansurat'>
                <TitlePageAndButton
                    title="Permohonan Surat Guru"
                    handleFunction={handleBtnCreateSurat}
                    titleButton="Buat Surat Permohonan"
                />

                <Paper sx={{ width: '100%' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead >
                                <TableRow >
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ width: column.width }}
                                            sx={{ color: 'black', fontWeight: 'bold' }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.id === 'action' ? (
                                                                <>
                                                                    <Button
                                                                        startIcon={<DeleteIcon />}
                                                                        variant="contained"
                                                                        color="error"
                                                                        onClick={() => { handleOpen(row.id) }}
                                                                    >
                                                                        {console.log(dataSuratId)}
                                                                        Delete
                                                                    </Button>
                                                                </>
                                                            ) : (
                                                                value
                                                            )}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    <ConfirmationDialog
                        open={open}
                        onClose={handleClose}
                        onConfirm={handleDelete}
                        dialogTitle={"Konfirmasi Hapus!!"}
                        dialogContent={"Apakah anda yakin ingin menghapus data ini?"}
                    />
                </Paper >
            </div >
        } else {
            return <FormPermohonanSurat />
        }

    }



    return (
        <div className='container_permohonansurat'>
            <NavbarDefault />
            <div className='container_page_and_sidebar'>
                <aside className='container_sidebar_permohonansurat'>
                    <SidebarDefault />
                </aside>

                <div className='container_content_permohonansurat'>
                    {handleFormCreateSurat()}
                </div>
            </div>

        </div>
    )
}

export default PermohonanSurat