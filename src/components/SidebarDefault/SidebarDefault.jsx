import React from 'react'
import { SidebarDataGuru } from './SidebarDataGuru'
import { SidebarDataAdmin } from './SidebarDataAdmin'
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

                        {value.icon}
                        {value.title}

                    </div>
                </li>
            </ul>
        })
        return handleData;
    }

    return (
        <div className='container_sidebar_default'>
            {handleData()}
        </div>
    )
}

export default SidebarDefault