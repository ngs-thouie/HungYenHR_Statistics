export interface DateRange {
  from: Date;
  to: Date;
}

export type TabType = 'recruitment' | 'candidates' | 'industries' | 'enterprises' | 'education';

export interface Location {
  id: string;
  name: string;
  stats: {
    recruitment: {
      totalJobs: number;
      activeJobs: number;
      successfulJobs: number;
      enterprises: number;
      avgJobsPerEnterprise: number;
    };
    candidates: {
      total: number;
      employed: number;
      unemployed: number;
      jobless: number;
      newRegistrations: number;
    };
    education: {
      trained: number;
      untrained: number;
    };
  };
}

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  industry: string;
  postDate: string;
  status: string;
  location: string;
}

export interface Candidate {
  id: string;
  name: string;
  birthDate: string;
  education: string;
  desiredField: string;
  status: string;
  registrationDate: string;
  location: string;
}

export interface Enterprise {
  id: string;
  name: string;
  taxCode: string;
  industry: string;
  address: string;
  jobPostings: number;
  successRate: number;
}

export interface Industry {
  name: string;
  jobPostings: number;
  candidates: number;
  skillGap: number;
}

export interface EducationStat {
  level: string;
  count: number;
  percentage: number;
}

export interface AgeStat {
  range: string;
  count: number;
  percentage: number;
}

export interface ModalData {
  type: string;
  data: any;
  title: string;
}