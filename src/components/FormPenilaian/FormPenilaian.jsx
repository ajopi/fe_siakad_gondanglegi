import React, { useEffect, useState } from 'react'
import './FormPenilaian.css'
import TitlePage from '../TitlePageAndButton/TitlePage/TitlePage'
import { Alert, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataApi } from '../../redux/slice/getDataSlice'
import authServices from '../../Services/auth.services'
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog'
import axios from 'axios'
const FormPenilaian = ({ typeMapel }) => {
    const token = sessionStorage.getItem('token')
    const [kelasSelected, setKelasSelected] = useState("");
    const [jurusanSelected, setJurusanSelected] = useState("");
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.getDataSiswa);

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
            jurusan: "LIST"
        },
        {
            id: 2,
            jurusan: "TKR"
        },
        {
            id: 3,
            jurusan: "MEKATRONIKA-ETP"
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
            mapel: "PENDIDIKAN AGAMA DAN BUDI PEKERTI",
            fontSize: '10px'
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
            id: 'no',
            label: "No",
            width: '5%'
        },
        {
            id: 'nama_siswa',
            label: "Nama Siswa",
            width: '15%'
        },
        {
            id: 'kelas',
            label: "Kelas",
            width: '5%',
            align: 'center'
        },
        {
            id: 'jurusan',
            label: "Jurusan",
            width: '25%',
            align: 'center'
        },
        {
            id: 'nilai',
            label: "Nilai",
            width: '25%',
            align: 'center'
        },
        {
            id: 'action',
            label: "Action",
            width: '25%',
            align: 'center'
        }
    ]

    // ======================GET DATA SISWA BY INPUT======================
    const [rows, setRows] = useState([]);
    const [raport, setRaport] = useState([]);
    useEffect(() => {
        dispatch(fetchDataApi())
    }, [dispatch]);

    useEffect(() => {
        if (data.length > 0) {
            const getData = data.map((value, index) => {
                const nilaiByType = value.raport.find(raportItem => raportItem.type === typeMapel);
                const idPenilaianByType = nilaiByType ? nilaiByType.id : null;
                return {
                    idSiswa: value.id,
                    no: index + 1,
                    nama_siswa: value.nama,
                    kelas: value.kelas,
                    jurusan: value.jurusan,
                    nilai: nilaiByType ? nilaiByType.nilai : 'Nilai Tidak ada',
                    idPenilaian: idPenilaianByType
                }
            })
            setRows(getData);
        }
    }, [data, typeMapel])

    console.log(rows)



    // filtered rows
    const filteredRows = rows.filter(value =>
        (kelasSelected === "" || value.kelas === kelasSelected) &&
        (jurusanSelected === "" || value.jurusan === jurusanSelected)
    )
    // filtered mapel type
    const filteredMapel = dataMapel.filter((item) => (item.mapel !== 'PILIH MATA PELAJARAN'));


    //STATE n FUnction FOR TABLE
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // MODAL EDIT
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [siswaId, setSiswaId] = useState(null);
    const [idPenilaian, setIdPenilaian] = useState(null)
    const handleOpen = (e) => {
        setIdPenilaian(e);
        setSiswaId(e);
        setOpen(true);
    }

    const handleDelete = (e) => {
        e.preventDefault();
        try {
            authServices.handleDeletePenilaian(idPenilaian);
            window.location.reload();
        } catch (error) {
            alert(error.message)
        }
        console.log(e)
    }

    const handleClose = () => {
        setOpen(false);
        setOpenAdd(false);
        setOpenEdit(false);
    }

    const handleOpenEdit = (e) => {
        setIdPenilaian(e);
        setOpenEdit(true);
    }

    const handleOpenAdd = (e) => {
        setSiswaId(e);
        setOpenAdd(true)
    }

    const [editNilai, setEditNilai] = useState()
    const handleSubmitEdit = () => {
        const integerNilai = parseInt(editNilai);
        let data = JSON.stringify({
            "nilai": integerNilai
        });

        let config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_BASE_URL}/api/v1/penilaian/${idPenilaian}/update`,
            headers: {
                'x-access-token': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(response.data);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });

    }

    const [addNilai, setAddNilai] = useState()
    const handleSubmitAdd = () => {
        const integerNilai = parseInt(addNilai)
        let data = JSON.stringify({
            "siswa_id": siswaId,
            "type": typeMapel,
            "nilai": integerNilai
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_BASE_URL}/api/v1/penilaian`,
            headers: {
                'x-access-token': token,
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(response.data);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });

    }
    return (
        <div className='container_form_penilaian'>

            <div className='container_wrapper_padding_content'>
                <form>
                    {/* Opsi Kelas */}
                    <label htmlFor='kelas' className='label_form_penilaian'  >Kelas</label>
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
                    <select name='jurusan' id='jurusan' className='input_form_penilaian' defaultValue="PILIH JURUSAN" onChange={(e) => setJurusanSelected(e.target.value)}>
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
                    {/* <label htmlFor='mata_pelajaran' className='label_form_penilaian'>Mata Pelajaran</label>
                        <select name='mata_pelajaran' id='mata_pelajaran' className='input_form_penilaian' defaultValue="PILIH MATA PELAJARAN" onChange={(e) => setMapelSelected(e.target.value)}>
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
                        </select> */}
                </form>

                <Paper sx={{ width: '100%' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => [
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ width: column.width }}
                                            sx={{ color: 'black', fontWeight: 'bold' }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ])}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {kelasSelected.length && jurusanSelected.length > 0 ?
                                    loading ?
                                        (<TableRow>
                                            <TableCell colSpan={columns.length}>
                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                                    <CircularProgress />
                                                </div>
                                            </TableCell>
                                        </TableRow>) : error ?
                                            (
                                                <TableCell colSpan={columns.length}>
                                                    <Alert severity="error">{error}</Alert>
                                                </TableCell>
                                            )
                                            :
                                            (filteredRows
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row, index) => (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                        {columns.map((column) => {
                                                            const value = row[column.id];
                                                            return (
                                                                <TableCell key={column.id} align={column.align}>
                                                                    {
                                                                        column.id === 'action' ?
                                                                            (<>
                                                                                <Button
                                                                                    // startIcon={<DeleteIcon />}
                                                                                    variant="contained"
                                                                                    color="success"
                                                                                    size='small'
                                                                                    style={{ marginRight: '8px' }}
                                                                                    onClick={() => handleOpenAdd(row.idSiswa)}
                                                                                >
                                                                                    Add
                                                                                </Button>
                                                                                <Button
                                                                                    // startIcon={<DeleteIcon />}
                                                                                    variant="contained"
                                                                                    color='primary'
                                                                                    size='small'
                                                                                    style={{ marginRight: '8px' }}
                                                                                    onClick={() => handleOpenEdit(row.idPenilaian)}
                                                                                >
                                                                                    Edit
                                                                                </Button>
                                                                                <Button
                                                                                    // startIcon={<DeleteIcon />}
                                                                                    variant="contained"
                                                                                    color='error'

                                                                                    size='small'
                                                                                    onClick={() => handleOpen(row.idPenilaian)}
                                                                                >
                                                                                    Delete
                                                                                </Button>
                                                                            </>)
                                                                            :
                                                                            value}

                                                                </TableCell>
                                                            )
                                                        })}
                                                    </TableRow>
                                                )))
                                    :
                                    (
                                        <TableRow>
                                            <TableCell colSpan={columns.length}>
                                                <Alert severity="error">Isikan Form Terlebih Dahulu</Alert>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }

                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 100]}
                        component="div"
                        count={filteredRows.length}
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

                    {/* Dialog untuk Edit */}
                    <Dialog
                        open={openEdit}
                        onClose={handleClose}
                    >
                        <DialogTitle>Edit Data Penilaian</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Update Nilai Siswa By Mata Pelajaran
                            </DialogContentText>

                            <input
                                type='number'
                                style={{ width: '100%', marginTop: '10px', height: '40px' }}
                                placeholder='Masukkan Nilai'
                                onChange={e => setEditNilai(e.target.value)}
                                value={editNilai || ''}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit" onClick={handleSubmitEdit}>Submit</Button>
                        </DialogActions>
                    </Dialog>

                    {/* Dialog untuk Add data nilai */}
                    <Dialog
                        open={openAdd}
                        onClose={handleClose}
                    >
                        <DialogTitle>Tambahkan Nilai Siswa</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Tambah nilai siswa sesuai tugas yang dikerjakan
                            </DialogContentText>

                            <input
                                type='number'
                                style={{ width: '100%', marginTop: '10px', height: '40px' }}
                                placeholder='Masukkan Nilai'
                                onChange={e => setAddNilai(e.target.value)}
                                value={addNilai || ''}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit" onClick={handleSubmitAdd}>Submit</Button>
                        </DialogActions>
                    </Dialog>
                </Paper >
            </div>

        </div>
    )
}

export default FormPenilaian