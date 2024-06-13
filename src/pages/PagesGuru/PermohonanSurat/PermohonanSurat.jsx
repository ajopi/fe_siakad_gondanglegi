import React from 'react'
import NavbarDefault from '../../../components/NavbarDefault/NavbarDefault'
import './PermohonanSurat.css'
import SidebarDefault from '../../../components/SidebarDefault/SidebarDefault'

const PermohonanSurat = () => {
    // const handleSidebar = () => {
    //     const sidebarmap = SidebarDataGuru.map((value, key) => {

    //         return <SidebarDefault  key={key} title={value.title} icon={value.icon}/>
    //     })
    //     return sidebarmap;
    // }


    return (
        <div className='container_permohonansurat'>
            <NavbarDefault />
            <div className='container_page_and_sidebar'>
                <aside className='container_sidebar_permohonansurat'>
                    <SidebarDefault />
                </aside>

                <div className='container_content_permohonansurat'>
                    <div>
                        content permohonan surat
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PermohonanSurat