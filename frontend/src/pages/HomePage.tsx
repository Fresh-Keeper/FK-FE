import { useEffect, useState } from 'react'
import Header from '../components/Header'
import FoodCard from '../components/FoodCard'
import type { Food } from '../types/food'

const HomePage = () => {

  const [foods, setFoods] = useState<Food[]>([])

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

  const dormFoods = foods.filter(
    (food: any) => food.fridgeId === '1'
  )

  const kitchenFoods = foods.filter(
    (food: any) => food.fridgeId === '2'
  )

  return (
    <div className="min-h-screen bg-[#f6f8f6]">

      <Header />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="mb-14">

          <h1 className="text-5xl font-bold mb-4">
            공유 냉장고
          </h1>

          <p className="text-gray-500 text-lg">
            냉장고 속 음식들을 함께 관리해보세요
          </p>

        </div>

        <div className="space-y-16">

          <div>

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-3xl font-bold">
                기숙사 냉장고
              </h2>

              <span className="text-gray-400">
                음식 {dormFoods.length}개
              </span>

            </div>

            {
              dormFoods.length === 0 ? (

                <div className="bg-white border p-10 text-center">

                  등록된 음식이 없습니다

                </div>

              ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                  {
                    dormFoods.map((food: any) => (

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

          <div>

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-3xl font-bold">
                공용 주방 냉장고
              </h2>

              <span className="text-gray-400">
                음식 {kitchenFoods.length}개
              </span>

            </div>

            {
              kitchenFoods.length === 0 ? (

                <div className="bg-white border p-10 text-center">

                  등록된 음식이 없습니다

                </div>

              ) : (

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                  {
                    kitchenFoods.map((food: any) => (

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

      </div>
    </div>
  )
}

export default HomePage