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

const PermohonanSurat = () => {
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
            width: '30%'
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
    const [rowsPerPage, setRowsPerPage] = useState(10);

    //===============================USEEFFECT untuk get data dari API===============================
    useEffect(() => {
        const user_token = sessionStorage.getItem('token');
        const FormData = require('form-data');
        let data = new FormData();
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_BASE_URL}/api/v1/dinas`,
            headers: {
                'x-access-token': user_token,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                const data = response.data.dinas.map((value, index) => ({
                    no: index + 1,
                    tujuan: value.keperluan,
                    status: value.validation ? "Done" : "Pending"
                }))
                setRows(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleEdit = () => {
        console.log('button clicked');
    }

    const handleDelete = () => {
        console.log('button clicked');
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
                                                                        startIcon={<EditIcon />}
                                                                        variant="contained"
                                                                        color="primary"
                                                                        style={{ marginRight: '8px' }}
                                                                        onClick={handleEdit}
                                                                    >
                                                                        Edit
                                                                    </Button>
                                                                    <Button
                                                                        startIcon={<DeleteIcon />}
                                                                        variant="contained"
                                                                        color="secondary"
                                                                        onClick={handleDelete}
                                                                    >
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
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
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
                    {/* {console.log(dataSuratGuru)} */}
                </div>
            </div>

        </div>
    )
}

export default PermohonanSurat