import React, { useEffect, useState } from 'react'
import './KelolaDataSiswa.css'
import '../styleAdmin.css'
import NavbarDefault from '../../../components/NavbarDefault/NavbarDefault'
import SidebarDefault from '../../../components/SidebarDefault/SidebarDefault'
import TitlePageAndButton from '../../../components/TitlePageAndButton/TitlePageAndButton'
import { Alert, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import FormDataSiswa from '../../../components/FormDataSiswa/FormDataSiswa'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataApi } from '../../../redux/slice/getDataSlice'
import ConfirmationDialog from '../../../components/ConfirmationDialog/ConfirmationDialog'
import authServices from '../../../Services/auth.services'

const KelolaDataSiswa = () => {
  // get data from redux store
  const { data, loading, error } = useSelector((state) => state.getDataSiswa)
  const dispatch = useDispatch()


  const [clicked, setClicked] = useState(false);

  // column table
  const column = [
    {
      id: 'no',
      label: 'No',
      width: '5%'
    },
    {
      id: 'nama',
      label: 'Nama',
      width: '10%'
    },
    {
      id: 'nisn',
      label: 'NISN',
      width: '5%'
    },
    {
      id: 'kelas',
      label: 'Kelas',
      width: '5%',
      align: 'center'
    },
    {
      id: 'jurusan',
      label: 'Jurusan',
      width: '15%',
      align: 'center'
    },
    {
      id: 'alamat',
      label: 'Alamat',
      width: '25%',
      align: 'justify'
    },
    {
      id: 'jenis_kelamin',
      label: 'Jenis Kelamin',
      width: '10%',
      align: 'center'
    },
    {
      id: 'action',
      label: 'Action',
      width: '25%',
      align: 'center'
    }
  ]
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // pagination table
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  // useeffect untuk redux
  useEffect(() => {
    dispatch(fetchDataApi())
  }, [dispatch])

  // mapping data siswa from redux to set into rows
  useEffect(() => {
    console.log(data)
    if (data.length > 0) {
      const getDataSiswa = data.map((value, index) => {
        return {
          id: value.id,
          no: index + 1,
          nama: value.nama,
          nisn: value.nisn === null ? "-" : value.nisn,
          kelas: value.kelas,
          jurusan: value.jurusan === "LIST" ? "LISTRIK" : value.jurusan,
          alamat: value.alamat === null ? "-" : value.alamat,
          jenis_kelamin: value.jenis_kelamin,
          agama: value.agama === null ? "-" : value.agama,
          ayah: value.ayah === null ? "-" : value.ayah,
          no_ayah: value.no_ayah === null ? "-" : "+62" + value.no_ayah,
          ibu: value.ibu === null ? "-" : value.ibu,
          no_ibu: value.no_ibu === null ? "-" : "+62" + value.no_ibu,
          tanggalLahir: value.lhr_tbt === null ? "-" : value.lhr_tbt,
          tempatLahir: value.lhr_tempat === null ? "-" : value.lhr_tempat,
        }
      })
      setRows(getDataSiswa)
    }
  }, [data])


  // function untuk handle delete n confirmation dialog
  const [open, setOpen] = useState(false);
  const [dataSiswaId, setDataSiswaId] = useState(null);
  const handleOpen = (e) => {
    setDataSiswaId(e);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }
  const handleDelete = () => {
    try {
      authServices.handleDeleteSiswa(dataSiswaId);
      window.location.reload();
    } catch (error) {
      console.log(error)
    }
  }

  // function dan Hook untuk menyimpan edit data
  const [editData, setEditData] = useState(null)

  const handleEdit = (data) => {
    setEditData(data);
    setClicked(true);
  }

  const handleFormSiswa = () => {
    if (!clicked) {
      return <div className='container_wrapper_admin'>
        {/* {console.log(rows)} */}
        {/* {console.log(data[0].ttl.split(',')[0])} */}
        <TitlePageAndButton
          title="Kelola Data Siswa"
          handleFunction={() => { setClicked(true) }}
          titleButton="Tambah Data Siswa"
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
                                      {console.log(dataSiswaId)}
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
      return <FormDataSiswa editData={editData} />
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
          {handleFormSiswa()}

        </div>
      </div>

    </div>
  )
}

export default KelolaDataSiswa