import React from 'react';
import { Calendar, Clock, Users, Building, TrendingUp, BarChart3, Package } from 'lucide-react';
import { getStatistics } from '../utils/bookingUtils';

const AdminDashboard = ({ 
  bookings, 
  rooms, 
  departments, 
  setCurrentPage 
}) => {
  const stats = getStatistics(bookings, rooms, departments);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-2">แดชบอร์ดผู้ดูแลระบบ</h1>
        <p className="text-purple-100">จัดการระบบจองห้องประชุม</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">จำนวนการจองทั้งหมด</p>
              <p className="text-3xl font-bold text-blue-600">{stats.totalBookings}</p>
            </div>
            <Calendar className="w-12 h-12 text-blue-500 opacity-50" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">จองวันนี้</p>
              <p className="text-3xl font-bold text-green-600">{stats.todayBookings}</p>
            </div>
            <Clock className="w-12 h-12 text-green-500 opacity-50" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">ห้องประชุม</p>
              <p className="text-3xl font-bold text-purple-600">{rooms.length}</p>
            </div>
            <Building className="w-12 h-12 text-purple-500 opacity-50" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">หน่วยงาน</p>
              <p className="text-3xl font-bold text-orange-600">{departments.length}</p>
            </div>
            <Users className="w-12 h-12 text-orange-500 opacity-50" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
            การจองรายวัน (7 วันล่าสุด)
          </h3>
          <div className="space-y-2">
            {Object.entries(stats.dailyStats).map(([date, count]) => {
              const maxCount = Math.max(...Object.values(stats.dailyStats));
              const width = maxCount > 0 ? Math.max((count / maxCount) * 100, 5) : 5;
              return (
                <div key={date} className="flex items-center">
                  <span className="text-sm text-gray-600 w-32">
                    {new Date(date).toLocaleDateString('th-TH', { day: '2-digit', month: 'short' })}
                  </span>
                  <div className="flex-1 bg-gray-200 rounded-full h-6 ml-4">
                    <div 
                      className="bg-blue-500 h-6 rounded-full flex items-center justify-end px-2 transition-all"
                      style={{ width: width + '%' }}
                    >
                      <span className="text-white text-xs font-semibold">{count}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
            <BarChart3 className="w-5 h-5 mr-2 text-green-500" />
            การจองรายเดือน (6 เดือนล่าสุด)
          </h3>
          <div className="space-y-2">
            {Object.entries(stats.monthlyStats).map(([month, count]) => {
              const maxCount = Math.max(...Object.values(stats.monthlyStats));
              const width = maxCount > 0 ? Math.max((count / maxCount) * 100, 5) : 5;
              return (
                <div key={month} className="flex items-center">
                  <span className="text-sm text-gray-600 w-32">{month}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-6 ml-4">
                    <div 
                      className="bg-green-500 h-6 rounded-full flex items-center justify-end px-2 transition-all"
                      style={{ width: width + '%' }}
                    >
                      <span className="text-white text-xs font-semibold">{count}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => setCurrentPage('manage-bookings')}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all text-left group"
        >
          <Calendar className="w-12 h-12 text-blue-500 mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-semibold text-lg mb-2 text-gray-800">จัดการการจอง</h3>
          <p className="text-sm text-gray-600">ดู แก้ไข ยกเลิกการจอง</p>
        </button>

        <button
          onClick={() => setCurrentPage('manage-rooms')}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all text-left group"
        >
          <Building className="w-12 h-12 text-purple-500 mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-semibold text-lg mb-2 text-gray-800">จัดการห้องประชุม</h3>
          <p className="text-sm text-gray-600">เพิ่ม ลบ แก้ไขห้องประชุม</p>
        </button>

        <button
          onClick={() => setCurrentPage('manage-departments')}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all text-left group"
        >
          <Users className="w-12 h-12 text-green-500 mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-semibold text-lg mb-2 text-gray-800">จัดการแผนก</h3>
          <p className="text-sm text-gray-600">เพิ่ม ลบ แก้ไขแผนก</p>
        </button>

        <button
          onClick={() => setCurrentPage('manage-equipment')}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all text-left group"
        >
          <Package className="w-12 h-12 text-orange-500 mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="font-semibold text-lg mb-2 text-gray-800">จัดการอุปกรณ์</h3>
          <p className="text-sm text-gray-600">เพิ่ม ลบ แก้ไขอุปกรณ์</p>
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;