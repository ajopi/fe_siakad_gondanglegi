import React from 'react'
import './NavbarDefault.css'
import logo from '../../img/favicon-1 1.png'
import personPic from '../../img/Ellipse 33.png'

const NavbarDefault = () => {
    return (
        <div>
            <nav className='container_navbar_default'>
                <div className='container_content_navbar1'>
                    <img src={logo} alt='logo' className='logo_navbar' />
                    <h3 className='title_navbar'>SIAKAD SMK MUTU</h3>
                </div>
                <div className='container_content_navbar2'>
                    <img src={personPic} alt='personpict' className='personpict' />
                    <h3 className='title_navbar_person'>Hi, Rudi</h3>
                </div>
            </nav>
        </div>
    )
}

export default NavbarDefault