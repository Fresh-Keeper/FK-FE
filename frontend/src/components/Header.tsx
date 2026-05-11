import {
  Refrigerator,
  Plus,
  LogOut,
} from 'lucide-react'

import {
  Link,
  useNavigate,
} from 'react-router-dom'

import { useState } from 'react'

import AddFoodModal from './AddFoodModal'

const Header = () => {

  const [open, setOpen] = useState(false)

  const navigate = useNavigate()

  const handleLogout = () => {

    localStorage.removeItem('user')

    alert('로그아웃 되었습니다')

    navigate('/login')
  }

  return (
    <>
      <header className="bg-white border-b sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="bg-green-100 p-2">
              <Refrigerator className="text-green-600" />
            </div>

            <div>

              <h1 className="text-2xl font-bold text-green-600">
                FreshKeeper
              </h1>

              <p className="text-sm text-gray-500">
                음식 공유와 관리의 새로운 방식
              </p>

            </div>

          </div>

          <nav className="hidden md:flex items-center gap-10 text-gray-600 font-medium">

            <Link
              to="/"
              className="hover:text-green-600 transition"
            >
              홈
            </Link>

            <Link
              to="/fridge"
              className="hover:text-green-600 transition"
            >
              냉장고
            </Link>

            <Link
              to="/mypage"
              className="hover:text-green-600 transition"
            >
              마이페이지
            </Link>

          </nav>

          <div className="flex items-center gap-3">

            <button
              onClick={() => setOpen(true)}
              className="bg-green-500 hover:bg-green-600 transition text-white px-5 py-3 flex items-center gap-2 font-semibold"
            >
              <Plus size={18} />
              음식 등록
            </button>

            <button
              onClick={handleLogout}
              className="border border-red-400 text-red-500 hover:bg-red-50 transition px-4 py-3 flex items-center gap-2 font-semibold"
            >
              <LogOut size={18} />
              로그아웃
            </button>

          </div>

        </div>
      </header>

      <AddFoodModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  )
}

export default Header