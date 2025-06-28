import { defineStore } from 'pinia';

// Define the Game type based on the API response
interface Game {
  id: number;
  name: string | null;
  image_url: string | null;
  rules_text: string | null;
  rules_file_url: string | null;
  user_id: string | null;
  created_at: string | null;
  updated_at: string | null;
}

// Games Store
export const useGamesStore = defineStore('gamesStore', {
  state: () => {
    return {
      games: [] as Game[],
      isLoading: false,
      error: null as string | null,
    };
  },
  // In store
  getters: {
    getGames: (state) => state.games,
    getGameById: (state) => (id: number) => state.games.find((game) => game.id === id),
  },
  actions: {
    async fetchGames() {
      this.error = null;
      this.isLoading = true;
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
  },
});

// Add Game Dialog Store
export const useGamesAddDialogStore = defineStore('gamesAddDialogStore', {
  state: () => {
    return {
      isOpen: false,
      isLoading: false,
      error: null,
    };
  },
  actions: {
    async openAddGameDialog() {
      this.isOpen = true;
    },
  },
});
