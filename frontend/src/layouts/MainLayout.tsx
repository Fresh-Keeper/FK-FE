import { Outlet, Navigate } from 'react-router-dom'

const MainLayout = () => {

  const user = localStorage.getItem('user')

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default MainLayout