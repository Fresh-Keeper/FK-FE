import { useEffect, useState } from 'react'
import Header from '../components/Header'
import FoodCard from '../components/FoodCard'

const MyPage = () => {

  const [foods, setFoods] = useState<any[]>([])

  useEffect(() => {

    const loadFoods = () => {

      const savedFoods = JSON.parse(
        localStorage.getItem('foods') || '[]'
      )

      setFoods(savedFoods)
    }

    loadFoods()

    window.addEventListener(
      'foodUpdated',
      loadFoods
    )

    return () => {

      window.removeEventListener(
        'foodUpdated',
        loadFoods
      )

    }

  }, [])

  const consumedCount = foods.filter(
    (food: any) => food.consumed
  ).length

  const user = JSON.parse(
    localStorage.getItem('user') || '{}'
  )

  return (
    <div className="min-h-screen bg-[#f6f8f6]">

      <Header />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold mb-3">
          마이페이지
        </h1>

        <p className="text-gray-500 mb-10">
          내가 등록한 음식들을 관리해보세요
        </p>

        <div className="bg-white border p-6 mb-10">

          <h2 className="text-2xl font-bold mb-5">
            {user.name || '사용자'}
          </h2>

          <div className="flex gap-10 text-gray-600">

            <div>

              <p className="text-sm text-gray-400 mb-1">
                등록 음식 수
              </p>

              <p className="text-2xl font-bold text-black">
                {foods.length}개
              </p>

            </div>

            <div>

              <p className="text-sm text-gray-400 mb-1">
                소비 완료
              </p>

              <p className="text-2xl font-bold text-black">
                {consumedCount}개
              </p>

            </div>

          </div>

        </div>

        {
          foods.length === 0 ? (

            <div className="bg-white border p-20 text-center">

              <p className="text-2xl font-bold mb-3">
                등록한 음식이 없습니다
              </p>

              <p className="text-gray-500">
                우측 상단에서 음식을 등록해보세요
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

              {
                foods.map((food) => (

                  <FoodCard
                    key={food.id}
                    image={
                      food.image ||
                      'https://images.unsplash.com/photo-1542838132-92c53300491e'
                    }
                    name={food.name}
                    user={food.user}
                    expire={food.expire}
                    status={
                      food.consumed
                        ? 'consumed'
                        : (() => {

                            const today = new Date()

                            const expireDate = new Date(
                              food.expire
                            )

                            const diff =
                              Math.ceil(
                                (
                                  expireDate.getTime() -
                                  today.getTime()
                                ) /
                                (1000 * 60 * 60 * 24)
                              )

                            if (diff < 0) {
                              return 'expired'
                            }

                            if (diff <= 2) {
                              return 'warning'
                            }

                            return 'fresh'

                          })()
                    }
                    food={food}
                  />

                ))
              }

            </div>

          )
        }

      </div>
    </div>
  )
}

export default MyPage