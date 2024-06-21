import React, { useEffect, useState } from 'react'
import './JadwalSekolah.css'
import NavbarDefault from '../../../components/NavbarDefault/NavbarDefault'
import SidebarDefault from '../../../components/SidebarDefault/SidebarDefault'
import TitlePage from '../../../components/TitlePageAndButton/TitlePage/TitlePage'
import axios from 'axios'


const JadwalSekolah = () => {
    const [dataAktivitas, setDataAktivitas] = useState([])

    // handle get data aktivitas
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const FormData = require('form-data');
        let data = new FormData();

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${process.env.REACT_APP_BASE_URL}/api/v1/activ`,
            headers: {
                'x-access-token': token,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, [])

    return (
        <div className='container_jadwalsekolah'>
            <NavbarDefault />
            <div className='container_page_and_sidebar'>
                <aside className='container_sidebar_jadwalsekolah'>
                    <SidebarDefault />
                </aside>

                <div className='container_content_jadwalsekolah'>
                    <div className='container_wrapper_jadwalSekolah'>
                        <TitlePage title='Jadwal Kegiatan Sekolah' />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default JadwalSekolah