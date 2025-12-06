export interface Case {
  id: string;
  number: string;
  title: string;
  client: string;
  clientPhone?: string;
  clientEmail?: string;
  status: "active" | "overdue" | "completed" | "pending";
  currentStage: string;
  nearestDeadline: Date;
  createdAt: Date;
  orderId?: string;
  files: CaseFile[];
  deadlines: Deadline[];
}

export interface CaseFile {
  id: string;
  name: string;
  type: "passport" | "document" | "court" | "other";
  url: string;
  uploadedAt: Date;
}

export interface Deadline {
  id: string;
  title: string;
  date: Date;
  completed: boolean;
}

export interface DiaryEntry {
  id: string;
  caseId: string;
  date: Date;
  stage: string;
  title: string;
  content: string;
  status: "planned" | "in-progress" | "completed";
  files: CaseFile[];
}

export interface Order {
  id: string;
  number: string;
  client: string;
  startDate: Date;
  status: "active" | "in-progress" | "closure-requested" | "closed";
  deadline?: Date;
  caseId?: string;
  closureReport?: string;
}

export interface LawyerProfile {
  id: string;
  fullName: string;
  photo?: string;
  age: number;
  education: string;
  experience: string;
  specialization: string;
  phone: string;
  email: string;
  documents: CaseFile[];
  notes?: string;
}

export interface KPIData {
  activeCases: number;
  overdueCases: number;
  pendingCases: number;
  completedThisMonth: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "deadline" | "overdue" | "new-case" | "info";
  read: boolean;
  createdAt: Date;
}
