import React, { useEffect, useState } from 'react'
import TitlePage from '../TitlePageAndButton/TitlePage/TitlePage'
import './FormAktivitas.css'
import ButtonDefault from '../TitlePageAndButton/ButtonDefault/ButtonDefault'
import axios from 'axios'

const FormAktivitas = ({ editData }) => {
  const [namaKegiatan, setNamaKegiatan] = useState("")
  const [dateStart, setDateStart] = useState("")
  const [dateEnd, setDateEnd] = useState("")

  useEffect(() => {
    if (editData) {
      setNamaKegiatan(editData.kegiatan)
      console.log(namaKegiatan);
      setDateStart(editData.start_date)
      setDateEnd(editData.end_date)
    }
  }, [editData])


  const handleSubmit = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token')
    let data = JSON.stringify({
      "kegiatan": namaKegiatan,
      "mulai": dateStart,
      "selesai": dateEnd
    });

    let config = {
      method: editData ? 'put' : 'post',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/activ${editData ? `/${editData.id}/update` : ''}`,
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
        alert(editData ? "Berhasil mengupdate data" : "Berhasil menambahkan data");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }


  return (
    <div className='wrapper_form_aktivitas'>
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
        <TitlePage title="Form Aktivitas" />
        <label htmlFor='name' className='label_form_aktivitas' style={{ marginTop: '20px' }} >Nama Kegiatan</label>
        <input id='name' className='input_form_aktivitas' type='text' placeholder='Tuliskan Nama Kegiatan' required onChange={e => { setNamaKegiatan(e.target.value) }} value={namaKegiatan} />


        <div className='container_date_time_form_aktivitas'>
          <div className='container_tanggal_mulai_aktivitas'>
            <label htmlFor='tanggalMulai' className='label_form_aktivitas'>Tanggal Mulai</label>
            <input id='tanggalMulai' type='date' className='input_date_form_aktivitas' required onChange={e => { setDateStart(e.target.value) }} value={dateStart} />
          </div>
          <div className='container_tanggal_selesai_aktivitas'>
            <label htmlFor='tanggalSelesai' className='label_form_aktivitas'>Tanggal Selesai</label>
            <input id='tanggalSelesai' type='date' className='input_date_form_aktivitas' required onChange={e => { setDateEnd(e.target.value) }} value={dateEnd} />
          </div>
        </div>
        <div className='container_button_submit'>
          <ButtonDefault titleButton="Submit" />
        </div>
      </form>
    </div>
  )
}

export default FormAktivitas