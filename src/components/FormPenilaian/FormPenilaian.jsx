import React, { useEffect, useState } from 'react'
import './FormPenilaian.css'
import TitlePage from '../TitlePageAndButton/TitlePage/TitlePage'
import { Alert, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataApi } from '../../redux/slice/getDataSlice'

const FormPenilaian = () => {
    const [kelasSelected, setKelasSelected] = useState("");
    const [jurusanSelected, setJurusanSelected] = useState("");
    const [mapelSelected, setMapelSelected] = useState("");
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
            id: 'no',
            label: "No",
            width: '5%'
        },
        {
            id: 'nama_siswa',
            label: "Nama Siswa",
            width: '21.25%'
        },
        {
            id: 'kelas',
            label: "Kelas",
            width: '10%',
            align: 'center'
        },
        {
            id: 'jurusan',
            label: "Jurusan",
            width: '15%',
            align: 'center'
        },
        {
            id: 'mapel',
            label: "Mata Pelajaran",
            width: '21.25%',
            align: 'center'
        },
        {
            id: 'action',
            label: "Action",
            width: '21.25%',
            align: 'center'
        }
    ]

    // ======================GET DATA SISWA BY INPUT======================
    const [rows, setRows] = useState([]);
    useEffect(() => {
        dispatch(fetchDataApi())
    }, [dispatch]);

    useEffect(() => {
        if (data.length > 0) {
            const getData = data.map((value, index) => {
                const nilai = value.raport.map(item => parseInt(item.nilai));
                const jumlahNilai = nilai.length > 0 ? nilai.reduce((acc, curr) => acc + curr, 0) : 0;
                const avg = nilai.length > 0 ? (jumlahNilai / nilai.length).toFixed(2) : "Nilai Belum Masuk";

                return {
                    idSiswa: value.id,
                    no: index + 1,
                    nama_siswa: value.nama,
                    kelas: value.kelas,
                    jurusan: value.jurusan
                }
            })
            setRows(getData);
        }
    }, [data])

    // filtered rows
    const filteredRows = rows.filter(value =>
        (kelasSelected === "" || value.kelas === kelasSelected) &&
        (jurusanSelected === "" || value.jurusan === jurusanSelected)
    )

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
    const [siswaId, setSiswaId] = useState(null);
    const handleOpen = (e) => {
        setSiswaId(e);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div className='container_form_penilaian'>
            {console.log(rows.filter(value =>
                value.kelas === kelasSelected && value.jurusan === jurusanSelected
            ))}
            {console.log(data)}

            <div className='container_wrapper_padding_content'>
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
                </div>

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
                                {kelasSelected.length && jurusanSelected.length > 0 ?
                                    loading ?
                                        (<TableRow>
                                            <TableCell colSpan={columns.length}>
                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                                    <CircularProgress />
                                                </div>
                                            </TableCell>
                                        </TableRow>) : error ?
                                            (<TableRow>
                                                <TableCell colSpan={columns.length}>
                                                    <Alert severity="error">{error}</Alert>
                                                </TableCell>
                                            </TableRow>) :
                                            (filteredRows
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row, index) => (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                        {columns.map((column) => {
                                                            const value = row[column.id];
                                                            return (
                                                                <TableCell key={column.id} align={column.align}>
                                                                    {column.id === 'mapel' ?
                                                                        (<>
                                                                            <select name='mata_pelajaran' id={value} className='input_form_penilaian_mapel' defaultValue={dataMapel[0].id} onChange={(e) => setMapelSelected(e.target.value)}>
                                                                                {dataMapel.map((value) => {
                                                                                    return (
                                                                                        <option
                                                                                            disabled={value.disabled || false}
                                                                                            key={value.id}
                                                                                            value={value.id}
                                                                                            className='option_form_penilaian'
                                                                                        >
                                                                                            {value.mapel}
                                                                                        </option>
                                                                                    )
                                                                                })}
                                                                            </select>
                                                                        </>)
                                                                        : column.id === 'action' ?
                                                                            (<>
                                                                                <Button
                                                                                    // startIcon={<DeleteIcon />}
                                                                                    variant="contained"
                                                                                    color='primary'
                                                                                    style={{ marginRight: '8px' }}
                                                                                >
                                                                                    Add
                                                                                </Button>
                                                                                <Button
                                                                                    // startIcon={<DeleteIcon />}
                                                                                    variant="contained"
                                                                                    color="success"
                                                                                    onClick={() => handleOpen(row.idSiswa)}
                                                                                >
                                                                                    {console.log(row.idSiswa)}
                                                                                    Edit
                                                                                </Button>
                                                                            </>)
                                                                            :
                                                                            value}

                                                                </TableCell>
                                                            )
                                                        })}
                                                    </TableRow>
                                                ))) :
                                    (<TableCell colSpan={columns.length}>
                                        <Alert severity="error">Isikan Form Terlebih Dahulu</Alert>
                                    </TableCell>)}
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
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            component: 'form',
                            // onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                            //     event.preventDefault();
                            //     const formData = new FormData(event.currentTarget);
                            //     const formJson = Object.fromEntries((formData as any).entries());
                            //     const email = formJson.email;
                            //     console.log(email);
                            //     handleClose();
                            // },
                        }}
                    >
                        <DialogTitle>Subscribe</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To subscribe to this website, please enter your email address here. We
                                will send updates occasionally.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="name"
                                name="email"
                                label="Email Address"
                                type="email"
                                fullWidth
                                variant="standard"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">Subscribe</Button>
                            {console.log("button clicked, siswa id:", siswaId, "and mapel:", mapelSelected)}
                        </DialogActions>
                    </Dialog>
                </Paper >
            </div>

        </div>
    )
}

export default FormPenilaian