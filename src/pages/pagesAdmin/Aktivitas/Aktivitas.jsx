import React, { useEffect, useState } from 'react'
import '../styleAdmin.css'
import NavbarDefault from '../../../components/NavbarDefault/NavbarDefault'
import SidebarDefault from '../../../components/SidebarDefault/SidebarDefault'
import TitlePageAndButton from '../../../components/TitlePageAndButton/TitlePageAndButton'
import FormAktivitas from '../../../components/FormAktivitas/FormAktivitas'
import axios from 'axios'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'
import authServices from '../../../Services/auth.services'
import ConfirmationDialog from '../../../components/ConfirmationDialog/ConfirmationDialog'

const Aktivitas = () => {
  const [clicked, setClicked] = useState(0);

  const handleBtnCreateAktivitas = () => {
    setClicked(clicked + 1);
    console.log(clicked);
  }

  // get data
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
          return {
            id: value.id,
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
      label: 'No',
      width: '10%'
    },
    {
      id: 'kegiatan',
      label: 'Nama Kegiatan',
      width: '22.5%'
    },
    {
      id: 'start_date',
      label: 'Tanggal Mulai',
      width: '22.5%'
    },
    {
      id: 'end_date',
      label: 'Tanggal Berakhir',
      width: '22.5%'
    },
    {
      id: 'action',
      label: 'Action',
      width: '22.5%',
      align: 'center'
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

  // MODAL n function confirmation
  const [open, setOpen] = useState(false);
  const [dataAktivitasId, setDataAktivitasId] = useState(null);

  const handleOpen = (e) => {
    setDataAktivitasId(e);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleDelete = (e) => {
    e.preventDefault();
    console.log("button clicked");
    try {
      authServices.handleDeleteAktivitas(dataAktivitasId);
      setOpen(false);
      window.location.reload();
    } catch (error) {
      alert(error.message)
    }
  }

  const handleFormCreateAktivitas = () => {
    if (clicked === 0) {
      return <div className='container_wrapper_admin'>
        <TitlePageAndButton
          title="Aktivitas"
          handleFunction={handleBtnCreateAktivitas}
          titleButton="Buat Aktivitas Baru"
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
                                    variant='contained'
                                    color="primary"
                                    style={{ marginRight: '10px' }}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    variant='contained'
                                    color="error"
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
      </div>
    } else {
      return <FormAktivitas />
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
          {handleFormCreateAktivitas()}

        </div>
      </div>

    </div>
  )
}

export default Aktivitas