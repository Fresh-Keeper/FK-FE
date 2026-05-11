const NotificationPage = () => {
    return (
      <div className="p-5">
        <h1 className="text-2xl font-bold mb-6">
          알림
        </h1>
  
        <div className="space-y-3">
          <div className="bg-white rounded-xl p-4 border">
            ⚠️ 우유 유통기한 하루 남음
          </div>
  
          <div className="bg-white rounded-xl p-4 border">
            ❌ 닭가슴살 유통기한 만료
          </div>
        </div>
      </div>
    )
  }
  
  export default NotificationPage