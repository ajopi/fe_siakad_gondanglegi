import React, { useState } from 'react'
import './FormPenilaian.css'
import TitlePage from '../TitlePageAndButton/TitlePage/TitlePage'
import ButtonDefault from '../TitlePageAndButton/ButtonDefault/ButtonDefault'


const FormPenilaian = () => {
    const [kelasSelected, setKelasSelected] = useState("");
    const kelas = [
        {
            id: 0,
            kelas: "PILIH KELAS",
            disabled: true,
            defaultValue: "PILIH KELAS"
        },
        {
            id: 1,
            kelas: "X"
        },
        {
            id: 2,
            kelas: "XI"
        },
        {
            id: 3,
            kelas: "XII"
        }
    ]

    const jurusan = [
        {
            id: 0,
            jurusan: "PILIH JURUSAN",
            disabled: true,
            defaultValue: "PILIH JURUSAN"
        },
        {
            id: 1,
            jurusan: "LISTRIK"
        },
        {
            id: 2,
            jurusan: "TKR"
        },
        {
            id: 3,
            jurusan: "MEKATRONIK"
        }
    ]

    const dataMapel = [
        {
            id: 0,
            mapel: "PILIH MATA PELAJARAN",
            disabled: true,
            defaultValue: "PILIH MATA PELAJARAN"
        },
        {
            id: 1,
            mapel: "PENDIDIKAN AGAMA DAN BUDI PEKERTI"
        },
        {
            id: 2,
            mapel: "PENDIDIKAN PANCASILA DAN KEWARGANEGARAAN"
        },
        {
            id: 3,
            mapel: "BAHASA INDONESIA"
        },
        {
            id: 4,
            mapel: "SEJARAH"
        },
        {
            id: 5,
            mapel: "SENI BUDAYA"
        },
        {
            id: 6,
            mapel: "PJOK"
        },
        {
            id: 7,
            mapel: "KEMUHAMMADIYAHAN"
        },
        {
            id: 8,
            mapel: "BAHASA ARAB"
        },
        {
            id: 9,
            mapel: "MATEMATIKA KEJURUAN"
        },
        {
            id: 10,
            mapel: "INFORMATIKA"
        },
        {
            id: 11,
            mapel: "PROYEK IPAS"
        }
    ]

    const handleSlectKelas = (e) => {
        setKelasSelected(e.target.value)
    }

    console.log(kelasSelected);
    return (
        <div className='container_form_penilaian'>
            <TitlePage title="Form Penilaian Mata Pelajaran" />

            <form>
                {/* Opsi Kelas */}
                <label htmlFor='kelas' className='label_form_penilaian' style={{ marginTop: '20px' }} >Kelas</label>
                <select name='kelas' id='kelas' className='input_form_penilaian' defaultValue="PILIH KELAS" onChange={handleSlectKelas}>
                    {kelas.map((value) => {
                        return <option
                            disabled={value.disabled || false}
                            key={value.id}
                            value={value.kelas}
                            className='option_form_penilaian'>
                            {value.kelas}
                        </option>
                    })}
                </select>

                {/* OPSI JURUSAN */}
                <label htmlFor='jurusan' className='label_form_penilaian'>Jurusan</label>
                <select name='jurusan' id='jurusan' className='input_form_penilaian' defaultValue="PILIH JURUSAN">
                    {jurusan.map((value) => {
                        return (
                            <option
                                disabled={value.disabled || false}
                                key={value.id}
                                value={value.jurusan}
                                className='option_form_penilaian'
                            >
                                {value.jurusan}
                            </option>
                        )
                    })}
                </select>

                {/* OPSI MAPEL */}
                <label htmlFor='mata_pelajaran' className='label_form_penilaian'>Mata Pelajaran</label>
                <select name='mata_pelajaran' id='mata_pelajaran' className='input_form_penilaian' defaultValue="PILIH MATA PELAJARAN">
                    {dataMapel.map((value) => {
                        return (
                            <option
                                disabled={value.disabled || false}
                                key={value.id}
                                value={value.mapel}
                                className='option_form_penilaian'
                            >
                                {value.mapel}
                            </option>
                        )
                    })}
                </select>

                <div className='container_button_form_penilaian'>
                    <ButtonDefault titleButton="Submit" />
                </div>
            </form>

            <div>
                table
            </div>
        </div>
    )
}

export default FormPenilaian