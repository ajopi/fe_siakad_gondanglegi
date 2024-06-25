import React from 'react'
import './KelolaDataSiswa.css'
import '../styleAdmin.css'
import NavbarDefault from '../../../components/NavbarDefault/NavbarDefault'
import SidebarDefault from '../../../components/SidebarDefault/SidebarDefault'

const KelolaDataSiswa = () => {
  return (
    <div className='container_admin'>
      <NavbarDefault />
      <div className='container_page_and_sidebar'>
        <aside className='container_sidebar_admin'>
          <SidebarDefault />
        </aside>

        <div className='container_content_admin'>
          tes kelola data siswa

        </div>
      </div>

    </div>
  )
}

export default KelolaDataSiswa