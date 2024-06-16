import React from 'react'
import './FormPermohonanSurat.css'
import TitlePage from '../TitlePageAndButton/TitlePage/TitlePage'
import ButtonDefault from '../TitlePageAndButton/ButtonDefault/ButtonDefault'


const FormPermohonanSurat = () => {
  return (
    <div className='container_form_permohonan_surat'>
      <TitlePage title="Form Permohonan Surat Guru" />
      <label className='label_form_permohonan_surat' style={{ marginTop: '20px' }} >Nama</label>
      <input className='input_form_permohonan_surat' type='text' placeholder='Tuliskan Nama Anda' />

      <label className='label_form_permohonan_surat'>Jabatan</label>
      <input className='input_form_permohonan_surat' type='text' placeholder='Tuliskan Jabatan Anda' />

      <label className='label_form_permohonan_surat'>Unit Kerja</label>
      <input className='input_form_permohonan_surat' type='text' placeholder='Tuliskan Unit Kerja Anda' />

      <label className='label_form_permohonan_surat'>Keperluan</label>
      <input className='input_form_permohonan_surat' type='text' placeholder='Tuliskan Keperluan Anda' />

      <div className='container_date_time_form_permohonan_surat'>
        <div className='container_tanggal_mulai'>
          <label className='label_form_permohonan_surat'>Tanggal Mulai</label>
          <input type='date' className='input_date_form_permohonan_surat' />
        </div>
        <div className='container_tanggal_selesai'>
          <label className='label_form_permohonan_surat'>Tanggal Selesai</label>
          <input type='date' className='input_date_form_permohonan_surat' />
        </div>
      </div>
      <div className='container_button_submit'>
        <ButtonDefault titleButton="Submit"/>
      </div>
    </div>
  )
}

export default FormPermohonanSurat