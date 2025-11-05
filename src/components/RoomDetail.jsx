import React, { useState } from 'react';
import { Building, Users, Calendar, Clock } from 'lucide-react';
import { isRoomAvailable } from '../utils/bookingUtils';
import { validatePhoneNumber } from '../utils/roomUtils';

const RoomDetail = ({ 
  selectedRoom, 
  selectedDate, 
  setSelectedDate, 
  bookings, 
  setBookings, 
  departments, 
  setCurrentPage,
  currentUser
}) => {
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [bookingForm, setBookingForm] = useState({
    title: '',
    department: '',
    attendees: '',
    bookedBy: '',
    phone: ''
  });

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const dateStr = selectedDate.toISOString().split('T')[0];
  const dayBookings = bookings.filter(b => b.roomId === selectedRoom.id && b.date === dateStr);

  const isSlotAvailable = (time) => {
    const endTime = parseInt(time.split(':')[0]) + 1 + ':00';
    return isRoomAvailable(bookings, selectedRoom.id, dateStr, time, endTime);
  };

  const toggleTimeSlot = (time) => {
    const slotDateTime = new Date(dateStr + 'T' + time);
    const now = new Date();
    
    if (slotDateTime < now || !isSlotAvailable(time)) return;
    
    if (selectedTimeSlots.includes(time)) {
      setSelectedTimeSlots(selectedTimeSlots.filter(t => t !== time));
    } else {
      setSelectedTimeSlots([...selectedTimeSlots, time].sort());
    }
  };

  const getBookingTimeRange = () => {
    if (selectedTimeSlots.length === 0) return null;
    
    const sortedSlots = [...selectedTimeSlots].sort();
    const startTime = sortedSlots[0];
    const lastSlot = sortedSlots[sortedSlots.length - 1];
    const endTime = parseInt(lastSlot.split(':')[0]) + 1 + ':00';
    
    return { startTime, endTime };
  };

  const handleQuickBook = () => {
    if (selectedTimeSlots.length === 0) {
      alert('⚠️ กรุณาเลือกช่วงเวลาอย่างน้อย 1 ช่อง');
      return;
    }
    if (!bookingForm.title || !bookingForm.bookedBy || !bookingForm.phone) {
      alert('⚠️ กรุณากรอกหัวข้อการประชุม ชื่อผู้จอง และเบอร์โทรศัพท์');
      return;
    }

    if (!validatePhoneNumber(bookingForm.phone)) {
      alert('⚠️ กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (เช่น 081-234-5678)');
      return;
    }

    const timeRange = getBookingTimeRange();
    const sortedSlots = [...selectedTimeSlots].sort();
    
    // ตรวจสอบว่าเวลาติดกัน
    for (let i = 0; i < sortedSlots.length - 1; i++) {
      const currentHour = parseInt(sortedSlots[i].split(':')[0]);
      const nextHour = parseInt(sortedSlots[i + 1].split(':')[0]);
      if (nextHour - currentHour > 1) {
        alert('⚠️ กรุณาเลือกช่วงเวลาที่ติดกัน');
        return;
      }
    }

    // ตรวจสอบว่าห้องว่างทุกช่วง
    for (let slot of sortedSlots) {
      const endTime = parseInt(slot.split(':')[0]) + 1 + ':00';
      if (!isRoomAvailable(bookings, selectedRoom.id, dateStr, slot, endTime)) {
        alert('⚠️ บางช่วงเวลาที่เลือกมีการจองแล้ว');
        return;
      }
    }

    const newBooking = {
      id: bookings.length + 1,
      roomId: selectedRoom.id,
      date: dateStr,
      startTime: timeRange.startTime,
      endTime: timeRange.endTime,
      ...bookingForm,
      status: 'confirmed',
      bookedBy: bookingForm.bookedBy || (currentUser ? currentUser.name : 'ผู้ใช้ทั่วไป')
    };

    setBookings([...bookings, newBooking]);
    alert('✓ จองห้องประชุมสำเร็จ!');
    setBookingForm({ title: '', department: '', attendees: '', bookedBy: '', phone: '' });
    setSelectedTimeSlots([]);
  };

  return (
    <div className="space-y-6">
      <button
        onClick={() => setCurrentPage('home')}
        className="text-blue-500 hover:text-blue-700 flex items-center font-medium"
      >
        ← กลับหน้าแรก
      </button>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{selectedRoom.name}</h2>
        
        {selectedRoom.image && (
          <div className="mb-6">
            <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden">
              <img 
                src={selectedRoom.image} 
                alt={selectedRoom.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x400?text=Meeting+Room';
                }}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 mb-2 flex items-center">
              <Building className="w-5 h-5 inline mr-2 text-blue-500" />
              {selectedRoom.building} ชั้น {selectedRoom.floor}
            </p>
            <p className="text-gray-600 mb-2 flex items-center">
              <Users className="w-5 h-5 inline mr-2 text-green-500" />
              ความจุ: {selectedRoom.capacity} คน
            </p>
          </div>
          <div>
            <p className="text-gray-600 mb-2 font-semibold">อุปกรณ์:</p>
            <ul className="list-disc list-inside text-gray-600">
              {selectedRoom.equipment.map((eq, idx) => (
                <li key={idx}>{eq}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">เลือกวันที่</h3>
        <input
          type="date"
          value={dateStr}
          onChange={(e) => {
            setSelectedDate(new Date(e.target.value));
            setSelectedTimeSlots([]);
          }}
          min={new Date().toISOString().split('T')[0]}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-auto focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-sm text-gray-500 mt-2">
          ⚠️ เลือกวันที่ตั้งแต่วันนี้เป็นต้นไป (ไม่สามารถจองย้อนหลังได้)
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          ตารางการจอง - {new Date(selectedDate).toLocaleDateString('th-TH', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            weekday: 'long'
          })}
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
          {timeSlots.map(time => {
            const available = isSlotAvailable(time);
            const booking = dayBookings.find(b => time >= b.startTime && time < b.endTime);
            const isSelected = selectedTimeSlots.includes(time);
            
            const slotDateTime = new Date(dateStr + 'T' + time);
            const now = new Date();
            const isPastTime = slotDateTime < now;
            const isAvailableAndFuture = available && !isPastTime;
            
            return (
              <button
                key={time}
                onClick={() => isAvailableAndFuture && toggleTimeSlot(time)}
                disabled={!isAvailableAndFuture}
                className={'p-3 rounded-lg text-sm font-medium transition-all ' + (
                  isAvailableAndFuture
                    ? isSelected
                      ? 'bg-blue-500 text-white ring-2 ring-blue-300 shadow-md'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                    : isPastTime
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-red-100 text-red-700 cursor-not-allowed'
                )}
                title={booking ? 'จองโดย: ' + booking.title : isPastTime ? 'เวลานี้ผ่านไปแล้ว' : ''}
              >
                {time}
                <div className="text-xs mt-1">
                  {isPastTime 
                    ? '⏰ ผ่านแล้ว' 
                    : available 
                    ? (isSelected ? '✓ เลือกแล้ว' : '○ ว่าง') 
                    : '✗ ไม่ว่าง'}
                </div>
              </button>
            );
          })}
        </div>

        {selectedTimeSlots.length > 0 && (
          <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm font-semibold text-blue-700 mb-2">
              ช่วงเวลาที่เลือก: {selectedTimeSlots.length} ช่อง
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedTimeSlots.map(time => (
                <span key={time} className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm flex items-center shadow-sm">
                  {time}
                  <button
                    onClick={() => toggleTimeSlot(time)}
                    className="ml-2 hover:bg-blue-600 rounded-full w-5 h-5 flex items-center justify-center font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            {getBookingTimeRange() && (
              <p className="text-sm text-blue-600 mt-2 font-medium">
                📅 รวมเวลา: {getBookingTimeRange().startTime} - {getBookingTimeRange().endTime} น.
                ({selectedTimeSlots.length} ชั่วโมง)
              </p>
            )}
          </div>
        )}

        {dayBookings.length > 0 && (
          <div className="mt-6 border-t pt-4">
            <h4 className="font-semibold mb-3 text-gray-800">การจองในวันนี้:</h4>
            <div className="space-y-2">
             {dayBookings.map(booking => (
                <div key={booking.id} className="bg-red-50 p-3 rounded-lg border-l-4 border-red-500">
                  <p className="font-semibold text-gray-800">{booking.title}</p>
                  <p className="text-sm text-gray-600">
                    เวลา: {booking.startTime} - {booking.endTime}
                  </p>
                  <p className="text-sm text-gray-600">
                    ผู้จอง: {booking.bookedBy} | โทร: {booking.phone}
                  </p>
                  {booking.department && (
                    <p className="text-sm text-gray-600">
                      แผนก: {booking.department}
                    </p>
                  )}
                  {booking.attendees && (
                    <p className="text-sm text-gray-600">
                      <Users className="w-4 h-4 inline mr-1" />
                      ผู้เข้าร่วม: {booking.attendees} คน
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedTimeSlots.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">ฟอร์มจองห้อง</h3>
          <div className="bg-blue-50 p-3 rounded-lg mb-4 border border-blue-200">
            <p className="text-sm font-semibold text-blue-700">
              เวลาที่เลือก: {getBookingTimeRange().startTime} - {getBookingTimeRange().endTime} น.
              ({selectedTimeSlots.length} ชั่วโมง)
            </p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">หัวข้อการประชุม *</label>
              <input
                type="text"
                value={bookingForm.title}
                onChange={(e) => setBookingForm({...bookingForm, title: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder="ระบุหัวข้อการประชุม"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">ชื่อผู้จอง *</label>
              <input
                type="text"
                value={bookingForm.bookedBy}
                onChange={(e) => setBookingForm({...bookingForm, bookedBy: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder="ระบุชื่อผู้จอง"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">เบอร์โทรศัพท์ *</label>
              <input
                type="tel"
                value={bookingForm.phone}
                onChange={(e) => {
                  const value = e.target.value;
                  setBookingForm({...bookingForm, phone: value});
                }}
                onBlur={(e) => {
                  let value = e.target.value.replace(/[^0-9-]/g, '');
                  if (value.length === 10 && !value.includes('-')) {
                    value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6);
                  }
                  setBookingForm({...bookingForm, phone: value});
                }}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder="081-234-5678 หรือ 0812345678"
                maxLength="12"
              />
              <p className="text-xs text-gray-500 mt-1">
                พิมพ์เบอร์โทร 10 หลัก หรือพิมพ์แบบมีขีด
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">แผนก/หน่วยงาน</label>
              <select
                value={bookingForm.department}
                onChange={(e) => setBookingForm({...bookingForm, department: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">เลือกแผนก</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.name}>{dept.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">จำนวนผู้เข้าร่วม</label>
              <input
                type="number"
                value={bookingForm.attendees}
                onChange={(e) => setBookingForm({...bookingForm, attendees: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                placeholder="จำนวนคน"
                max={selectedRoom.capacity}
              />
            </div>

            <button
              onClick={handleQuickBook}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold shadow-md"
            >
              ✓ ยืนยันการจอง
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomDetail;