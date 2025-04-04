import { Navigate, Outlet } from 'react-router'
import AuthContext from '../../context/authContext'
import { useContext } from 'react'


export default function AuthGuard() {
    const { authData } = useContext(AuthContext)


    if (!authData.accessToken) {
        return <Navigate to="/login" />
    }

    return <Outlet />;

}