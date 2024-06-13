import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/LoginPage/LoginPage'
import PermohonanSurat from '../pages/PagesGuru/PermohonanSurat/PermohonanSurat'

const RouterDefault = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/permohonan-surat" element={<PermohonanSurat />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouterDefault