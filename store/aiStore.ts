import { defineStore } from 'pinia';
import type { Database } from '~/types/supabase';

// ai type
type Ai = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  rules_text: string;
  rules_file_url: string;
};

// auth store
export const useAiStore = defineStore('aiStore', {
  state: () => {
    return {
      ai: null as Ai | null,
      isLoading: false,
      isFetched: false,
      error: null as string | null,
    };
  },
  actions: {},
});
