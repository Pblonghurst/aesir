import { defineStore } from 'pinia';
import type { Database } from '~/types/supabase';

type Game = Database['public']['Tables']['games']['Row'];

// ai store
export const useAiStore = defineStore('aiStore', {
  state: () => {
    return {
      selectedGame: null as Game | null,
      isLoading: false,
      isFetched: false,
      error: null as string | null,
      messages: [] as string[],
      questions: [] as string[],
    };
  },
  actions: {
    // send message to AI
    async sendMessage(question: string, game: Game) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await $fetch('/api/auth/ai', {
          method: 'POST',
          body: { question, game_name: game.name, game_rules: game.rules_text },
        });
        this.messages.push(response);
        this.questions.push(question);
      } catch (error) {
        throw new Error('Failed to send message');
      } finally {
        this.isLoading = false;
      }
    },
    setSelectedGame(game: Game | null) {
      this.selectedGame = game;
    },
  },
});
