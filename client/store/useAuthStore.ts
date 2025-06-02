import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface AuthState {
    username: string;
}

interface AuthActions {
    setUsername: (username: string) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
    subscribeWithSelector((set) => ({
        username: '',

        setUsername: (username: string) => set({ username }),
        clearAuth: () => set({ username: '' }),
    })),
);

export const selectUsername = (state: AuthState & AuthActions) => state.username;
export const selectSetUsername = (state: AuthState & AuthActions) => state.setUsername;
export const selectClearAuth = (state: AuthState & AuthActions) => state.clearAuth;
