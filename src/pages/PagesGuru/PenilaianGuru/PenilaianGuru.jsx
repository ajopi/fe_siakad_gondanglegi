import React, { useState } from 'react'
import './PenilaianGuru.css'
import NavbarDefault from '../../../components/NavbarDefault/NavbarDefault'
import SidebarDefault from '../../../components/SidebarDefault/SidebarDefault'
import TitlePageAndButton from '../../../components/TitlePageAndButton/TitlePageAndButton'
import FormPenilaian from '../../../components/FormPenilaian/FormPenilaian'

const PenilaianGuru = () => {
  const [clicked, setClicked] = useState(0);

  const handleBtnCreateForm = () => {
    setClicked(clicked + 1);
  }

  const handleFormCreateSurat = () => {
    if (clicked === 0) {
      return <div className='container_wrapper_penilaian_guru'>
        <TitlePageAndButton
          title="Penilaian Mata Pelajaran"
          handleFunction={handleBtnCreateForm}
          titleButton="Tambah Nilai Mata Pelajaran"
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
      return <FormPenilaian />
    }
  }



  return (
    <div className='container_penilaian_guru'>
      <NavbarDefault />
      <div className='container_page_and_sidebar'>
        <aside className='container_sidebar_penilaian_guru'>
          <SidebarDefault />
        </aside>

        <div className='container_content_penilaian_guru'>
          {handleFormCreateSurat()}
        </div>
      </div>

    </div>
  )
}

export default PenilaianGuru