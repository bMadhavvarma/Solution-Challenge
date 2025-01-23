import { create } from 'zustand';

interface Career {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface UserCareer {
  id: string;
  userId: string;
  careerId: string;
  progress: number;
}

interface CareerState {
  careers: Career[];
  userCareers: UserCareer[];
  isLoading: boolean;
  loadCareers: () => Promise<void>;
  loadUserCareers: () => Promise<void>;
  selectCareer: (careerId: string) => Promise<void>;
  updateProgress: (userCareerId: string, progress: number) => Promise<void>;
}

// Local storage keys
const CAREERS_KEY = 'local_careers';
const USER_CAREERS_KEY = 'local_user_careers';

// Default careers data
const defaultCareers: Career[] = [
  {
    id: '1',
    title: 'Software Development',
    description: 'Build the future of technology',
    icon: 'Code',
    color: 'bg-blue-100 hover:bg-blue-200'
  },
  {
    id: '2',
    title: 'Business Analytics',
    description: 'Transform data into insights',
    icon: 'BarChart',
    color: 'bg-blue-50 hover:bg-blue-100'
  },
  {
    id: '3',
    title: 'UX Design',
    description: 'Create amazing user experiences',
    icon: 'Palette',
    color: 'bg-blue-100 hover:bg-blue-200'
  },
  {
    id: '4',
    title: 'Project Management',
    description: 'Lead teams to success',
    icon: 'Briefcase',
    color: 'bg-blue-50 hover:bg-blue-100'
  },
  {
    id: '5',
    title: 'Data Science',
    description: 'Unlock patterns in data',
    icon: 'Microscope',
    color: 'bg-blue-100 hover:bg-blue-200'
  },
  {
    id: '6',
    title: 'DevOps',
    description: 'Bridge development and operations',
    icon: 'Server',
    color: 'bg-blue-50 hover:bg-blue-100'
  }
];

export const useCareerStore = create<CareerState>((set, get) => ({
  careers: [],
  userCareers: [],
  isLoading: false,
  loadCareers: async () => {
    set({ isLoading: true });
    try {
      // Initialize careers if not exists
      const savedCareers = localStorage.getItem(CAREERS_KEY);
      if (!savedCareers) {
        localStorage.setItem(CAREERS_KEY, JSON.stringify(defaultCareers));
        set({ careers: defaultCareers, isLoading: false });
      } else {
        set({ careers: JSON.parse(savedCareers), isLoading: false });
      }
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  loadUserCareers: async () => {
    set({ isLoading: true });
    try {
      const savedUserCareers = localStorage.getItem(USER_CAREERS_KEY);
      set({ 
        userCareers: savedUserCareers ? JSON.parse(savedUserCareers) : [],
        isLoading: false 
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  selectCareer: async (careerId: string) => {
    const currentUser = localStorage.getItem('current_user');
    if (!currentUser) throw new Error('User not authenticated');
    
    const user = JSON.parse(currentUser);
    const newUserCareer: UserCareer = {
      id: Date.now().toString(),
      userId: user.id,
      careerId,
      progress: 0
    };

    const savedUserCareers = localStorage.getItem(USER_CAREERS_KEY);
    const userCareers = savedUserCareers ? JSON.parse(savedUserCareers) : [];
    
    // Check if career already selected
    if (userCareers.some((uc: UserCareer) => 
      uc.userId === user.id && uc.careerId === careerId
    )) {
      throw new Error('Career path already selected');
    }

    userCareers.push(newUserCareer);
    localStorage.setItem(USER_CAREERS_KEY, JSON.stringify(userCareers));
    set({ userCareers });
  },
  updateProgress: async (userCareerId: string, progress: number) => {
    const savedUserCareers = localStorage.getItem(USER_CAREERS_KEY);
    if (!savedUserCareers) return;

    const userCareers = JSON.parse(savedUserCareers);
    const updatedCareers = userCareers.map((career: UserCareer) =>
      career.id === userCareerId ? { ...career, progress } : career
    );

    localStorage.setItem(USER_CAREERS_KEY, JSON.stringify(updatedCareers));
    set({ userCareers: updatedCareers });
  }
}));