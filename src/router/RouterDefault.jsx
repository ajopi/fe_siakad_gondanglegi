import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/LoginPage/LoginPage'
import PermohonanSurat from '../pages/PagesGuru/PermohonanSurat/PermohonanSurat'
import JadwalSekolah from '../pages/PagesGuru/JadwalSekolah/JadwalSekolah'
import PenilaianGuru from '../pages/PagesGuru/PenilaianGuru/PenilaianGuru'
import Aktivitas from '../pages/pagesAdmin/Aktivitas/Aktivitas'
import KelolaDataGuru from '../pages/pagesAdmin/KelolaDataGuru/KelolaDataGuru'
import KelolaDataSiswa from '../pages/pagesAdmin/KelolaDataSiswa/KelolaDataSiswa'
import KelolaSuratGuru from '../pages/pagesAdmin/KelolaSuratGuru/KelolaSuratGuru'
import ProtectedRoutes from './ProtectedRoutes'

const RouterDefault = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />

                <Route element={<ProtectedRoutes />}>
                    <Route path="/permohonan-surat" element={<PermohonanSurat />} />
                    <Route path="/jadwal-sekolah" element={<JadwalSekolah />} />
                    <Route path="/penilaian-guru" element={<PenilaianGuru />} />
                </Route>

                <Route path="/kelola-aktivitas-admin" element={<Aktivitas />} />
                <Route path="/kelola-data-guru" element={<KelolaDataGuru />} />
                <Route path="/kelola-data-siswa" element={<KelolaDataSiswa />} />
                <Route path="/kelola-surat-guru" element={<KelolaSuratGuru />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouterDefault