import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'

const FridgePage = () => {

  const navigate = useNavigate()

  const fridges = [
    {
      id: 1,
      name: '기숙사 냉장고',
      desc: '기숙사 공용 냉장고입니다',
    },
    {
      id: 2,
      name: '공용 주방 냉장고',
      desc: '공용 주방 냉장고입니다',
    },
  ]

  return (
    <div className="min-h-screen bg-[#f6f8f6]">

      <Header />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold mb-3">
          냉장고 목록
        </h1>

        <p className="text-gray-500 mb-10">
          냉장고를 선택해보세요
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {
            fridges.map((fridge) => (

              <div
                key={fridge.id}
                onClick={() =>
                  navigate(`/fridge/${fridge.id}`)
                }
                className="bg-white border p-10 cursor-pointer hover:shadow-lg transition"
              >

                <h2 className="text-3xl font-bold mb-3">
                  {fridge.name}
                </h2>

                <p className="text-gray-500">
                  {fridge.desc}
                </p>

              </div>

            ))
          }

        </div>

      </div>
    </div>
  )
}

export default FridgePage