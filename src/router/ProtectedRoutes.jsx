import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoutes = () => {
    const userId = sessionStorage.getItem('userId');


    return !userId ? <Navigate to="/" /> : <Outlet />
}

export default ProtectedRoutes