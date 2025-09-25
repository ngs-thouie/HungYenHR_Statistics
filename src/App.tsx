import React, { useState, useMemo } from 'react';
import { Calendar, Filter, Download, Users, Building2, TrendingUp, GraduationCap, Briefcase, Target, X } from 'lucide-react';
import CommonFilter from './components/CommonFilter';
import StatsCard from './components/StatsCard';
import DataTable from './components/DataTable';
import DetailModal from './components/DetailModal';
import Pagination from './components/Pagination';
import { mockData } from './data/mockData';
import { DateRange, TabType, ModalData } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('recruitment');
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(2024, 0, 1),
    to: new Date(2024, 11, 31)
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalData | null>(null);

  const itemsPerPage = 10;

  const tabs = [
    { id: 'recruitment' as TabType, name: 'Thống kê tuyển dụng', icon: Briefcase },
    { id: 'candidates' as TabType, name: 'Thống kê ứng viên', icon: Users },
    { id: 'industries' as TabType, name: 'Thống kê theo lĩnh vực', icon: Target },
    { id: 'enterprises' as TabType, name: 'Thống kê doanh nghiệp', icon: Building2 },
    { id: 'education' as TabType, name: 'Thống kê trình độ & tuổi', icon: GraduationCap },
  ];

  const filteredData = useMemo(() => {
    const locations = mockData.locations.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    return { ...mockData, locations };
  }, [currentPage]);

  const totalPages = Math.ceil(mockData.locations.length / itemsPerPage);

  const handleStatClick = (type: string, data: any) => {
    setModalData({ type, data, title: getModalTitle(type) });
    setIsModalOpen(true);
  };

  const getModalTitle = (type: string): string => {
    const titles: Record<string, string> = {
      'total_jobs': 'Chi tiết tổng số tin tuyển dụng',
      'active_jobs': 'Chi tiết tin tuyển dụng còn hiệu lực',
      'successful_jobs': 'Chi tiết tin đã tuyển thành công',
      'participating_enterprises': 'Chi tiết doanh nghiệp tham gia',
      'total_candidates': 'Chi tiết tổng số ứng viên',
      'employed_candidates': 'Chi tiết ứng viên có việc làm',
      'unemployed_candidates': 'Chi tiết ứng viên chưa có việc',
      'jobless_candidates': 'Chi tiết ứng viên thất nghiệp',
      'new_candidates': 'Chi tiết ứng viên mới đăng ký',
    };
    return titles[type] || 'Chi tiết thống kê';
  };

  const handleApplyFilter = (newDateRange: DateRange) => {
    setDateRange(newDateRange);
    setCurrentPage(1);
  };

  const handleClearFilter = () => {
    setDateRange({
      from: new Date(2024, 0, 1),
      to: new Date(2024, 11, 31)
    });
    setCurrentPage(1);
  };

  const renderRecruitmentTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatsCard
          title="Tổng số tin tuyển dụng"
          value="1,245"
          color="blue"
          onClick={() => handleStatClick('total_jobs', filteredData.jobPostings)}
        />
        <StatsCard
          title="Tin còn hiệu lực"
          value="892"
          color="green"
          onClick={() => handleStatClick('active_jobs', filteredData.jobPostings.filter(j => j.status === 'Còn hạn'))}
        />
        <StatsCard
          title="Tin đã tuyển thành công"
          value="353"
          color="emerald"
          onClick={() => handleStatClick('successful_jobs', filteredData.jobPostings.filter(j => j.status === 'Đã tuyển'))}
        />
        <StatsCard
          title="DN tham gia tuyển dụng"
          value="187"
          color="purple"
          onClick={() => handleStatClick('participating_enterprises', filteredData.enterprises)}
        />
        <StatsCard
          title="TB tin tuyển/DN"
          value="6.7"
          color="orange"
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Thống kê theo địa điểm</h3>
        </div>
        <DataTable
          headers={['Địa điểm', 'Tổng tin TD', 'Tin còn hạn', 'Tin đã tuyển', 'Số DN', 'TB tin/DN']}
          data={filteredData.locations.map(location => [
            location.name,
            location.stats.recruitment.totalJobs.toString(),
            location.stats.recruitment.activeJobs.toString(),
            location.stats.recruitment.successfulJobs.toString(),
            location.stats.recruitment.enterprises.toString(),
            location.stats.recruitment.avgJobsPerEnterprise.toString(),
          ])}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );

  const renderCandidatesTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatsCard
          title="Tổng số ứng viên"
          value="3,456"
          color="blue"
          onClick={() => handleStatClick('total_candidates', filteredData.candidates)}
        />
        <StatsCard
          title="Ứng viên có việc"
          value="2,234"
          color="green"
          onClick={() => handleStatClick('employed_candidates', filteredData.candidates.filter(c => c.status === 'Có việc'))}
        />
        <StatsCard
          title="Ứng viên chưa có việc"
          value="1,022"
          color="yellow"
          onClick={() => handleStatClick('unemployed_candidates', filteredData.candidates.filter(c => c.status === 'Chưa có việc'))}
        />
        <StatsCard
          title="Ứng viên thất nghiệp"
          value="200"
          color="red"
          onClick={() => handleStatClick('jobless_candidates', filteredData.candidates.filter(c => c.status === 'Thất nghiệp'))}
        />
        <StatsCard
          title="Ứng viên mới đăng ký"
          value="145"
          color="purple"
          onClick={() => handleStatClick('new_candidates', filteredData.candidates.filter(c => new Date(c.registrationDate) >= dateRange.from))}
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Thống kê theo địa điểm</h3>
        </div>
        <DataTable
          headers={['Địa điểm', 'Tổng UV', 'UV có việc', 'UV chưa có việc', 'UV thất nghiệp', 'UV mới ĐK']}
          data={filteredData.locations.map(location => [
            location.name,
            location.stats.candidates.total.toString(),
            location.stats.candidates.employed.toString(),
            location.stats.candidates.unemployed.toString(),
            location.stats.candidates.jobless.toString(),
            location.stats.candidates.newRegistrations.toString(),
          ])}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );

  const renderIndustriesTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Thống kê theo ngành nghề</h3>
        </div>
        <DataTable
          headers={['Ngành nghề', 'Số tin TD', 'Số UV mong muốn', 'Skill Gap', 'Tỷ lệ cung/cầu']}
          data={mockData.industries.map(industry => [
            industry.name,
            industry.jobPostings.toString(),
            industry.candidates.toString(),
            industry.skillGap.toString(),
            `${((industry.candidates / industry.jobPostings) * 100).toFixed(1)}%`,
          ])}
        />
      </div>
    </div>
  );

  const renderEnterprisesTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatsCard
          title="Tổng số DN"
          value="468"
          color="blue"
        />
        <StatsCard
          title="DN có đăng tin TD"
          value="287"
          color="green"
        />
        <StatsCard
          title="DN tuyển thành công"
          value="203"
          color="emerald"
        />
        <StatsCard
          title="Trung bình tin/DN"
          value="4.3"
          color="purple"
        />
        <StatsCard
          title="TG tuyển dụng TB (ngày)"
          value="18.5"
          color="orange"
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Danh sách doanh nghiệp</h3>
        </div>
        <DataTable
          headers={['Tên doanh nghiệp', 'Mã số thuế', 'Lĩnh vực', 'Địa chỉ', 'Số tin đăng', 'Tỷ lệ thành công']}
          data={filteredData.enterprises.slice(0, 10).map(enterprise => [
            enterprise.name,
            enterprise.taxCode,
            enterprise.industry,
            enterprise.address,
            enterprise.jobPostings.toString(),
            `${enterprise.successRate}%`,
          ])}
        />
      </div>
    </div>
  );

  const renderEducationTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Thống kê theo trình độ</h3>
          </div>
          <DataTable
            headers={['Trình độ', 'Số lượng', 'Tỷ lệ (%)']}
            data={mockData.educationStats.map(edu => [
              edu.level,
              edu.count.toString(),
              `${edu.percentage}%`,
            ])}
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Thống kê theo nhóm tuổi</h3>
          </div>
          <DataTable
            headers={['Nhóm tuổi', 'Số lượng', 'Tỷ lệ (%)']}
            data={mockData.ageStats.map(age => [
              age.range,
              age.count.toString(),
              `${age.percentage}%`,
            ])}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Thống kê đào tạo nghề theo địa điểm</h3>
        </div>
        <DataTable
          headers={['Địa điểm', 'Lao động qua đào tạo', 'Lao động chưa đào tạo', 'Tỷ lệ đào tạo (%)']}
          data={filteredData.locations.map(location => [
            location.name,
            location.stats.education.trained.toString(),
            location.stats.education.untrained.toString(),
            `${((location.stats.education.trained / (location.stats.education.trained + location.stats.education.untrained)) * 100).toFixed(1)}%`,
          ])}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'recruitment':
        return renderRecruitmentTab();
      case 'candidates':
        return renderCandidatesTab();
      case 'industries':
        return renderIndustriesTab();
      case 'enterprises':
        return renderEnterprisesTab();
      case 'education':
        return renderEducationTab();
      default:
        return renderRecruitmentTab();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">
                Hệ thống quản lý nhân lực tỉnh Hưng Yên
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Download className="h-4 w-4 mr-1" />
                Xuất báo cáo
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Common Filter */}
        <CommonFilter
          dateRange={dateRange}
          onApply={handleApplyFilter}
          onClear={handleClearFilter}
        />

        {/* Tabs */}
        <div className="mb-8">
          <div className="sm:hidden">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value as TabType)}
              className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            >
              {tabs.map((tab) => (
                <option key={tab.id} value={tab.id}>
                  {tab.name}
                </option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <nav className="flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm inline-flex items-center`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {renderActiveTab()}
      </div>

      {/* Detail Modal */}
      {isModalOpen && modalData && (
        <DetailModal
          data={modalData}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;