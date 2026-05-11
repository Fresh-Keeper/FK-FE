import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const SignupPage = () => {

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignup = () => {

    if (!name || !email || !password) {
      alert('모든 항목을 입력해주세요')
      return
    }

    const users = JSON.parse(
      localStorage.getItem('users') || '[]'
    )

    const alreadyExists = users.find(
      (user: any) => user.email === email
    )

    if (alreadyExists) {
      alert('이미 존재하는 이메일입니다')
      return
    }

    const newUser = {
      name,
      email,
      password,
    }

    localStorage.setItem(
      'users',
      JSON.stringify([...users, newUser])
    )

    alert('회원가입 완료!')

    navigate('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f8f6]">

      <div className="bg-white border p-10 w-full max-w-md">

        <h1 className="text-4xl font-bold mb-3">
          회원가입
        </h1>

        <p className="text-gray-500 mb-8">
          FreshKeeper 계정을 생성하세요
        </p>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full border p-4"
          />

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
            onClick={handleSignup}
            className="w-full bg-green-500 hover:bg-green-600 transition text-white py-4 font-bold"
          >
            회원가입
          </button>

          <Link
            to="/login"
            className="block text-center text-gray-500 mt-4"
          >
            로그인으로 이동
          </Link>

        </div>

      </div>
    </div>
  )
}

export default SignupPage