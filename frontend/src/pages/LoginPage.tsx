import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const LoginPage = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {

    const users = JSON.parse(
      localStorage.getItem('users') || '[]'
    )

    const foundUser = users.find(
      (user: any) =>
        user.email === email &&
        user.password === password
    )

    if (!foundUser) {
      alert('이메일 또는 비밀번호가 올바르지 않습니다')
      return
    }

    localStorage.setItem(
      'user',
      JSON.stringify(foundUser)
    )

    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f8f6]">

      <div className="bg-white border p-10 w-full max-w-md">

        <h1 className="text-4xl font-bold mb-3">
          FreshKeeper
        </h1>

        <p className="text-gray-500 mb-8">
          로그인 후 서비스를 이용해주세요
        </p>

        <div className="space-y-4">

          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border p-4"
          />

          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border p-4"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-green-500 hover:bg-green-600 transition text-white py-4 font-bold"
          >
            로그인
          </button>

          <Link
            to="/signup"
            className="block text-center text-gray-500 mt-4"
          >
            회원가입
          </Link>

        </div>

      </div>
    </div>
  )
}

export default LoginPage