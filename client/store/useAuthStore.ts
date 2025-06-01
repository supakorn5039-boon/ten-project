import { create } from 'zustand';

interface AuthState {
    username: string;
    setUsername: (username: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    username: '',
    setUsername: (username: string) => set({ username }),
}));
