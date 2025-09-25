import React from 'react';
import { X, Download } from 'lucide-react';
import { ModalData } from '../types';
import DataTable from './DataTable';

interface DetailModalProps {
  data: ModalData;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ data, onClose }) => {
  const renderContent = () => {
    switch (data.type) {
      case 'total_jobs':
      case 'active_jobs':
      case 'successful_jobs':
        return (
          <DataTable
            headers={['Mã tin', 'Doanh nghiệp', 'Ngành nghề', 'Ngày đăng', 'Trạng thái']}
            data={data.data.slice(0, 10).map((job: any) => [
              job.id,
              job.company,
              job.industry,
              new Date(job.postDate).toLocaleDateString('vi-VN'),
              job.status,
            ])}
          />
        );

      case 'participating_enterprises':
        return (
          <DataTable
            headers={['Tên DN', 'Địa chỉ', 'Số tin đăng', 'Số tin thành công', 'Tỷ lệ thành công']}
            data={data.data.slice(0, 10).map((enterprise: any) => [
              enterprise.name,
              enterprise.address,
              enterprise.jobPostings.toString(),
              Math.floor(enterprise.jobPostings * enterprise.successRate / 100).toString(),
              `${enterprise.successRate}%`,
            ])}
          />
        );

      case 'total_candidates':
      case 'employed_candidates':
      case 'unemployed_candidates':
      case 'jobless_candidates':
      case 'new_candidates':
        return (
          <DataTable
            headers={['Họ tên', 'Ngày sinh', 'Trình độ', 'Ngành nghề mong muốn', 'Trạng thái']}
            data={data.data.slice(0, 10).map((candidate: any) => [
              candidate.name,
              new Date(candidate.birthDate).toLocaleDateString('vi-VN'),
              candidate.education,
              candidate.desiredField,
              candidate.status,
            ])}
          />
        );

      default:
        return (
          <div className="text-center py-8 text-gray-500">
            Không có dữ liệu chi tiết
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {data.title}
              </h3>
              <div className="flex items-center space-x-2">
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <Download className="h-4 w-4 mr-1" />
                  Xuất Excel
                </button>
                <button
                  onClick={onClose}
                  className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div className="mt-4">
              {renderContent()}
            </div>
          </div>
          
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;