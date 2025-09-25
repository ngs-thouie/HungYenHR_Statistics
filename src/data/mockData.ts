import { Location, JobPosting, Candidate, Enterprise, Industry, EducationStat, AgeStat } from '../types';

export const mockData = {
  locations: [
    {
      id: '1',
      name: 'Thành phố Hưng Yên',
      stats: {
        recruitment: {
          totalJobs: 245,
          activeJobs: 178,
          successfulJobs: 67,
          enterprises: 42,
          avgJobsPerEnterprise: 5.8
        },
        candidates: {
          total: 1250,
          employed: 890,
          unemployed: 280,
          jobless: 80,
          newRegistrations: 45
        },
        education: {
          trained: 820,
          untrained: 430
        }
      }
    },
    {
      id: '2',
      name: 'Huyện Văn Lâm',
      stats: {
        recruitment: {
          totalJobs: 156,
          activeJobs: 112,
          successfulJobs: 44,
          enterprises: 28,
          avgJobsPerEnterprise: 5.6
        },
        candidates: {
          total: 890,
          employed: 620,
          unemployed: 210,
          jobless: 60,
          newRegistrations: 28
        },
        education: {
          trained: 580,
          untrained: 310
        }
      }
    },
    {
      id: '3',
      name: 'Huyện Văn Giang',
      stats: {
        recruitment: {
          totalJobs: 189,
          activeJobs: 134,
          successfulJobs: 55,
          enterprises: 35,
          avgJobsPerEnterprise: 5.4
        },
        candidates: {
          total: 1080,
          employed: 756,
          unemployed: 256,
          jobless: 68,
          newRegistrations: 32
        },
        education: {
          trained: 702,
          untrained: 378
        }
      }
    },
    {
      id: '4',
      name: 'Huyện Yên Mỹ',
      stats: {
        recruitment: {
          totalJobs: 134,
          activeJobs: 95,
          successfulJobs: 39,
          enterprises: 24,
          avgJobsPerEnterprise: 5.6
        },
        candidates: {
          total: 756,
          employed: 529,
          unemployed: 181,
          jobless: 46,
          newRegistrations: 21
        },
        education: {
          trained: 492,
          untrained: 264
        }
      }
    },
    {
      id: '5',
      name: 'Huyện Mỹ Hào',
      stats: {
        recruitment: {
          totalJobs: 98,
          activeJobs: 71,
          successfulJobs: 27,
          enterprises: 18,
          avgJobsPerEnterprise: 5.4
        },
        candidates: {
          total: 654,
          employed: 458,
          unemployed: 156,
          jobless: 40,
          newRegistrations: 18
        },
        education: {
          trained: 426,
          untrained: 228
        }
      }
    },
    {
      id: '6',
      name: 'Huyện Ân Thi',
      stats: {
        recruitment: {
          totalJobs: 87,
          activeJobs: 63,
          successfulJobs: 24,
          enterprises: 16,
          avgJobsPerEnterprise: 5.4
        },
        candidates: {
          total: 598,
          employed: 419,
          unemployed: 143,
          jobless: 36,
          newRegistrations: 16
        },
        education: {
          trained: 389,
          untrained: 209
        }
      }
    },
    {
      id: '7',
      name: 'Huyện Khoái Châu',
      stats: {
        recruitment: {
          totalJobs: 76,
          activeJobs: 54,
          successfulJobs: 22,
          enterprises: 14,
          avgJobsPerEnterprise: 5.4
        },
        candidates: {
          total: 523,
          employed: 366,
          unemployed: 125,
          jobless: 32,
          newRegistrations: 14
        },
        education: {
          trained: 340,
          untrained: 183
        }
      }
    },
    {
      id: '8',
      name: 'Huyện Kim Động',
      stats: {
        recruitment: {
          totalJobs: 65,
          activeJobs: 47,
          successfulJobs: 18,
          enterprises: 12,
          avgJobsPerEnterprise: 5.4
        },
        candidates: {
          total: 456,
          employed: 319,
          unemployed: 109,
          jobless: 28,
          newRegistrations: 12
        },
        education: {
          trained: 297,
          untrained: 159
        }
      }
    },
    {
      id: '9',
      name: 'Huyện Tiên Lữ',
      stats: {
        recruitment: {
          totalJobs: 54,
          activeJobs: 39,
          successfulJobs: 15,
          enterprises: 10,
          avgJobsPerEnterprise: 5.4
        },
        candidates: {
          total: 398,
          employed: 279,
          unemployed: 95,
          jobless: 24,
          newRegistrations: 11
        },
        education: {
          trained: 259,
          untrained: 139
        }
      }
    },
    {
      id: '10',
      name: 'Huyện Phù Cừ',
      stats: {
        recruitment: {
          totalJobs: 43,
          activeJobs: 31,
          successfulJobs: 12,
          enterprises: 8,
          avgJobsPerEnterprise: 5.4
        },
        candidates: {
          total: 342,
          employed: 239,
          unemployed: 82,
          jobless: 21,
          newRegistrations: 9
        },
        education: {
          trained: 223,
          untrained: 119
        }
      }
    }
  ] as Location[],

  jobPostings: [
    {
      id: 'JOB001',
      title: 'Kỹ sư phần mềm',
      company: 'Công ty TNHH ABC',
      industry: 'Công nghệ thông tin',
      postDate: '2024-01-15',
      status: 'Còn hạn',
      location: 'Hưng Yên'
    },
    {
      id: 'JOB002',
      title: 'Nhân viên kế toán',
      company: 'Công ty CP XYZ',
      industry: 'Tài chính',
      postDate: '2024-01-20',
      status: 'Đã tuyển',
      location: 'Văn Lâm'
    },
    {
      id: 'JOB003',
      title: 'Công nhân sản xuất',
      company: 'Nhà máy DEF',
      industry: 'Sản xuất',
      postDate: '2024-02-01',
      status: 'Còn hạn',
      location: 'Văn Giang'
    },
    {
      id: 'JOB004',
      title: 'Nhân viên bán hàng',
      company: 'Siêu thị GHI',
      industry: 'Bán lẻ',
      postDate: '2024-02-10',
      status: 'Đã tuyển',
      location: 'Yên Mỹ'
    },
    {
      id: 'JOB005',
      title: 'Giáo viên tiếng Anh',
      company: 'Trung tâm JKL',
      industry: 'Giáo dục',
      postDate: '2024-02-15',
      status: 'Còn hạn',
      location: 'Mỹ Hào'
    }
  ] as JobPosting[],

  candidates: [
    {
      id: 'CV001',
      name: 'Nguyễn Văn A',
      birthDate: '1995-05-15',
      education: 'Đại học',
      desiredField: 'Công nghệ thông tin',
      status: 'Có việc',
      registrationDate: '2024-01-10',
      location: 'Hưng Yên'
    },
    {
      id: 'CV002',
      name: 'Trần Thị B',
      birthDate: '1998-08-22',
      education: 'Cao đẳng',
      desiredField: 'Tài chính',
      status: 'Chưa có việc',
      registrationDate: '2024-01-25',
      location: 'Văn Lâm'
    },
    {
      id: 'CV003',
      name: 'Lê Văn C',
      birthDate: '1990-12-03',
      education: 'Trung cấp',
      desiredField: 'Sản xuất',
      status: 'Thất nghiệp',
      registrationDate: '2024-02-05',
      location: 'Văn Giang'
    },
    {
      id: 'CV004',
      name: 'Phạm Thị D',
      birthDate: '1997-03-18',
      education: 'THPT',
      desiredField: 'Bán lẻ',
      status: 'Có việc',
      registrationDate: '2024-02-12',
      location: 'Yên Mỹ'
    },
    {
      id: 'CV005',
      name: 'Hoàng Văn E',
      birthDate: '1993-09-07',
      education: 'Đại học',
      desiredField: 'Giáo dục',
      status: 'Chưa có việc',
      registrationDate: '2024-02-20',
      location: 'Mỹ Hào'
    }
  ] as Candidate[],

  enterprises: [
    {
      id: 'ENT001',
      name: 'Công ty TNHH Công nghệ ABC',
      taxCode: '0123456789',
      industry: 'Công nghệ thông tin',
      address: 'Số 123, đường ABC, TP Hưng Yên',
      jobPostings: 25,
      successRate: 78
    },
    {
      id: 'ENT002',
      name: 'Công ty CP Tài chính XYZ',
      taxCode: '0987654321',
      industry: 'Tài chính',
      address: 'Số 456, đường XYZ, Văn Lâm',
      jobPostings: 18,
      successRate: 85
    },
    {
      id: 'ENT003',
      name: 'Nhà máy sản xuất DEF',
      taxCode: '0456789123',
      industry: 'Sản xuất',
      address: 'Số 789, đường DEF, Văn Giang',
      jobPostings: 42,
      successRate: 65
    },
    {
      id: 'ENT004',
      name: 'Siêu thị GHI',
      taxCode: '0321654987',
      industry: 'Bán lẻ',
      address: 'Số 147, đường GHI, Yên Mỹ',
      jobPostings: 15,
      successRate: 92
    },
    {
      id: 'ENT005',
      name: 'Trung tâm giáo dục JKL',
      taxCode: '0789123456',
      industry: 'Giáo dục',
      address: 'Số 258, đường JKL, Mỹ Hào',
      jobPostings: 8,
      successRate: 88
    }
  ] as Enterprise[],

  industries: [
    {
      name: 'Công nghệ thông tin',
      jobPostings: 245,
      candidates: 320,
      skillGap: -75
    },
    {
      name: 'Sản xuất',
      jobPostings: 456,
      candidates: 380,
      skillGap: 76
    },
    {
      name: 'Tài chính',
      jobPostings: 123,
      candidates: 180,
      skillGap: -57
    },
    {
      name: 'Bán lẻ',
      jobPostings: 189,
      candidates: 145,
      skillGap: 44
    },
    {
      name: 'Giáo dục',
      jobPostings: 67,
      candidates: 95,
      skillGap: -28
    },
    {
      name: 'Y tế',
      jobPostings: 98,
      candidates: 72,
      skillGap: 26
    },
    {
      name: 'Xây dựng',
      jobPostings: 156,
      candidates: 134,
      skillGap: 22
    }
  ] as Industry[],

  educationStats: [
    { level: 'THPT', count: 1456, percentage: 42.1 },
    { level: 'Trung cấp', count: 789, percentage: 22.8 },
    { level: 'Cao đẳng', count: 654, percentage: 18.9 },
    { level: 'Đại học', count: 498, percentage: 14.4 },
    { level: 'Sau đại học', count: 59, percentage: 1.7 }
  ] as EducationStat[],

  ageStats: [
    { range: '18-25', count: 1234, percentage: 35.7 },
    { range: '26-35', count: 1456, percentage: 42.1 },
    { range: '36-45', count: 567, percentage: 16.4 },
    { range: '45+', count: 199, percentage: 5.8 }
  ] as AgeStat[]
};