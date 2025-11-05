import React, { useState } from 'react';
import { Building, Users } from 'lucide-react';
import MyBookingsModal from './MyBookingsModal';

const HomePage = ({ 
  rooms, 
  setSelectedRoom, 
  setCurrentPage,
  bookings,
  setBookings
}) => {
  const [showMyBookingsModal, setShowMyBookingsModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-2">ระบบจองห้องประชุม</h1>
        <p className="text-blue-100 mb-4">จองห้องประชุมได้ง่ายๆ รวดเร็ว ไม่ต้องสมัครสมาชิก</p>
        <button
          onClick={() => setShowMyBookingsModal(true)}
          className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold shadow-md"
        >
          📋 ดูการจองของฉัน / ยกเลิกการจอง
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {rooms.map(room => (
          <div key={room.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
            <div className="relative h-48 bg-gray-200">
              {room.image ? (
                <img 
                  src={room.image} 
                  alt={room.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=Meeting+Room';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
                  <Building className="w-16 h-16 text-blue-500 opacity-50" />
                </div>
              )}
              <div className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                {room.capacity} ที่นั่ง
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-lg mb-2 text-gray-800">{room.name}</h4>
              <p className="text-sm text-gray-600 mb-3">
                <Building className="w-4 h-4 inline mr-1" />
                {room.building} ชั้น {room.floor}
              </p>
              <button
                onClick={() => {
                  setSelectedRoom(room);
                  setCurrentPage('room-detail');
                }}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                ดูรายละเอียดและจอง
              </button>
            </div>
          </div>
        ))}
      </div>

      <MyBookingsModal
        showModal={showMyBookingsModal}
        setShowModal={setShowMyBookingsModal}
        bookings={bookings}
        setBookings={setBookings}
        rooms={rooms}
      />
    </div>
  );
};

export default HomePage;