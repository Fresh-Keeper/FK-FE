import { X } from 'lucide-react'
import { useEffect } from 'react'

interface Props {
  open: boolean
  onClose: () => void
  food: any
}

const FoodDetailModal = ({
  open,
  onClose,
  food,
}: Props) => {

  useEffect(() => {

    const handleEsc = (
      e: KeyboardEvent
    ) => {

      if (e.key === 'Escape') {
        onClose()
      }

    }

    window.addEventListener(
      'keydown',
      handleEsc
    )

    return () => {
      window.removeEventListener(
        'keydown',
        handleEsc
      )
    }

  }, [onClose])

  if (!open || !food) return null

  const handleDelete = () => {

    const savedFoods = JSON.parse(
      localStorage.getItem('foods') || '[]'
    )

    const updatedFoods = savedFoods.filter(
      (item: any) => item.id !== food.id
    )

    localStorage.setItem(
      'foods',
      JSON.stringify(updatedFoods)
    )

    alert('삭제되었습니다')

    onClose()

    window.dispatchEvent(
      new Event('foodUpdated')
    )
  }

  const handleConsume = () => {

    const savedFoods = JSON.parse(
      localStorage.getItem('foods') || '[]'
    )

    const updatedFoods = savedFoods.map(
      (item: any) => {

        if (item.id === food.id) {

          return {
            ...item,
            consumed: true,
          }

        }

        return item
      }
    )

    localStorage.setItem(
      'foods',
      JSON.stringify(updatedFoods)
    )

    alert('소비 완료 처리되었습니다')

    onClose()

    window.dispatchEvent(
      new Event('foodUpdated')
    )
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">

      <div className="bg-white w-full max-w-lg p-6 relative">

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-black"
        >
          <X />
        </button>

        <img
          src={
            food.image ||
            'https://images.unsplash.com/photo-1542838132-92c53300491e'
          }
          className="w-full h-72 object-cover mb-6"
        />

        <h1 className="text-4xl font-bold mb-3">
          {food.name}
        </h1>

        <div className="space-y-3 text-gray-600 mb-8">

          <p>
            등록자: {food.user}
          </p>

          <p>
            유통기한: {food.expire}
          </p>

          <div>

            <p className="mb-2">
              메모:
            </p>

            <div className="bg-gray-100 p-4">

              {
                food.memo
                  ? food.memo
                  : '메모가 없습니다'
              }

            </div>

          </div>

        </div>

        <div className="flex gap-4 mt-8">

          {
            !food.consumed && (

              <button
                onClick={handleConsume}
                className="flex-1 bg-green-500 hover:bg-green-600 transition text-white py-3 text-base font-semibold"
              >
                소비 완료
              </button>

            )
          }

          <button
            onClick={handleDelete}
            className="flex-1 bg-red-500 hover:bg-red-600 transition text-white py-3 text-base font-semibold"
          >
            삭제하기
          </button>

        </div>

      </div>
    </div>
  )
}

export default FoodDetailModal