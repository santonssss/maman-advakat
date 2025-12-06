import type {
  Case,
  Order,
  DiaryEntry,
  LawyerProfile,
  KPIData,
  Notification,
} from "@/types";

export const mockKPI: KPIData = {
  activeCases: 12,
  overdueCases: 3,
  pendingCases: 5,
  completedThisMonth: 8,
};

export const mockCases: Case[] = [
  {
    id: "1",
    number: "Д-2024-001",
    title: "Иск о взыскании задолженности",
    client: "Иванов Петр Сергеевич",
    clientPhone: "+7 (999) 123-45-67",
    clientEmail: "ivanov@mail.ru",
    status: "active",
    currentStage: "Подготовка документов",
    nearestDeadline: new Date(2024, 11, 15),
    createdAt: new Date(2024, 10, 1),
    orderId: "O-2024-001",
    files: [
      {
        id: "1",
        name: "Паспорт.pdf",
        type: "passport",
        url: "#",
        uploadedAt: new Date(),
      },
      {
        id: "2",
        name: "Договор.pdf",
        type: "document",
        url: "#",
        uploadedAt: new Date(),
      },
    ],
    deadlines: [
      {
        id: "1",
        title: "Ознакомление с материалами",
        date: new Date(2024, 11, 10),
        completed: true,
      },
      {
        id: "2",
        title: "Подача искового заявления",
        date: new Date(2024, 11, 15),
        completed: false,
      },
    ],
  },
  {
    id: "2",
    number: "Д-2024-002",
    title: "Защита по уголовному делу",
    client: "Сидорова Анна Михайловна",
    clientPhone: "+7 (999) 987-65-43",
    status: "overdue",
    currentStage: "Судебное заседание",
    nearestDeadline: new Date(2024, 10, 28),
    createdAt: new Date(2024, 9, 15),
    orderId: "O-2024-002",
    files: [],
    deadlines: [
      {
        id: "3",
        title: "Судебное заседание",
        date: new Date(2024, 10, 28),
        completed: false,
      },
    ],
  },
  {
    id: "3",
    number: "Д-2024-003",
    title: "Раздел имущества",
    client: "Козлов Дмитрий Александрович",
    status: "pending",
    currentStage: "Ожидание решения",
    nearestDeadline: new Date(2024, 11, 20),
    createdAt: new Date(2024, 10, 10),
    files: [],
    deadlines: [],
  },
  {
    id: "4",
    number: "Д-2024-004",
    title: "Трудовой спор",
    client: "Николаева Елена Владимировна",
    status: "active",
    currentStage: "Сбор доказательств",
    nearestDeadline: new Date(2024, 11, 18),
    createdAt: new Date(2024, 10, 20),
    files: [],
    deadlines: [],
  },
  {
    id: "5",
    number: "Д-2024-005",
    title: "Наследственное дело",
    client: "Морозов Алексей Игоревич",
    status: "completed",
    currentStage: "Завершено",
    nearestDeadline: new Date(2024, 10, 1),
    createdAt: new Date(2024, 8, 1),
    files: [],
    deadlines: [],
  },
  {
    id: "6",
    number: "Д-2024-006",
    title: "Банкротство физического лица",
    client: "Волкова Мария Андреевна",
    status: "overdue",
    currentStage: "Подача заявления",
    nearestDeadline: new Date(2024, 10, 25),
    createdAt: new Date(2024, 10, 5),
    files: [],
    deadlines: [],
  },
];

export const mockOrders: Order[] = [
  {
    id: "O-2024-001",
    number: "ОР-2024-001",
    client: "Иванов Петр Сергеевич",
    startDate: new Date(2024, 10, 1),
    status: "active",
    deadline: new Date(2024, 11, 30),
    caseId: "1",
  },
  {
    id: "O-2024-002",
    number: "ОР-2024-002",
    client: "Сидорова Анна Михайловна",
    startDate: new Date(2024, 9, 15),
    status: "in-progress",
    deadline: new Date(2024, 11, 15),
    caseId: "2",
  },
  {
    id: "O-2024-003",
    number: "ОР-2024-003",
    client: "Козлов Дмитрий Александрович",
    startDate: new Date(2024, 10, 10),
    status: "closure-requested",
    caseId: "3",
    closureReport:
      "Дело завершено успешно. Раздел имущества произведен по соглашению сторон.",
  },
  {
    id: "O-2024-004",
    number: "ОР-2024-004",
    client: "Петрова Светлана Николаевна",
    startDate: new Date(2024, 8, 1),
    status: "closed",
  },
];

export const mockDiaryEntries: DiaryEntry[] = [
  {
    id: "1",
    caseId: "1",
    date: new Date(2024, 10, 1),
    stage: "Первичная консультация",
    title: "Встреча с клиентом",
    content:
      "Проведена первичная консультация. Собраны документы для анализа ситуации.",
    status: "completed",
    files: [],
  },
  {
    id: "2",
    caseId: "1",
    date: new Date(2024, 10, 5),
    stage: "Анализ документов",
    title: "Правовой анализ",
    content: "Изучены все представленные документы. Составлен план действий.",
    status: "completed",
    files: [],
  },
  {
    id: "3",
    caseId: "1",
    date: new Date(2024, 10, 15),
    stage: "Подготовка документов",
    title: "Составление искового заявления",
    content: "В процессе подготовки исковое заявление.",
    status: "in-progress",
    files: [],
  },
];

