import React, { useState } from 'react';
import { Plus, Edit, Trash2, Building, Users } from 'lucide-react';

const ManageRooms = ({ rooms, setRooms }) => {
  const [showEditRoomModal, setShowEditRoomModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  const handleEditRoom = (room) => {
    setEditingRoom(room);
    setShowEditRoomModal(true);
  };

  const handleSaveRoom = () => {
    if (editingRoom) {
      setRooms(rooms.map(r => r.id === editingRoom.id ? editingRoom : r));
      setShowEditRoomModal(false);
      setEditingRoom(null);
      alert('✓ บันทึกข้อมูลเรียบร้อย!');
    }
  };

  const handleDeleteRoom = (roomId) => {
    if (window.confirm('ต้องการลบห้องประชุมนี้หรือไม่?')) {
      setRooms(rooms.filter(r => r.id !== roomId));
      alert('✓ ลบห้องประชุมเรียบร้อย');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">จัดการห้องประชุม</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center shadow-md">
          <Plus className="w-4 h-4 mr-2" />
          เพิ่มห้องประชุม
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map(room => (
          <div key={room.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
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
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2 text-gray-800">{room.name}</h3>
              <p className="text-sm text-gray-600 mb-1">
                <Building className="w-4 h-4 inline mr-1" />
                {room.building} ชั้น {room.floor}
              </p>
              <p className="text-sm text-gray-600 mb-3">
                <Users className="w-4 h-4 inline mr-1" />
                ความจุ: {room.capacity} คน
              </p>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEditRoom(room)}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  แก้ไข
                </button>
                <button 
                  onClick={() => handleDeleteRoom(room.id)}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  ลบ
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showEditRoomModal && editingRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">แก้ไขห้องประชุม</h3>
                <button 
                  onClick={() => {
                    setShowEditRoomModal(false);
                    setEditingRoom(null);
                  }}
                  className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">ชื่อห้อง</label>
                  <input
                    type="text"
                    value={editingRoom.name}
                    onChange={(e) => setEditingRoom({...editingRoom, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">อาคาร</label>
                    <input
                      type="text"
                      value={editingRoom.building}
                      onChange={(e) => setEditingRoom({...editingRoom, building: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">ชั้น</label>
                    <input
                      type="text"
                      value={editingRoom.floor}
                      onChange={(e) => setEditingRoom({...editingRoom, floor: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">ความจุ (คน)</label>
                  <input
                    type="number"
                    value={editingRoom.capacity}
                    onChange={(e) => setEditingRoom({...editingRoom, capacity: parseInt(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">URL รูปภาพ</label>
                  <input
                    type="text"
                    value={editingRoom.image || ''}
                    onChange={(e) => setEditingRoom({...editingRoom, image: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    💡 แนะนำใช้ URL จาก Unsplash, Pexels หรือ upload ที่อื่นแล้วนำ URL มาใส่
                  </p>
                </div>

                {editingRoom.image && (
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">ตัวอย่างรูปภาพ</label>
                    <div className="relative h-48 bg-gray-200 rounded-lg overflow-hidden">
                      <img 
                        src={editingRoom.image} 
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x300?text=Invalid+Image';
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSaveRoom}
                    className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-semibold transition-colors"
                  >
                    ✓ บันทึก
                  </button>
                  <button
                    onClick={() => {
                      setShowEditRoomModal(false);
                      setEditingRoom(null);
                    }}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 font-semibold transition-colors"
                  >
                    ✗ ยกเลิก
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageRooms;