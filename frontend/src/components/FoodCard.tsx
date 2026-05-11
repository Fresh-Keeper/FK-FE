import { useState } from 'react'
import FoodDetailModal from './FoodDetailModal'

interface Props {
  image: string
  name: string
  user: string
  expire: string
  status:
    | 'fresh'
    | 'warning'
    | 'expired'
    | 'consumed'
  food: any
}

const FoodCard = ({
  image,
  name,
  user,
  expire,
  status,
  food,
}: Props) => {

  const [open, setOpen] = useState(false)

  const badgeStyle = {
    fresh:
      'bg-green-100 text-green-700',

    warning:
      'bg-yellow-100 text-yellow-700',

    expired:
      'bg-red-100 text-red-700',

    consumed:
      'bg-gray-200 text-gray-700',
  }

  const badgeText = {
    fresh: '신선',
    warning: '임박',
    expired: '만료',
    consumed: '소비 완료',
  }

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="bg-white overflow-hidden border cursor-pointer hover:shadow-lg transition"
      >

        <img
          src={image}
          className="w-full h-52 object-cover"
        />

        <div className="p-5">

          <div className="flex justify-between items-center mb-3">

            <h2 className="text-xl font-bold">
              {name}
            </h2>

            <div
              className={`px-3 py-1 text-sm font-semibold ${badgeStyle[status]}`}
            >
              {badgeText[status]}
            </div>

          </div>

          <p className="text-gray-500 mb-2">
            등록자: {user}
          </p>

          <p className="text-sm text-gray-400">
            유통기한: {expire}
          </p>

        </div>
      </div>

      <FoodDetailModal
        open={open}
        onClose={() => setOpen(false)}
        food={food}
      />
    </>
  )
}

export default FoodCard