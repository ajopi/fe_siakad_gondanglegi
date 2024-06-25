import React, { useEffect, useState } from 'react'
import './KelolaDataGuru.css'
import '../styleAdmin.css'
import NavbarDefault from '../../../components/NavbarDefault/NavbarDefault'
import SidebarDefault from '../../../components/SidebarDefault/SidebarDefault'
import TitlePageAndButton from '../../../components/TitlePageAndButton/TitlePageAndButton'
import { Alert, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataGuru } from '../../../redux/slice/getDataGuru'
import FormDataGuru from '../../../components/FormDataguru/FormDataGuru'
import ConfirmationDialog from '../../../components/ConfirmationDialog/ConfirmationDialog'
import authServices from '../../../Services/auth.services'

const KelolaDataGuru = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.getDataGuruReducer)

  const [clicked, setClicked] = useState(false);
  const handleBtnCreateDataGuru = () => {
    setClicked(true);
  }

  // Column table
  const column = [
    {
      id: 'no',
      label: 'No',
      width: '5%'
    },
    {
      id: 'nama_guru',
      label: 'Nama Guru',
      width: '17.5%'
    },
    {
      id: 'nuptk',
      label: 'NUPTK',
      width: '10%'
    },
    {
      id: 'gender',
      label: 'Jenis Kelamin',
      width: '15%',
      align: 'center'
    },
    {
      id: 'jabatan',
      label: 'Jabatan',
      width: '17.5%'
    },
    {
      id: 'alamat',
      label: 'Alamat',
      width: '17.5%'
    },
    {
      id: 'action',
      label: 'Action',
      width: '17.5%'
    }
  ]

  // GetData Guru
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchDataGuru())
  }, [dispatch])


  useEffect(() => {
    if (data.length > 0) {
      const dataGuru = data.map((value, index) => {
        const getNuptk = value.nuptk === null ? "Belum Dapodik" : value.nuptk === "belum dapodik" ? "Belum Dapodik" : value.nuptk.split(' ').join('')
        return {
          id: value.id,
          no: index + 1,
          nama_guru: value.nama,
          nuptk: getNuptk,
          gender: value.gender,
          jabatan: value.jabatan,
          alamat: value.alamat,
          nbm: value.nbm === null ? "" : value.nbm,
          tempatLahir: value.ttl === null ? "" : value.ttl.split(',')[0],
          usia: value.usia,
          th_masuk: value.th_masuk,
          bl_masuk: value.th_masuk_bulan === null ? "" : value.th_masuk_bulan,
          status: value.status,
          pendidikan: value.it_tk,
          perguruan_tinggi: value.it_sekolah,
          th_lulus: value.it_tahun,
          jurusan: value.it_jurusan,
          diklat: value.mata_diklat,
        }
      })
      return setRows(dataGuru)
    }

  }, [data])




  // Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Confirmation Dialog
  const [open, setOpen] = useState(false);
  const [dataGuruId, setDataGuruId] = useState(null);

  const handleOpen = (e) => {
    setDataGuruId(e);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  // handleDelete data guru
  const handleDelete = (e) => {
    e.preventDefault();
    console.log("button clicked");
    try {
      authServices.handleDeleteGuru(dataGuruId);
      setOpen(false);
      window.location.reload();
    } catch (error) {
      alert(error.message)
    }
  }

  // handleEdit data guru
  const [editData, setEditData] = useState(null);
  const handleEdit = (data) => {
    setEditData(data);
    setClicked(true);
  }

  const handleFormTambahGuru = () => {
    if (!clicked) {
      return <div className='container_wrapper_admin'>
        {/* {console.log(rows)} */}
        {/* {console.log(data[0].ttl.split(',')[0])} */}
        <TitlePageAndButton
          title="Kelola Data Guru"
          handleFunction={handleBtnCreateDataGuru}
          titleButton="Tambah Data Guru"
        />
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
              {loading ?
                (<TableBody>
                  <TableRow>
                    <TableCell colSpan={column.length}>
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <CircularProgress />
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>)
                : error ?
                  (<Alert severity="error">{error}</Alert>)
                  :
                  (<TableBody>
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
                                        variant='contained'
                                        color="primary"
                                        style={{ marginRight: '5px' }}
                                        size='small'
                                        onClick={() => { handleEdit(row) }}
                                      >
                                        Edit
                                      </Button>
                                      <Button
                                        variant='contained'
                                        color="error"
                                        size='small'
                                        onClick={() => { handleOpen(row.id) }}
                                      >
                                        Delete
                                      </Button>
                                    </>
                                  ) : (value)}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>)
              }

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
      </div>
    } else {
      return <FormDataGuru editData={editData} />
    }


  }

  return (
    <div className='container_admin'>
      <NavbarDefault />
      <div className='container_page_and_sidebar'>
        <aside className='container_sidebar_admin'>
          <SidebarDefault />
        </aside>

        <div className='container_content_admin'>
          {handleFormTambahGuru()}

        </div>
      </div>

    </div>
  )
}

export default KelolaDataGuru