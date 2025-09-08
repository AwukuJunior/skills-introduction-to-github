import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const API_URL = '/api'; // This should be configured properly, e.g., from an env file

const useStore = create(
  persist(
    (set, get) => ({
      // =================================================
      // Auth Slice
      // =================================================
      token: null,
      user: null,
      isAuthenticated: false,

      login: async (email, password) => {
        try {
          const { data } = await axios.post(`${API_URL}/auth/login`, { email, password });
          set({ token: data.token, user: data.user, isAuthenticated: true });
          return { success: true };
        } catch (error) {
          console.error('Login failed:', error.response?.data?.message || error.message);
          return { success: false, error: error.response?.data?.message || 'Login failed' };
        }
      },

      signup: async (userData) => {
        try {
          const { data } = await axios.post(`${API_URL}/auth/signup`, userData);
          set({ token: data.token, user: data.user, isAuthenticated: true });
          return { success: true };
        } catch (error) {
          console.error('Signup failed:', error.response?.data?.message || error.message);
          return { success: false, error: error.response?.data?.message || 'Signup failed' };
        }
      },

      logout: () => {
        set({ token: null, user: null, isAuthenticated: false });
      },

      // =================================================
      // Transactions Slice
      // =================================================
      transactions: [],

      getTransactions: async () => {
        try {
          const { data } = await axios.get(`${API_URL}/transactions`, {
            headers: { Authorization: `Bearer ${get().token}` },
          });
          set({ transactions: data });
        } catch (error) {
          console.error('Failed to fetch transactions:', error.response?.data?.message || error.message);
        }
      },

      addTransaction: async (transactionData) => {
        try {
          const { data } = await axios.post(`${API_URL}/transactions`, transactionData, {
            headers: { Authorization: `Bearer ${get().token}` },
          });
          set((state) => ({ transactions: [...state.transactions, data] }));
          return { success: true };
        } catch (error) {
          console.error('Failed to add transaction:', error.response?.data?.message || error.message);
          return { success: false, error: error.response?.data?.message || 'Failed to add transaction' };
        }
      },

      deleteTransaction: async (id) => {
        try {
          await axios.delete(`${API_URL}/transactions/${id}`, {
            headers: { Authorization: `Bearer ${get().token}` },
          });
          set((state) => ({
            transactions: state.transactions.filter((t) => t.id !== id),
          }));
          return { success: true };
        } catch (error) {
          console.error('Failed to delete transaction:', error.response?.data?.message || error.message);
          return { success: false, error: error.response?.data?.message || 'Failed to delete transaction' };
        }
      },

      // =================================================
      // Dashboard Slice
      // =================================================
      dashboardData: null,

      getDashboardData: async () => {
        try {
          const { data } = await axios.get(`${API_URL}/dashboard`, {
            headers: { Authorization: `Bearer ${get().token}` },
          });
          set({ dashboardData: data });
        } catch (error) {
          console.error('Failed to fetch dashboard data:', error.response?.data?.message || error.message);
        }
      },

      // =================================================
      // Saving Goals Slice
      // =================================================
      goals: [],

      getGoals: async () => {
        try {
          const { data } = await axios.get(`${API_URL}/goals`, {
            headers: { Authorization: `Bearer ${get().token}` },
          });
          set({ goals: data });
        } catch (error) {
          console.error('Failed to fetch goals:', error.response?.data?.message || error.message);
        }
      },

      addGoal: async (goalData) => {
        try {
          const { data } = await axios.post(`${API_URL}/goals`, goalData, {
            headers: { Authorization: `Bearer ${get().token}` },
          });
          set((state) => ({ goals: [...state.goals, data] }));
        } catch (error) {
          console.error('Failed to add goal:', error.response?.data?.message || error.message);
        }
      },

      updateGoal: async (id, goalData) => {
        try {
          const { data } = await axios.put(`${API_URL}/goals/${id}`, goalData, {
            headers: { Authorization: `Bearer ${get().token}` },
          });
          set((state) => ({
            goals: state.goals.map((g) => (g.id === id ? data : g)),
          }));
        } catch (error) {
          console.error('Failed to update goal:', error.response?.data?.message || error.message);
        }
      },

      deleteGoal: async (id) => {
        try {
          await axios.delete(`${API_URL}/goals/${id}`, {
            headers: { Authorization: `Bearer ${get().token}` },
          });
          set((state) => ({
            goals: state.goals.filter((g) => g.id !== id),
          }));
        } catch (error) {
          console.error('Failed to delete goal:', error.response?.data?.message || error.message);
        }
      },

      // =================================================
      // Settings Slice
      // =================================================
      settings: { theme: 'light' }, // Default settings

      getSettings: async () => {
        try {
          const { data } = await axios.get(`${API_URL}/settings`, {
            headers: { Authorization: `Bearer ${get().token}` },
          });
          set({ settings: { ...get().settings, ...data } });
          // Apply theme immediately after fetching
          document.body.className = data.theme || 'light';
        } catch (error) {
          console.error('Failed to fetch settings:', error.response?.data?.message || error.message);
        }
      },

      updateSettings: async (settingsData) => {
        try {
          const { data } = await axios.put(`${API_URL}/settings`, settingsData, {
            headers: { Authorization: `Bearer ${get().token}` },
          });
          set({ settings: data });
          // Apply theme immediately after updating
          document.body.className = data.theme || 'light';
        } catch (error) {
          console.error('Failed to update settings:', error.response?.data?.message || error.message);
        }
      },
    }),
    {
      name: 'financial-tracker-storage', // name of the item in the storage (must be unique)
      partialize: (state) => ({ token: state.token, user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);

export default useStore;
