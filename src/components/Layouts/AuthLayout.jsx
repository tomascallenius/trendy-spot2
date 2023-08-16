import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (

    <>

        <div>
            <h2>Auth</h2>
        </div>

        <Outlet/>
    
    </>

  )
}

export default AuthLayout