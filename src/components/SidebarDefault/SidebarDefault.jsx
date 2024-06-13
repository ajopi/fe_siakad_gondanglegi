import React from 'react'
import { SidebarDataGuru } from './SidebarDataGuru'
import './SidebarDefault.css'

const SidebarDefault = () => {
    const handleData = () => {
        const handleData = SidebarDataGuru.map((value, key) => {
            return <ul key={key} className='sidebar_list'>
                <li
                    className='sidebar_list_row'
                    id={window.location.pathname === value.link ? "active" : ""}
                    onClick={() => {
                        window.location.pathname = value.link
                    }}
                >
                    <div className='icon_title_row'>
                        {/* <LocalActivityIcon />
                        Permohonan Surat */}
                        {value.icon}
                        {value.title}
                        {/* <LocalActivityIcon />
                        Permohonan Surat */}
                    </div>
                </li>
            </ul>
        })
        return handleData;
    }

    return (
        <div className='container_sidebar_default'>
            {/* <ul className='sidebar_list'>
                <li className='sidebar_list_row'>
                    <div className='icon_title_row'>
                        <LocalActivityIcon />
                        Permohonan Surat
                        <LocalActivityIcon />
                        Permohonan Surat
                    </div>
                </li>
                <li className='sidebar_list_row'>
                    <div className='icon_title_row'>
                        <LocalActivityIcon />
                        Jadwal Kegiatan Sekolah
                    </div>
                </li>
                <li className='sidebar_list_row'>
                    <div className='icon_title_row'>
                        <LocalActivityIcon />
                        Penilaian Mata Pelajaran
                    </div>
                </li>
            </ul> */}
            {handleData()}
        </div>
    )
}

export default SidebarDefault