import React from 'react';
import { Plus, Edit, Trash2, Package } from 'lucide-react';

const ManageEquipment = ({ equipment }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">จัดการอุปกรณ์</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center shadow-md">
          <Plus className="w-4 h-4 mr-2" />
          เพิ่มอุปกรณ์
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipment.map(eq => (
          <div key={eq.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{eq.name}</h3>
              <Package className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-gray-600 mb-4">จำนวน: {eq.quantity} ชิ้น</p>
            <div className="flex gap-2">
              <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center">
                <Edit className="w-4 h-4 mr-1" />
                แก้ไข
              </button>
              <button className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center">
                <Trash2 className="w-4 h-4 mr-1" />
                ลบ
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageEquipment;