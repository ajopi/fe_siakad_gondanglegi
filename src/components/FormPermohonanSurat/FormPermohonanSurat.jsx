import React, { useState } from 'react'
import './FormPermohonanSurat.css'
import TitlePage from '../TitlePageAndButton/TitlePage/TitlePage'
import ButtonDefault from '../TitlePageAndButton/ButtonDefault/ButtonDefault'
import axios from 'axios'


const FormPermohonanSurat = () => {
  const [name, setName] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [unitKerja, setUnitKerja] = useState("");
  const [keperluan, setKeperluan] = useState("");
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [tanggalSelesai, setTanggalSelesai] = useState("");


  const handleCreateSurat = (e) => {
    e.preventDefault();
    const user_token = sessionStorage.getItem('token');
    let data = JSON.stringify({
      "kegiatan": name,
      "jabatan": jabatan,
      "unit_kerja": unitKerja,
      "keperluan": keperluan,
      "ijin_mulai": tanggalMulai,
      "ijin_berakhir": tanggalSelesai
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}/api/v1/dinas`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-access-token': user_token
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        alert("Data Berhasil Dibuat");
      })
      .catch((error) => {
        console.log(error);
      });

  }


  return (
    <div className='container_form_permohonan_surat'>
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleCreateSurat}>
        <TitlePage title="Form Permohonan Surat Guru" />
        <label htmlFor='name' className='label_form_permohonan_surat' style={{ marginTop: '20px' }} >Nama</label>
        <input id='name' className='input_form_permohonan_surat' type='text' placeholder='Tuliskan Nama Anda' value={name} onChange={(e) => setName(e.target.value)} required />

        <label htmlFor='jabatan' className='label_form_permohonan_surat'>Jabatan</label>
        <input id='jabatan' className='input_form_permohonan_surat' type='text' placeholder='Tuliskan Jabatan Anda' value={jabatan} onChange={(e) => setJabatan(e.target.value)} required />

        <label htmlFor='unitKerja' className='label_form_permohonan_surat'>Unit Kerja</label>
        <input id='unitKerja' className='input_form_permohonan_surat' type='text' placeholder='Tuliskan Unit Kerja Anda' value={unitKerja} onChange={(e) => setUnitKerja(e.target.value)} required />

        <label htmlFor='keperluan' className='label_form_permohonan_surat'>Keperluan</label>
        <input id='keperluan' className='input_form_permohonan_surat' type='text' placeholder='Tuliskan Keperluan Anda' value={keperluan} onChange={(e) => setKeperluan(e.target.value)} required />

        <div className='container_date_time_form_permohonan_surat'>
          <div className='container_tanggal_mulai'>
            <label htmlFor='tanggalMulai' className='label_form_permohonan_surat'>Tanggal Mulai</label>
            <input id='tanggalMulai' type='date' className='input_date_form_permohonan_surat' value={tanggalMulai} onChange={(e) => setTanggalMulai(e.target.value)} />
          </div>
          <div className='container_tanggal_selesai'>
            <label htmlFor='tanggalSelesai' className='label_form_permohonan_surat'>Tanggal Selesai</label>
            <input id='tanggalSelesai' type='date' className='input_date_form_permohonan_surat' value={tanggalSelesai} onChange={(e) => setTanggalSelesai(e.target.value)} required />
          </div>
        </div>
        <div className='container_button_submit'>
          <ButtonDefault titleButton="Submit" />
        </div>
      </form>
    </div>
  )
}

export default FormPermohonanSurat