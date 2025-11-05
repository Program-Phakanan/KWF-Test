import React from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

const ManageDepartments = ({ departments }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">จัดการแผนก/หน่วยงาน</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center shadow-md">
          <Plus className="w-4 h-4 mr-2" />
          เพิ่มแผนก
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ชื่อแผนก</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">หน่วยงาน</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {departments.map(dept => (
              <tr key={dept.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900">{dept.name}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{dept.organization}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-blue-500 hover:text-blue-700 mr-3 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-red-500 hover:text-red-700 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDepartments;