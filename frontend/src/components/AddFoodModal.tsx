import { X, ImagePlus } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Props {
  open: boolean
  onClose: () => void
}

const AddFoodModal = ({
  open,
  onClose,
}: Props) => {

  const [name, setName] = useState('')
  const [expire, setExpire] = useState('')
  const [memo, setMemo] = useState('')
  const [image, setImage] = useState('')
  const [fridgeId, setFridgeId] = useState('1')

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

  if (!open) return null

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = e.target.files?.[0]

    if (!file) return

    const reader = new FileReader()

    reader.onloadend = () => {
      setImage(reader.result as string)
    }

    reader.readAsDataURL(file)
  }

  const handleSubmit = () => {

    if (!name.trim()) {
      alert('음식명을 입력해주세요')
      return
    }

    if (!expire) {
      alert('유통기한을 입력해주세요')
      return
    }

    const user = JSON.parse(
      localStorage.getItem('user') || '{}'
    )

    const newFood = {
      id: Date.now(),
      name,
      expire,
      memo,
      image,
      fridgeId,
      user: user.name || '익명',
    }

    const prevFoods = JSON.parse(
      localStorage.getItem('foods') || '[]'
    )

    localStorage.setItem(
      'foods',
      JSON.stringify([...prevFoods, newFood])
    )

    alert('음식이 등록되었습니다!')

    setName('')
    setExpire('')
    setMemo('')
    setImage('')
    setFridgeId('1')

    onClose()

    window.dispatchEvent(
      new Event('foodUpdated')
    )
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">

      <div className="bg-white w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">

        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-gray-400 hover:text-black"
        >
          <X />
        </button>

        <h2 className="text-3xl font-bold mb-2">
          음식 등록
        </h2>

        <p className="text-gray-500 mb-8">
          냉장고에 새로운 음식을 추가해보세요
        </p>

        <div className="space-y-4">

          <div>
            <label className="font-semibold block mb-2">
              음식명 *
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="예: 딸기"
              className="w-full border p-4"
            />
          </div>

          <div>
            <label className="font-semibold block mb-2">
              유통기한 *
            </label>

            <input
              type="date"
              value={expire}
              onChange={(e) =>
                setExpire(e.target.value)
              }
              className="w-full border p-4"
            />
          </div>

          <div>
            <label className="font-semibold block mb-2">
              냉장고 선택 *
            </label>

            <select
              value={fridgeId}
              onChange={(e) =>
                setFridgeId(e.target.value)
              }
              className="w-full border p-4"
            >
              <option value="1">
                기숙사 냉장고
              </option>

              <option value="2">
                공용 주방 냉장고
              </option>
            </select>
          </div>

          <div>
            <label className="font-semibold block mb-2">
              메모 (선택)
            </label>

            <textarea
              value={memo}
              onChange={(e) =>
                setMemo(e.target.value)
              }
              placeholder="메모를 입력하세요"
              className="w-full border p-4 h-24 resize-none"
            />
          </div>

          <div>
            <label className="font-semibold block mb-2">
              사진 업로드 (선택)
            </label>

            <label className="border-2 border-dashed p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition">

              {
                image ? (

                  <img
                    src={image}
                    className="w-full h-40 object-cover"
                  />

                ) : (

                  <>
                    <ImagePlus
                      size={40}
                      className="text-green-500 mb-3"
                    />

                    <p className="font-medium">
                      사진 업로드
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                      JPG, PNG 파일
                    </p>
                  </>

                )
              }

              <input
                type="file"
                className="hidden"
                onChange={handleImage}
              />
            </label>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-green-500 hover:bg-green-600 transition text-white py-4 font-bold text-lg"
          >
            등록하기
          </button>

        </div>
      </div>
    </div>
  )
}

export default AddFoodModal