import React from 'react'
import './JadwalSekolah.css'
import NavbarDefault from '../../../components/NavbarDefault/NavbarDefault'
import SidebarDefault from '../../../components/SidebarDefault/SidebarDefault'
import TitlePage from '../../../components/TitlePageAndButton/TitlePage/TitlePage'


const JadwalSekolah = () => {
    return (
        <div className='container_jadwalsekolah'>
            <NavbarDefault />
            <div className='container_page_and_sidebar'>
                <aside className='container_sidebar_jadwalsekolah'>
                    <SidebarDefault />
                </aside>

                <div className='container_content_jadwalsekolah'>
                    <TitlePage title='Jadwal Kegiatan Sekolah' />

                    <table>
                        <thead>
                            <tr>
                                <th>
                                    No
                                </th>
                                <th>
                                    Tujuan
                                </th>
                                <th>
                                    Status
                                </th>
                                <th>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    as
                                </td>
                                <td>
                                    as
                                </td>
                                <td>
                                    as
                                </td>
                                <td>
                                    as
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default JadwalSekolah