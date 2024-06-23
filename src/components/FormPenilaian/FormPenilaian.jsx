import React, { useEffect, useState } from 'react'
import './FormPenilaian.css'
import TitlePage from '../TitlePageAndButton/TitlePage/TitlePage'
import ButtonDefault from '../TitlePageAndButton/ButtonDefault/ButtonDefault'
import { Paper, Table, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import axios from 'axios'

const FormPenilaian = () => {
    const [kelasSelected, setKelasSelected] = useState("");
    const [jurusanSelected, setJurusanSelected] = useState("");
    const [mapelSelected, setMapelSelected] = useState("");
    const kelas = [
        {
            id: 0,
            kelas: "PILIH KELAS",
            disabled: true,
            defaultValue: "PILIH KELAS"
        },
        {
            id: 1,
            kelas: "X"
        },
        {
            id: 2,
            kelas: "XI"
        },
        {
            id: 3,
            kelas: "XII"
        }
    ]

    const jurusan = [
        {
            id: 0,
            jurusan: "PILIH JURUSAN",
            disabled: true,
            defaultValue: "PILIH JURUSAN"
        },
        {
            id: 1,
            jurusan: "LISTRIK"
        },
        {
            id: 2,
            jurusan: "TKR"
        },
        {
            id: 3,
            jurusan: "MEKATRONIK"
        }
    ]

    const dataMapel = [
        {
            id: 0,
            mapel: "PILIH MATA PELAJARAN",
            disabled: true,
            defaultValue: "PILIH MATA PELAJARAN"
        },
        {
            id: 1,
            mapel: "PENDIDIKAN AGAMA DAN BUDI PEKERTI"
        },
        {
            id: 2,
            mapel: "PENDIDIKAN PANCASILA DAN KEWARGANEGARAAN"
        },
        {
            id: 3,
            mapel: "BAHASA INDONESIA"
        },
        {
            id: 4,
            mapel: "SEJARAH"
        },
        {
            id: 5,
            mapel: "SENI BUDAYA"
        },
        {
            id: 6,
            mapel: "PJOK"
        },
        {
            id: 7,
            mapel: "KEMUHAMMADIYAHAN"
        },
        {
            id: 8,
            mapel: "BAHASA ARAB"
        },
        {
            id: 9,
            mapel: "MATEMATIKA KEJURUAN"
        },
        {
            id: 10,
            mapel: "INFORMATIKA"
        },
        {
            id: 11,
            mapel: "PROYEK IPAS"
        }
    ]

    const columns = [
        {
            id: 0,
            label: "No",
            width: '10%'
        },
        {
            id: 1,
            label: "Nama Siswa",
            width: '22.5%'
        },
        {
            id: 2,
            label: "Kelas",
            width: '22.5%'
        },
        {
            id: 3,
            label: "Jurusan",
            width: '22.5%'
        },
        {
            id: 4,
            label: "Nilai",
            width: '22.5%'
        }
    ]

    // ======================GET DATA SISWA BY INPUT======================
    useEffect(() => {
        const user_token = sessionStorage.getItem("token");
        let data = '';
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_BASE_URL}/api/v1/siswa/kelas?kelas=X &jurusan=LISTRIK`,
            headers: {
                'x-access-token': user_token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])


    console.log(kelasSelected);
    return (
        <div className='container_form_penilaian'>
            <TitlePage title="Form Penilaian Mata Pelajaran" />
            <div className='container_content_form_penilaian'>
                <form>
                    {/* Opsi Kelas */}
                    <label htmlFor='kelas' className='label_form_penilaian' style={{ marginTop: '20px' }} >Kelas</label>
                    <select name='kelas' id='kelas' className='input_form_penilaian' defaultValue="PILIH KELAS" onChange={(e) => setKelasSelected(e.target.value)}>
                        {kelas.map((value) => {
                            return <option
                                disabled={value.disabled || false}
                                key={value.id}
                                value={value.kelas}
                                className='option_form_penilaian'>
                                {value.kelas}
                            </option>
                        })}
                    </select>

                    {/* OPSI JURUSAN */}
                    <label htmlFor='jurusan' className='label_form_penilaian'>Jurusan</label>
                    <select name='jurusan' id='jurusan' className='input_form_penilaian' defaultValue="PILIH JURUSAN">
                        {jurusan.map((value) => {
                            return (
                                <option
                                    disabled={value.disabled || false}
                                    key={value.id}
                                    value={value.jurusan}
                                    className='option_form_penilaian'
                                >
                                    {value.jurusan}
                                </option>
                            )
                        })}
                    </select>

                    {/* OPSI MAPEL */}
                    <label htmlFor='mata_pelajaran' className='label_form_penilaian'>Mata Pelajaran</label>
                    <select name='mata_pelajaran' id='mata_pelajaran' className='input_form_penilaian' defaultValue="PILIH MATA PELAJARAN">
                        {dataMapel.map((value) => {
                            return (
                                <option
                                    disabled={value.disabled || false}
                                    key={value.id}
                                    value={value.mapel}
                                    className='option_form_penilaian'
                                >
                                    {value.mapel}
                                </option>
                            )
                        })}
                    </select>

                    <div className='container_button_form_penilaian'>
                        <ButtonDefault titleButton="Submit" />
                    </div>
                </form>
            </div>
            {/* <Paper sx={{ width: '100%' }}>
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
                                            {column.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.id === 'action' ? (
                                                            <>
                                                                <Button
                                                                    variant="contained"
                                                                    color="primary"
                                                                    style={{ marginRight: '8px' }}
                                                                >
                                                                    Edit
                                                                </Button>
                                                                <Button
                                                                    variant="contained"
                                                                    color="secondary"
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
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper > */}

        </div>
    )
}

export default FormPenilaian