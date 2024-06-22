import React, { useEffect, useState } from 'react'
import './PenilaianGuru.css'
import NavbarDefault from '../../../components/NavbarDefault/NavbarDefault'
import SidebarDefault from '../../../components/SidebarDefault/SidebarDefault'
import TitlePageAndButton from '../../../components/TitlePageAndButton/TitlePageAndButton'
import FormPenilaian from '../../../components/FormPenilaian/FormPenilaian'
import axios from 'axios'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material'

const PenilaianGuru = () => {
  const [clicked, setClicked] = useState(0);

  const handleBtnCreateForm = () => {
    setClicked(clicked + 1);
  }


  // TABLE
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const column = [
    {
      id: 'no',
      label: 'No',
      width: '10%'
    },
    {
      id: 'nama_siswa',
      label: 'Nama Siswa',
      width: '22.5%'
    },
    {
      id: 'kelas',
      label: 'Kelas',
      width: '22.5%',
      align: 'center'
    },
    {
      id: 'jurusan',
      label: 'Jurusan',
      width: '22.5%',
      align: 'left'
    },
    {
      id: 'nilai_akhir',
      label: 'Nilai AKhir',
      width: '22.5%',
      align: 'left'
    },
  ]
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };



  // Get data All Siswa
  useEffect(() => {
    const user_token = sessionStorage.getItem('token');
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/siswa`,
      headers: {
        'x-access-token': user_token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };
    axios.request(config)
      .then((response) => {
        const data = response.data.siswa.map((value, index) => {
          const nilai = value.raport.map(item => parseInt(item.nilai));
          const jumlahNilai = nilai.length > 0 ? nilai.reduce((acc, curr) => acc + curr) : 0;
          const rataNilai = nilai.length > 0 ? (jumlahNilai / nilai.length).toFixed(2) : "Nilai Belum Masuk";
          return {
            no: index + 1,
            nama_siswa: value.nama,
            kelas: value.kelas,
            jurusan: value.jurusan,
            nilai_akhir: rataNilai
          };
        });

        setRows(data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, [])

  const handleFormCreateSurat = () => {
    if (clicked === 0) {
      return <div className='container_wrapper_penilaian_guru'>
        <TitlePageAndButton
          title="Penilaian Mata Pelajaran"
          handleFunction={handleBtnCreateForm}
          titleButton="Tambah Nilai Mata Pelajaran"
        />
        {/* MUI TABLE */}

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
                                    // startIcon={<EditIcon />}
                                    variant="contained"
                                    color="primary"
                                    style={{ marginRight: '8px' }}
                                  // onClick={handleEdit}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    // startIcon={<DeleteIcon />}
                                    variant="contained"
                                    color="secondary"
                                  // onClick={() => { handleOpen(row.id) }}
                                  >
                                    {/* {console.log(dataSuratId)} */}
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
          {/* <ConfirmationDialog
            open={open}
            onClose={handleClose}
            onConfirm={handleDelete}
            dialogTitle={"Konfirmasi Hapus!!"}
            dialogContent={"Apakah anda yakin ingin menghapus data ini?"}
          /> */}
        </Paper >

      </div>
    } else {
      return <FormPenilaian />
    }
  }



  return (
    <div className='container_penilaian_guru'>
      <NavbarDefault />
      <div className='container_page_and_sidebar'>
        <aside className='container_sidebar_penilaian_guru'>
          <SidebarDefault />
        </aside>

        <div className='container_content_penilaian_guru'>
          {handleFormCreateSurat()}
        </div>
      </div>

    </div>
  )
}

export default PenilaianGuru