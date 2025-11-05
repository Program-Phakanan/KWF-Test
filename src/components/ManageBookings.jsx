import React from 'react';
import { Download, Search, Edit, Trash2 } from 'lucide-react';

const ManageBookings = ({ bookings, setBookings, rooms }) => {
  const handleDeleteBooking = (bookingId) => {
    if (window.confirm('ต้องการยกเลิกการจองนี้หรือไม่?')) {
      setBookings(bookings.filter(b => b.id !== bookingId));
      alert('✓ ยกเลิกการจองเรียบร้อย');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">จัดการการจอง</h2>
        <div className="flex gap-2">
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center shadow-md">
            <Download className="w-4 h-4 mr-2" />
            ออกรายงาน PDF
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center shadow-md">
            <Download className="w-4 h-4 mr-2" />
            ออกรายงาน Excel
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="date"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="เลือกวันที่"
          />
          <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500">
            <option value="">ทุกห้อง</option>
            {rooms.map(room => (
              <option key={room.id} value={room.id}>{room.name}</option>
            ))}
          </select>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center">
            <Search className="w-4 h-4 mr-2" />
            ค้นหา
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">วันที่</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">เวลา</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ห้อง</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">หัวข้อ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ผู้จอง</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">เบอร์โทร</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">สถานะ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bookings.map(booking => {
              const room = rooms.find(r => r.id === booking.roomId);
              return (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(booking.date).toLocaleDateString('th-TH')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {booking.startTime} - {booking.endTime}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {room ? room.name : 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{booking.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{booking.bookedBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">
                      {booking.status === 'confirmed' ? '✓ ยืนยัน' : 'รอดำเนินการ'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-500 hover:text-blue-700 mr-3 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteBooking(booking.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {bookings.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">ไม่มีการจองในขณะนี้</p>
        </div>
      )}
    </div>
  );
};

export default ManageBookings;