export const mockProfile: LawyerProfile = {
  id: "1",
  fullName: "Александров Михаил Викторович",
  photo: undefined,
  age: 38,
  education: "МГУ им. М.В. Ломоносова, юридический факультет",
  experience: "12 лет",
  specialization: "Гражданское и уголовное право",
  phone: "+7 (999) 555-12-34",
  email: "alexandrov@lawfirm.ru",
  documents: [
    {
      id: "1",
      name: "Диплом.pdf",
      type: "document",
      url: "#",
      uploadedAt: new Date(),
    },
    {
      id: "2",
      name: "Лицензия.pdf",
      type: "document",
      url: "#",
      uploadedAt: new Date(),
    },
  ],
  notes: "Специализируюсь на сложных гражданских делах.",
};

export const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Срок истекает",
    message: "Дело Д-2024-001: срок подачи документов через 2 дня",
    type: "deadline",
    read: false,
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Просрочено",
    message: "Дело Д-2024-002: срок судебного заседания истек",
    type: "overdue",
    read: false,
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "Новое дело",
    message: "Вам назначено новое дело Д-2024-006",
    type: "new-case",
    read: true,
    createdAt: new Date(),
  },
];

export const mockStatistics = {
  completedOnTime: 45,
  completedLate: 8,
  avgResponseTime: "2.3 дня",
  currentOverdue: 3,
  monthlyData: [
    { month: "Июль", active: 10, completed: 5, overdue: 1 },
    { month: "Август", active: 12, completed: 6, overdue: 2 },
    { month: "Сентябрь", active: 14, completed: 8, overdue: 1 },
    { month: "Октябрь", active: 11, completed: 7, overdue: 3 },
    { month: "Ноябрь", active: 15, completed: 9, overdue: 2 },
    { month: "Декабрь", active: 12, completed: 8, overdue: 3 },
  ],
};

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface ChatContact {
  id: string;
  name: string;
  role: string;
  online: boolean;
  lastMessage?: string;
  unreadCount: number;
}

export const mockChatContacts: ChatContact[] = [
  {
    id: "2",
    name: "Петров Сергей Иванович",
    role: "Адвокат",
    online: true,
    lastMessage: "Добрый день! Как продвигается дело?",
    unreadCount: 2,
  },
  {
    id: "3",
    name: "Козлова Ольга Николаевна",
    role: "Адвокат",
    online: false,
    lastMessage: "Спасибо за документы",
    unreadCount: 0,
  },
  {
    id: "4",
    name: "Смирнов Андрей Петрович",
    role: "Старший партнёр",
    online: true,
    lastMessage: "Срочно нужна консультация",
    unreadCount: 1,
  },
  {
    id: "5",
    name: "Иванова Мария Сергеевна",
    role: "Адвокат",
    online: false,
    lastMessage: "Встреча перенесена на завтра",
    unreadCount: 0,
  },
];

export const mockChatMessages: Record<string, ChatMessage[]> = {
  "2": [
    {
      id: "1",
      senderId: "2",
      senderName: "Петров С.И.",
      content: "Добрый день! Как продвигается дело Иванова?",
      timestamp: new Date(2024, 11, 5, 10, 30),
      read: true,
    },
    {
      id: "2",
      senderId: "1",
      senderName: "Вы",
      content:
        "Здравствуйте! Готовлю исковое заявление, планирую подать на следующей неделе.",
      timestamp: new Date(2024, 11, 5, 10, 35),
      read: true,
    },
    {
      id: "3",
      senderId: "2",
      senderName: "Петров С.И.",
      content: "Отлично! Есть какие-то сложности?",
      timestamp: new Date(2024, 11, 5, 10, 40),
      read: false,
    },
    {
      id: "4",
      senderId: "2",
      senderName: "Петров С.И.",
      content: "Если нужна помощь с документами, обращайтесь.",
      timestamp: new Date(2024, 11, 5, 10, 41),
      read: false,
    },
  ],
  "3": [
    {
      id: "1",
      senderId: "1",
      senderName: "Вы",
      content: "Отправил вам документы по делу Козлова",
      timestamp: new Date(2024, 11, 4, 15, 0),
      read: true,
    },
    {
      id: "2",
      senderId: "3",
      senderName: "Козлова О.Н.",
      content: "Спасибо за документы",
      timestamp: new Date(2024, 11, 4, 16, 20),
      read: true,
    },
  ],
  "4": [
    {
      id: "1",
      senderId: "4",
      senderName: "Смирнов А.П.",
      content: "Срочно нужна консультация по уголовному делу",
      timestamp: new Date(2024, 11, 5, 9, 0),
      read: false,
    },
  ],
};
