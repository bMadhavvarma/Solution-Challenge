import { create } from 'zustand';

interface User {
  id: string;
  fullName: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  loadUser: () => Promise<void>;
}

// Local storage keys
const USERS_KEY = 'local_users';
const CURRENT_USER_KEY = 'current_user';

const getLocalUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

const saveLocalUsers = (users: any[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  signUp: async (email: string, password: string, fullName: string) => {
    const users = getLocalUsers();
    
    // Check if user exists
    if (users.find((u: any) => u.email === email)) {
      throw new Error('Email already registered');
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      fullName
    };

    users.push(newUser);
    saveLocalUsers(users);

    const { password: _, ...userWithoutPassword } = newUser;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    set({ user: userWithoutPassword });
  },
  signIn: async (email: string, password: string) => {
    const users = getLocalUsers();
    const user = users.find((u: any) => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = user;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    set({ user: userWithoutPassword });
  },
  signOut: () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    set({ user: null });
  },
  loadUser: async () => {
    try {
      const savedUser = localStorage.getItem(CURRENT_USER_KEY);
      if (!savedUser) {
        set({ user: null, isLoading: false });
        return;
      }
      set({ user: JSON.parse(savedUser), isLoading: false });
    } catch (error) {
      localStorage.removeItem(CURRENT_USER_KEY);
      set({ user: null, isLoading: false });
    }
  }
}));