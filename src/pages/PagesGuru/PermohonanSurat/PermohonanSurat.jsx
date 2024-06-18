import React, { useState } from 'react'
import NavbarDefault from '../../../components/NavbarDefault/NavbarDefault'
import './PermohonanSurat.css'
import SidebarDefault from '../../../components/SidebarDefault/SidebarDefault'
import FormPermohonanSurat from '../../../components/FormPermohonanSurat/FormPermohonanSurat'
import TitlePageAndButton from '../../../components/TitlePageAndButton/TitlePageAndButton'

const PermohonanSurat = () => {
    const [clicked, setClicked] = useState(0);
    // console.log(SidebarDataGuru);    
    const handleBtnCreateSurat = () => {
        setClicked(clicked + 1);
        console.log(clicked);

    }

    const handleFormCreateSurat = () => {
        if (clicked === 0) {
            return <div className='container_wrapper_permohonansurat'>
                <TitlePageAndButton
                    title="Permohonan Surat Guru"
                    handleFunction={handleBtnCreateSurat}
                    titleButton="Buat Surat Permohonan"
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
            return <FormPermohonanSurat />
        }

    }



    return (
        <div className='container_permohonansurat'>
            <NavbarDefault />
            <div className='container_page_and_sidebar'>
                <aside className='container_sidebar_permohonansurat'>
                    <SidebarDefault />
                </aside>

                <div className='container_content_permohonansurat'>
                    {handleFormCreateSurat()}
                </div>
            </div>

        </div>
    )
}

export default PermohonanSurat