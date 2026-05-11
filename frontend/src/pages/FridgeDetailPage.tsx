import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import FoodCard from '../components/FoodCard'

const FridgeDetailPage = () => {

  const { id } = useParams()

  const foods = JSON.parse(
    localStorage.getItem('foods') || '[]'
  )

  // 냉장고별 음식 필터
  const filteredFoods = foods.filter(
    (food: any) => food.fridgeId === id
  )

  // 냉장고 이름
  const fridgeName =
    id === '1'
      ? '기숙사 냉장고'
      : '공용 주방 냉장고'

  return (
    <div className="min-h-screen bg-[#f6f8f6]">

      <Header />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold mb-3">
          {fridgeName}
        </h1>

        <p className="text-gray-500 mb-10">
          냉장고 내부 음식 목록입니다
        </p>

        {
          filteredFoods.length === 0 ? (

            <div className="bg-white border p-20 text-center">

              <p className="text-2xl font-bold">
                등록된 음식이 없습니다
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

              {
                filteredFoods.map((food: any) => (

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

export default FridgeDetailPage