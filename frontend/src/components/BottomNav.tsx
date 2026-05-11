import { House, PlusSquare, Bell, User } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const BottomNav = () => {
  const location = useLocation()

  const menus = [
    { icon: <House size={22} />, path: '/' },
    { icon: <PlusSquare size={22} />, path: '/add' },
    { icon: <Bell size={22} />, path: '/notification' },
    { icon: <User size={22} />, path: '/mypage' },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t h-16 flex justify-around items-center">
      {menus.map((menu) => (
        <Link
          key={menu.path}
          to={menu.path}
          className={`${
            location.pathname === menu.path
              ? 'text-green-500'
              : 'text-gray-400'
          }`}
        >
          {menu.icon}
        </Link>
      ))}
    </div>
  )
}

export default BottomNav