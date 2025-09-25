import React, { useState } from 'react';
import { Calendar, Filter, X } from 'lucide-react';
import { DateRange } from '../types';

interface CommonFilterProps {
  dateRange: DateRange;
  onApply: (dateRange: DateRange) => void;
  onClear: () => void;
}

const CommonFilter: React.FC<CommonFilterProps> = ({ dateRange, onApply, onClear }) => {
  const [tempDateRange, setTempDateRange] = useState<DateRange>(dateRange);
  const [showPresets, setShowPresets] = useState(false);

  const presets = [
    { label: 'Tháng này', getValue: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return { from: start, to: end };
    }},
    { label: 'Quý này', getValue: () => {
      const now = new Date();
      const quarter = Math.floor(now.getMonth() / 3);
      const start = new Date(now.getFullYear(), quarter * 3, 1);
      const end = new Date(now.getFullYear(), quarter * 3 + 3, 0);
      return { from: start, to: end };
    }},
    { label: 'Năm này', getValue: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), 0, 1);
      const end = new Date(now.getFullYear(), 11, 31);
      return { from: start, to: end };
    }},
    { label: '30 ngày qua', getValue: () => {
      const now = new Date();
      const start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      return { from: start, to: now };
    }},
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('vi-VN');
  };

  const handlePresetClick = (preset: any) => {
    const newRange = preset.getValue();
    setTempDateRange(newRange);
    setShowPresets(false);
  };

  const handleApply = () => {
    onApply(tempDateRange);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Bộ lọc thời gian:</span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <div className="flex items-center space-x-2">
              <input
                type="date"
                value={tempDateRange.from.toISOString().split('T')[0]}
                onChange={(e) => setTempDateRange({
                  ...tempDateRange,
                  from: new Date(e.target.value)
                })}
                className="block w-36 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
              />
              <span className="text-gray-500">đến</span>
              <input
                type="date"
                value={tempDateRange.to.toISOString().split('T')[0]}
                onChange={(e) => setTempDateRange({
                  ...tempDateRange,
                  to: new Date(e.target.value)
                })}
                className="block w-36 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowPresets(!showPresets)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Calendar className="h-4 w-4 mr-1" />
              Preset
            </button>

            {showPresets && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-10">
                <div className="py-1">
                  {presets.map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => handlePresetClick(preset)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleApply}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Áp dụng
          </button>
          <button
            onClick={onClear}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <X className="h-4 w-4 mr-1" />
            Xóa lọc
          </button>
        </div>

        <div className="text-sm text-gray-500">
          Kỳ báo cáo: {formatDate(dateRange.from)} - {formatDate(dateRange.to)}
        </div>
      </div>
    </div>
  );
};

export default CommonFilter;