import React, { useDebugValue, useEffect, useState } from 'react'
import './KelolaSuratGuru.css'
import '../styleAdmin.css'
import NavbarDefault from '../../../components/NavbarDefault/NavbarDefault'
import SidebarDefault from '../../../components/SidebarDefault/SidebarDefault'
import TitlePageAndButton from '../../../components/TitlePageAndButton/TitlePageAndButton'
import { Alert, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import ConfirmationDialog from '../../../components/ConfirmationDialog/ConfirmationDialog'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataSurat } from '../../../redux/slice/getDataSurat'
import TitlePage from '../../../components/TitlePageAndButton/TitlePage/TitlePage'
import axios from 'axios'

const KelolaSuratGuru = () => {
  const { data, loading, error } = useSelector((state) => state.getDataSuratReducer)
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('token');

  // columnn table
  const column = [
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

  // GET DATA FROM REDUX
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchDataSurat())
    console.log(data);
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
    return setRows(getData)
  }, [data])

  // PAGINATION
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  // Handle Approve Btn
  const handleAprove = (id) => {
    let data = JSON.stringify({
      "putusan": "Disetujui"
    });

    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/dinas/${id}/validation`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-access-token': token
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        alert("Surat berhasil disetujui!");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });

  }



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

  // Handle Delete Surat
  const handleDeleteSurat = () => {
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/dinas/${dataSuratId}/delete`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-access-token': token
      }
    };

    axios.request(config)
      .then((response) => {
        alert("Surat berhasil dihapus!");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });

  }
  return (
    <div className='container_admin'>
      <NavbarDefault />
      <div className='container_page_and_sidebar'>
        <aside className='container_sidebar_admin'>
          <SidebarDefault />
        </aside>

        <div className='container_content_admin'>
          <div className='container_wrapper_admin'>
            <TitlePage title="Kelola Surat Guru" />

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
                                            color="success"
                                            style={{ marginRight: '5px' }}
                                            size='small'
                                            onClick={() => { handleAprove(row.id) }}
                                          >
                                            {console.log(row)}
                                            Approve
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
                onConfirm={handleDeleteSurat}
                dialogTitle={"Konfirmasi Hapus!!"}
                dialogContent={"Apakah anda yakin ingin menghapus data ini?"}
              />
            </Paper >
          </div>

        </div>
      </div>

    </div>
  )
}

export default KelolaSuratGuru