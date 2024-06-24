import React, { useEffect, useState } from 'react'
import './JadwalSekolah.css'
import NavbarDefault from '../../../components/NavbarDefault/NavbarDefault'
import SidebarDefault from '../../../components/SidebarDefault/SidebarDefault'
import TitlePage from '../../../components/TitlePageAndButton/TitlePage/TitlePage'
import axios from 'axios'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'


const JadwalSekolah = () => {
    // handle get data aktivitas
    const [rows, setRows] = useState([]);
    useEffect(() => {
        const user_token = sessionStorage.getItem('token')
        const FormData = require('form-data');
        let data = new FormData();

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_BASE_URL}/api/v1/activ`,
            headers: {
                'x-access-token': user_token,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(response.data.activ[0].s_activity.split('T')[0]);
                console.log(response.data.activ);
                const data = response.data.activ.map((value, index) => {
                    const getStartDate = value.s_activity.split('T')[0]
                    const getEndDate = value.e_activity.split('T')[0]
                    return{
                        no: index + 1,
                        kegiatan: value.name,
                        start_date: getStartDate,
                        end_date: getEndDate
                    }
                })
                setRows(data);
            })
            .catch((error) => {
                console.log(error);
            });


    }, [])

    const column = [
        {
            id: 'no',
            label: 'No'
        },
        {
            id: 'kegiatan',
            label: 'Nama Kegiatan'
        },
        {
            id: 'start_date',
            label: 'Tanggal Mulai'
        },
        {
            id: 'end_date',
            label: 'Tanggal Berakhir'
        }
    ]
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div className='container_jadwalsekolah'>
            <NavbarDefault />
            <div className='container_page_and_sidebar'>
                <aside className='container_sidebar_jadwalsekolah'>
                    <SidebarDefault />
                </aside>

                <div className='container_content_jadwalsekolah'>
                    <div className='container_wrapper_jadwalSekolah'>
                        <TitlePage title='Jadwal Kegiatan Sekolah' />
                        <Paper sx={{ width: '100%' }}>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead >
                                        <TableRow >
                                            {column.map((column) => (
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
                                                        {column.map((column) => {
                                                            const value = row[column.id];
                                                            return (
                                                                <TableCell key={column.id} align={column.align}>
                                                                    {value}
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
                        </Paper >
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JadwalSekolah