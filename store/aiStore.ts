import { defineStore } from 'pinia';
import type { Database } from '~/types/supabase';

type Game = Database['public']['Tables']['games']['Row'];

// ai store
export const useAiStore = defineStore('aiStore', {
  state: () => {
    return {
      selectedGameId: null as string | number | null,
      isLoading: false,
      isFetched: false,
      error: null as string | null,
    };
  },
  actions: {
    setSelectedGame(gameId: string | number | null) {
      this.selectedGameId = gameId;
    },
    clearSelectedGame() {
      this.selectedGameId = null;
    },
  },
});
