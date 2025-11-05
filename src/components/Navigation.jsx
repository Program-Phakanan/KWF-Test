import React from 'react';
import { Calendar, LogIn } from 'lucide-react';

const Navigation = ({ 
  currentPage, 
  setCurrentPage, 
  isLoggedIn, 
  currentUser, 
  setIsLoggedIn, 
  setCurrentUser 
}) => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
            <Calendar className="w-8 h-8 text-blue-500 mr-3" />
            <span className="text-xl font-bold text-gray-800">ระบบจองห้องประชุม</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentPage('home')}
              className={'px-3 py-2 rounded-lg transition-colors ' + (currentPage === 'home' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100')}
            >
              หน้าแรก
            </button>
            
            {isLoggedIn && (
              <>
                <button
                  onClick={() => setCurrentPage('admin')}
                  className={'px-3 py-2 rounded-lg transition-colors ' + (currentPage === 'admin' ? 'bg-purple-500 text-white' : 'text-gray-600 hover:bg-gray-100')}
                >
                  แดชบอร์ดแอดมิน
                </button>
                
                <div className="relative group">
                  <button className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    จัดการข้อมูล ▾
                  </button>
                  <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-lg mt-2 py-2 w-48 z-10 right-0">
                    <button onClick={() => setCurrentPage('manage-rooms')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700">จัดการห้องประชุม</button>
                    <button onClick={() => setCurrentPage('manage-bookings')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700">จัดการการจอง</button>
                    <button onClick={() => setCurrentPage('manage-departments')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700">จัดการแผนก</button>
                    <button onClick={() => setCurrentPage('manage-buildings')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700">จัดการอาคาร</button>
                    <button onClick={() => setCurrentPage('manage-equipment')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700">จัดการอุปกรณ์</button>
                  </div>
                </div>
              </>
            )}
            
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">สวัสดี, {currentUser ? currentUser.name : 'ผู้ใช้'}</span>
                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    setCurrentUser(null);
                    setCurrentPage('home');
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  ออกจากระบบ
                </button>
              </div>
            ) : (
              <button
                onClick={() => setCurrentPage('login')}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
              >
                <LogIn className="w-4 h-4 mr-2" />
                เข้าสู่ระบบ
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;