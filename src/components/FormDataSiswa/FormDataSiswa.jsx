import React, { useState } from 'react'
import TitlePage from '../TitlePageAndButton/TitlePage/TitlePage'
import ButtonDefault from '../TitlePageAndButton/ButtonDefault/ButtonDefault'
import './FormDataSiswa.css'
import axios from 'axios'

const FormDataSiswa = ({ editData }) => {
    // state management untuk get value input
    const [formValue, setFormValue] = useState({
        nama: '',
        nisn: '',
        kelas: '',
        jurusan: '',
        tanggalLahir: '',
        tempatLahir: '',
        alamat: '',
        jenis_kelamin: '',
        agama: '',
        ayah: '',
        no_ayah: '',
        ibu: '',
        no_ibu: '',
    })

    // function untuk handle form
    const handleFormInput = (e) => {
        const { id, value } = e.target
        setFormValue({ ...formValue, [id]: value })
    }
    const handleGender = (e) => {
        setFormValue({ ...formValue, jenis_kelamin: e.target.value })
    }

    // fungsi handle submit
    const handleSubmit = (e) => {
        e.preventDefault()
        const token = sessionStorage.getItem('token');
        let data = JSON.stringify({
            "nama": formValue.nama,
            "nisn": formValue.nisn,
            "jenis_kelamin": formValue.jenis_kelamin,
            "lhr_tempat": formValue.tempatLahir,
            "lhr_tbt": formValue.tanggalLahir,
            "agama": formValue.agama,
            "alamat": formValue.alamat,
            "ayah": formValue.ayah,
            "no_ayah": formValue.no_ayah,
            "ibu": formValue.ibu,
            "no_ibu": formValue.no_ibu,
            "kelas": formValue.kelas,
            "jurusan": formValue.jurusan
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_BASE_URL}/api/v1/siswa`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': token
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                alert("berasil menambahkan data");
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });

    }

    return (
        <div className='wrapper_form_data_guru'>
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
                <TitlePage title="Form Tambah Data Siswa" />
                <label htmlFor='nama' className='label_form_data_guru' style={{ marginTop: '20px' }} >Nama Siswa</label>
                <input id='nama' className='input_form_data_guru' type='text' placeholder='Tuliskan Nama Siswa' required onChange={handleFormInput} value={formValue.nama || ''} />

                <label htmlFor='nisn' className='label_form_data_guru'>NISN</label>
                <input id='nisn' className='input_form_data_guru' type='text' placeholder='Tuliskan NISN Siswa Jika Ada' onChange={handleFormInput} value={formValue.nisn || ''} />

                <label htmlFor='kelas' className='label_form_data_guru'>Kelas</label>
                <select name='kelas' id='kelas' className='input_select_form_data_siswa' onChange={handleFormInput} required defaultValue='Pilih Kelas'>
                    <option disabled value='Pilih Kelas' >Pilih Kelas</option>
                    <option value='X'>X</option>
                    <option value='XI'>XI</option>
                    <option value='XII'>XII</option>
                </select>

                {console.log(formValue)}
                <span className='label_form_data_guru'>Jenis Kelamin</span>
                <div className='container_jenis_kelamin_form_data_guru' >
                    <input id='radio_perempuan' name='radio_gender' className='input_form_data_guru_jenis_kelamin' type='radio' value={"P" || ''} checked={formValue.jenis_kelamin === "P"} onChange={handleGender} /> Perempuan
                    <input style={{ marginLeft: '10px' }} id='radio_laki' name='radio_gender' className='input_form_data_guru_jenis_kelamin' type='radio' value={"L" || ''} checked={formValue.jenis_kelamin === "L"} onChange={handleGender} /> Laki - Laki
                </div>


                <div className='container_date_time_form_data_guru'>
                    <div className='container_tanggal_lahir_form_data_guru'>
                        <label htmlFor='tanggalLahir' className='label_form_data_guru'>Tanggal Lahir</label>
                        <input id='tanggalLahir' type='date' className='input_date_form_aktivitas' onChange={handleFormInput} value={formValue.tanggalLahir || ''} />
                    </div>

                    <div className='container_tanggal_lahir_form_data_guru'>
                        <label htmlFor='tempatLahir' className='label_form_data_guru'>Tempat Lahir</label>
                        <input id='tempatLahir' type='text' placeholder='Tuliskan Tempat Lahir' className='input_date_form_aktivitas' required onChange={handleFormInput} value={formValue.tempatLahir || ''} />
                    </div>
                </div>

                <label htmlFor='jurusan' className='label_form_data_guru'>Jurusan</label>
                <input id='jurusan' className='input_form_data_guru' type='text' placeholder='Jurusan Siswa' onChange={handleFormInput} value={formValue.jurusan || ''} />

                <label htmlFor='alamat' className='label_form_data_guru'>Alamat</label>
                <input id='alamat' className='input_form_data_guru' type='text' placeholder='Alamat' required onChange={handleFormInput} value={formValue.alamat || ''} />

                <label htmlFor='agama' className='label_form_data_guru'>Agama</label>
                <input id='agama' className='input_form_data_guru' type='text' placeholder='Agama' onChange={handleFormInput} value={formValue.agama || ''} />


                <h4 style={{ fontFamily: 'Poppins', textAlign: 'center', fontWeight: 'bold' }}>Data Wali Siswa</h4>
                <div className='container_data_wali'>
                    <div className='container_content_data_wali_form_data_siswa'>
                        <label htmlFor='ayah' className='label_form_data_guru'>Nama Ayah</label>
                        <input id='ayah' className='input_form_data_guru' type='text' placeholder='Nama Ayah' onChange={handleFormInput} value={formValue.ayah || ''} />

                        <label htmlFor='no_ayah' className='label_form_data_guru'>No Hp Ayah</label>
                        <input id='no_ayah' className='input_form_data_guru' type='text' placeholder='No Hp Ayah' onChange={handleFormInput} value={formValue.no_ayah || ''} />
                    </div>

                    <div className='container_content_data_wali_form_data_siswa'>
                        <label htmlFor='ibu' className='label_form_data_guru'>Nama Ibu</label>
                        <input id='ibu' className='input_form_data_guru' type='text' placeholder='Nama Ibu' onChange={handleFormInput} value={formValue.ibu || ''} />

                        <label htmlFor='no_ibu' className='label_form_data_guru'>No Hp Ibu</label>
                        <input id='no_ibu' className='input_form_data_guru' type='text' placeholder='No Hp Ibu' onChange={handleFormInput} value={formValue.no_ibu || ''} />
                    </div>
                </div>


                <div className='container_button_submit'>
                    <ButtonDefault titleButton="Submit" />
                </div>
            </form>
        </div>
    )
}

export default FormDataSiswa