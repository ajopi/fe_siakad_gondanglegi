import React from 'react'
import './FormPenilaian.css'
import TitlePage from '../TitlePageAndButton/TitlePage/TitlePage'
import ButtonDefault from '../TitlePageAndButton/ButtonDefault/ButtonDefault'


const FormPenilaian = () => {
    return (
        <div className='container_form_penilaian'>
            <TitlePage title="Form Penilaian Mata Pelajaran" />

            <label htmlFor='kelas' className='label_form_penilaian' style={{ marginTop: '20px' }} >Kelas</label>
            <form>
                <select name='kelas' id='kelas' className='input_form_penilaian' defaultValue={'PilihKelas'}>
                    <option disabled className='option_form_penilaian' value={'PilihKelas'}>Pilih Kelas</option>
                    <option value={"X"} className='option_form_penilaian'>X</option>
                    <option value={"XI"} className='option_form_penilaian'>XI</option>
                    <option value={"XII"} className='option_form_penilaian'>XII</option>
                </select>
            </form>

            <label htmlFor='jurusan' className='label_form_penilaian'>Jurusan</label>
            <form>
                <select name='jurusan' id='jurusan' className='input_form_penilaian' defaultValue={'PilihJurusan'}>
                    <option disabled className='option_form_penilaian' value={'PilihJurusan'}>Pilih Jurusan</option>
                    <option value={"RPL"} className='option_form_penilaian'>RPL</option>
                    <option value={"TKJ"} className='option_form_penilaian'>TKJ</option>
                    <option value={"TKR"} className='option_form_penilaian'>TKR</option>
                </select>
            </form>

            <label htmlFor='mata_pelajaran' className='label_form_penilaian'>Mata Pelajaran</label>
            <form>
                <select name='mata_pelajaran' id='mata_pelajaran' className='input_form_penilaian' defaultValue={'PilihMataPelajaran'}>
                    <option disabled className='option_form_penilaian' value={'PilihMataPelajaran'}>Pilih Mata Pelajaran</option>
                    <option value={"Matematika"} className='option_form_penilaian'>Matematika</option>
                    <option value={"Fisika"} className='option_form_penilaian'>Fisika</option>
                    <option value={"Biologi"} className='option_form_penilaian'>Biologi</option>
                </select>
            </form>

            <div className='container_button_form_penilaian'>
                <ButtonDefault titleButton="Submit" />
            </div>

            <div>
                table
            </div>
        </div>
    )
}

export default FormPenilaian