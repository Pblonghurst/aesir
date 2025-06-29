import { defineStore } from 'pinia';
import type { Database } from '@/types/supabase';
import type { User } from '@supabase/supabase-js';

// supabase client and user
const supabaseClient = useSupabaseClient();
const userSupabase = useSupabaseUser();

// profile type
type Profile = Database['public']['Tables']['profiles']['Row'];

// auth store
export const useAuthStore = defineStore('authStore', {
  state: () => {
    return {
      user: userSupabase,
      profile: null as Profile | null,
      loading: false,
      message: '',
      messageType: 'success' as 'success' | 'error',
    };
  },
  actions: {
    async fetchProfile() {
      if (!userSupabase.value) return null;
      try {
        const { data, error } = await supabaseClient
          .from('profiles')
          .select('*')
          .eq('id', userSupabase.value.id)
          .single();
        if (error) {
          console.error('Error fetching profile:', error);
          return null;
        }
        this.profile = data;
        return data;
      } catch (err) {
        console.error('Error fetching profile:', err);
        return null;
      }
    },
  },
});
