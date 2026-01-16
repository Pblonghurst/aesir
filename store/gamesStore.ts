import { defineStore } from 'pinia';
import type { Database } from '~/types/supabase';
import { toast } from 'vue-sonner';

type Game = Database['public']['Tables']['games']['Row'];

// Games Store
export const useGamesStore = defineStore('gamesStore', {
  state: () => {
    return {
      games: [] as Game[],
      isLoading: false,
      isFetched: false,
      error: null as string | null,
    };
  },
  // In store
  getters: {
    getGames: (state) => state.games || [],
    getGameById: (state) => (id: number) => (state.games || []).find((game) => game.id === id),
  },
  actions: {
    // Fetch all games
    async fetchGames() {
      if (this.isFetched) return this.games;
      this.error = null;
      this.isLoading = true;
      this.isFetched = true;
      try {
        const data = await $fetch<Game[]>('/api/auth/games');
        this.games = data;
        return this.games;
      } catch (err: any) {
        this.error = err.message;
        return null;
      } finally {
        this.isLoading = false;
      }
    },
    // create a new game
    async createGame(gameData: Game) {
      this.error = null;
      this.isLoading = true;
      try {
        const data = await $fetch('/api/auth/games', {
          method: 'POST',
          body: gameData,
        });
        this.games.push(data);
        return data;
      } catch (err: any) {
        const errorMessage = err.message || 'Failed to create game';
        this.error = errorMessage;
        toast.error(errorMessage);
      } finally {
        this.isLoading = false;
      }
    },
  },
});

// Add Game Dialog Store
export const useGamesAddDialogStore = defineStore('gamesAddDialogStore', {
  state: () => {
    return {
      isOpen: false,
      isLoading: false,
      error: null as string | null,
    };
  },
  actions: {
    openAddGameDialog() {
      this.error = null;
      this.isOpen = true;
    },
    closeAddGameDialog() {
      this.isOpen = false;
      this.error = null;
    },
  },
});
