import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../../contextlogin/hooks/useAuth";

const ProtectedRoutes = () => {

    const {auth, cargando} = useAuth()

    if(cargando) return 'Cargando...'

  return (
    <>
        {auth.id ? <Outlet/> : <Navigate to='/login'/>}
    </>
  )
}

export default ProtectedRoutes;