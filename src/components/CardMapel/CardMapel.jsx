import React, { useState } from 'react'
import './CardMapel.css'
import TitlePage from '../TitlePageAndButton/TitlePage/TitlePage'
import FormPenilaian from '../FormPenilaian/FormPenilaian'


const CardMapel = () => {
    const [clicked, setClicked] = useState(false);
    const [typeMapel, setTypeMapel] = useState(null)
    const dataMapel = [
        {
            id: 1,
            mapel: "PENDIDIKAN AGAMA DAN BUDI PEKERTI",
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

    const handleClick = (typeMapel) => {
        setClicked(true);
        setTypeMapel(typeMapel);
    }

    const handleForm = () => {
        if (!clicked) {
            return (
                dataMapel.map((value) => {
                    return (
                        <div className='card_mapel' key={value.id}>
                            <span className='span_mapel'>{value.mapel}</span><hr />
                            <button className='btn_pilih_mapel' onClick={() => handleClick(value.id)}>Pilih</button>
                        </div>
                    )
                })
            )
        } else {
            return <FormPenilaian typeMapel={typeMapel} />
        }
    }

    return (
        <div className='container_card_mapel'>
            <TitlePage title='Penilaian Mata Pelajaran' />
            <div className='container_content_card'>
                {handleForm()}
            </div>
                {console.log(typeMapel)}
        </div>
    )
}

export default CardMapel