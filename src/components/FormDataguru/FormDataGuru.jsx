import React, { useEffect, useState } from 'react'
import './FormDataGuru.css'
import TitlePage from '../TitlePageAndButton/TitlePage/TitlePage'
import ButtonDefault from '../TitlePageAndButton/ButtonDefault/ButtonDefault'
import axios from 'axios'

const FormDataGuru = ({ editData }) => {
    // const [gender, setgender] = useState("");
    const [formValue, setFormValue] = useState({
        nama: '',
        nuptk: '',
        nbm: '',
        tanggalLahir: '',
        tempatLahir: '',
        usia: '',
        th_masuk: '',
        bl_masuk: '',
        status: '',
        jabatan: '',
        pendidikan: '',
        perguruan_tinggi: '',
        th_lulus: '',
        jurusan: '',
        diklat: '',
        alamat: '',
        gender: ''
    })

    const handleFormInput = (e) => {
        const { id, value } = e.target
        setFormValue({ ...formValue, [id]: value })
    }

    const handleGender = (e) => {
        setFormValue({ ...formValue, gender: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('token');
        let data = JSON.stringify({
            "nama": formValue.nama,
            "nuptk": formValue.nuptk,
            "nbm": formValue.nbm,
            "gender": formValue.gender,
            "ttl": `${formValue.tempatLahir} ${formValue.tanggalLahir}`,
            "usia": formValue.usia,
            "th_masuk": formValue.th_masuk,
            "th_masuk_bulan": formValue.bl_masuk,
            "status": formValue.status,
            "jabatan": formValue.jabatan,
            "it_tk": formValue.pendidikan,
            "it_sekolah": formValue.perguruan_tinggi,
            "it_jurusan": formValue.jurusan,
            "it_tahun": formValue.th_lulus,
            "mata_diklat": formValue.diklat,
            "alamat": formValue.alamat,
        });

        let config = {
            method: editData ? 'put' : 'post',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_BASE_URL}/api/v1/guru${editData ? `/${editData.id}/update` : ''}`,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': token
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                alert(editData ? "Berhasil mengupdate data" : "Berhasil menambahkan data");
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });

    }


    useEffect(() => {
        if (editData) {
            setFormValue({
                nama: editData.nama_guru || '',
                nuptk: editData.nuptk || '',
                nbm: editData.nbm || '',
                tempatLahir: editData.tempatLahir || '',
                usia: editData.usia || '',
                th_masuk: editData.th_masuk || '',
                bl_masuk: editData.bl_masuk || '',
                status: editData.status || '',
                jabatan: editData.jabatan || '',
                pendidikan: editData.pendidikan || '',
                perguruan_tinggi: editData.perguruan_tinggi || '',
                th_lulus: editData.th_lulus || '',
                jurusan: editData.jurusan || '',
                diklat: editData.diklat || '',
                alamat: editData.alamat || '',
                gender: editData.gender || ''
            })
        }
    }, [editData])

    return (
        <div className='wrapper_form_data_guru'>
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
                <TitlePage title="Form Tambah Data Guru" />
                <label htmlFor='nama' className='label_form_data_guru' style={{ marginTop: '20px' }} >Nama Guru</label>
                <input id='nama' className='input_form_data_guru' type='text' placeholder='Tuliskan Nama Guru' required onChange={handleFormInput} value={formValue.nama || ''} />

                <label htmlFor='nuptk' className='label_form_data_guru'>NUPTK</label>
                <input id='nuptk' className='input_form_data_guru' type='text' placeholder='Tuliskan NUPTK Guru Jika Ada' onChange={handleFormInput} value={formValue.nuptk  || ''} />

                <label htmlFor='nbm' className='label_form_data_guru'>Nomor Baku Muhammadiyah</label>
                <input id='nbm' className='input_form_data_guru' type='text' placeholder='Tuliskan NBM Jika Ada' onChange={handleFormInput} value={formValue.nbm  || ''} />

                <label className='label_form_data_guru'>Jenis Kelamin</label>
                <div className='container_jenis_kelamin_form_data_guru' >
                    <input id='radio_perempuan' name='radio_gender' className='input_form_data_guru_jenis_kelamin' type='radio' value={"P"  || ''} checked={formValue.gender === "P"} onChange={handleGender} /> Perempuan
                    <input style={{ marginLeft: '10px' }} id='radio_laki' name='radio_gender' className='input_form_data_guru_jenis_kelamin' type='radio' value={"L"  || ''} checked={formValue.gender === "L"} onChange={handleGender} /> Laki - Laki
                </div>
                {/* {console.log(formValue)} */}


                <div className='container_date_time_form_data_guru'>
                    <div className='container_tanggal_lahir_form_data_guru'>
                        <label htmlFor='tanggalLahir' className='label_form_data_guru'>Tanggal Lahir</label>
                        <input id='tanggalLahir' type='date' className='input_date_form_aktivitas' onChange={handleFormInput} value={formValue.tanggalLahir  || ''} />
                    </div>

                    <div className='container_tanggal_lahir_form_data_guru'>
                        <label htmlFor='tempatLahir' className='label_form_data_guru'>Tempat Lahir</label>
                        <input id='tempatLahir' type='text' placeholder='Tuliskan Tempat Lahir' className='input_date_form_aktivitas' required onChange={handleFormInput} value={formValue.tempatLahir  || ''} />
                    </div>
                </div>

                <div className='container_date_time_form_data_guru'>
                    <div className='container_tanggal_lahir_form_data_guru'>
                        <label htmlFor='usia' className='label_form_data_guru'>Usia</label>
                        <input id='usia' type='text' placeholder='Tuliskan Usia Guru' className='input_date_form_aktivitas' onChange={handleFormInput} value={formValue.usia  || ''} />
                    </div>
                    <div className='container_tanggal_lahir_form_data_guru'>
                        <label htmlFor='th_masuk' className='label_form_data_guru'>Tahun Masuk</label>
                        <input id='th_masuk' type='text' placeholder='Tahun Masuk Guru' className='input_date_form_aktivitas' onChange={handleFormInput} value={formValue.th_masuk  || ''} />
                    </div>
                    <div className='container_tanggal_lahir_form_data_guru'>
                        <label htmlFor='bl_masuk' className='label_form_data_guru'>Bulan Masuk</label>
                        <input id='bl_masuk' type='text' placeholder='Bulan Masuk Guru' className='input_date_form_aktivitas' onChange={handleFormInput} value={formValue.bl_masuk  || ''} />
                    </div>
                </div>

                <label htmlFor='status' className='label_form_data_guru'>Status</label>
                <input id='status' className='input_form_data_guru' type='text' placeholder='Status Guru: GTY or GTT' onChange={handleFormInput} value={formValue.status  || ''} />

                <label htmlFor='jabatan' className='label_form_data_guru'>Jabatan</label>
                <input id='jabatan' className='input_form_data_guru' type='text' placeholder='Tuliskan Jabatan Guru' required onChange={handleFormInput} value={formValue.jabatan  || ''} />

                <label htmlFor='pendidikan' className='label_form_data_guru'>Pendidikan Terakhir</label>
                <input id='pendidikan' className='input_form_data_guru' type='text' placeholder='Pendidikan Terakhir' onChange={handleFormInput} value={formValue.pendidikan  || ''} />

                <label htmlFor='perguruan_tinggi' className='label_form_data_guru'>Nama Perguruan TInggi</label>
                <input id='perguruan_tinggi' className='input_form_data_guru' type='text' placeholder='Tuliskan Nama Perguruan Tinggi' onChange={handleFormInput} value={formValue.perguruan_tinggi  || ''} />

                <label htmlFor='th_lulus' className='label_form_data_guru'>Tahun Lulus Perguruan Tinggi</label>
                <input id='th_lulus' className='input_form_data_guru' type='text' placeholder='Masukkan Tahun Lulus Perguruan Tinggi' onChange={handleFormInput} value={formValue.th_lulus  || ''} />

                <label htmlFor='jurusan' className='label_form_data_guru'>Jurusan</label>
                <input id='jurusan' className='input_form_data_guru' type='text' placeholder='Jurusan' onChange={handleFormInput} value={formValue.jurusan  || ''} />

                <label htmlFor='diklat' className='label_form_data_guru'>Mata Diklat</label>
                <input id='diklat' className='input_form_data_guru' type='text' placeholder='Mata Diklat' required onChange={handleFormInput} value={formValue.diklat  || ''} />

                <label htmlFor='alamat' className='label_form_data_guru'>Alamat</label>
                <input id='alamat' className='input_form_data_guru' type='text' placeholder='Alamat' required onChange={handleFormInput} value={formValue.alamat  || ''} />

                <div className='container_button_submit'>
                    <ButtonDefault titleButton="Submit" />
                </div>
            </form>
        </div>
    )
}

export default FormDataGuru