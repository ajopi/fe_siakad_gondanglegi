import React, { useState } from 'react'
import './Aktivitas.css'
import NavbarDefault from '../../../components/NavbarDefault/NavbarDefault'
import SidebarDefault from '../../../components/SidebarDefault/SidebarDefault'
import TitlePageAndButton from '../../../components/TitlePageAndButton/TitlePageAndButton'
import FormAktivitas from '../../../components/FormAktivitas/FormAktivitas'


const Aktivitas = () => {
  const [clicked, setClicked] = useState(0);

  const handleBtnCreateAktivitas = () => {
    setClicked(clicked + 1);
    console.log(clicked);

  }

  const handleFormCreateAktivitas = () => {
    if (clicked === 0) {
      return <div className='container_wrapper_aktivitas_admin'>
        <TitlePageAndButton
          title="Aktivitas"
          handleFunction={handleBtnCreateAktivitas}
          titleButton="Buat Aktivitas Baru"
        />
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
    } else {
      return <FormAktivitas />
    }

  }

  return (
    <div className='container_aktivitas_admin'>
      <NavbarDefault />
      <div className='container_page_and_sidebar'>
        <aside className='container_sidebar_aktivitas_admin'>
          <SidebarDefault />
        </aside>

        <div className='container_content_aktivitas_admin'>
          {handleFormCreateAktivitas()}
          
        </div>
      </div>

    </div>
  )
}

export default Aktivitas