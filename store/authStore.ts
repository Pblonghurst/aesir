import { defineStore } from 'pinia';
import type { Database } from '~/types/supabase';

// profile type
type Profile = Database['public']['Tables']['profiles']['Row'];

// auth store
export const useAuthStore = defineStore('authStore', {
  state: () => {
    const supabaseUser = useSupabaseUser();
    return {
      user: supabaseUser,
      profile: null as Profile | null,
      loading: false,
      saveStatus: false,
      message: '',
      isFetched: false,
      messageType: 'success' as 'success' | 'error',
    };
  },
  actions: {
    // fetch profile
    async fetchProfile() {
      const supabaseClient = useSupabaseClient();
      const supabaseUser = useSupabaseUser();

      if (!supabaseUser.value || this.isFetched) return this.profile;
      this.isFetched = true;
      this.loading = true;
      try {
        const { data, error } = await supabaseClient
          .from('profiles')
          .select('*')
          .eq('id', supabaseUser.value.id)
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
      } finally {
        this.loading = false;
      }
    },
    // handle sign out
    async handleSignOut(redirectTo?: string) {
      const supabaseClient = useSupabaseClient();
      this.loading = true;
      try {
        const { error } = await supabaseClient.auth.signOut();
        if (error) {
          this.message = error.message;
          this.messageType = 'error';
          return { success: false, error: error.message };
        } else {
          if (redirectTo) {
            await navigateTo(redirectTo);
          }
          return { success: true };
        }
      } catch (err: any) {
        const errorMessage = 'An unexpected error occurred';
        this.message = errorMessage;
        this.messageType = 'error';
        return { success: false, error: errorMessage };
      } finally {
        this.loading = false;
      }
    },
    // handle sign in
    async handleSignIn(email: string, password: string, redirectTo?: string) {
      const supabaseClient = useSupabaseClient();
      this.loading = true;
      this.message = '';
      try {
        const { error } = await supabaseClient.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          this.message = error.message;
          this.messageType = 'error';
          return { success: false, error: error.message };
        } else {
          if (redirectTo) {
            await navigateTo(redirectTo);
          }
          return { success: true };
        }
      } catch (err: any) {
        const errorMessage = 'An unexpected error occurred';
        this.message = errorMessage;
        this.messageType = 'error';
        return { success: false, error: errorMessage };
      } finally {
        this.loading = false;
      }
    },
    // handle sign up
    async handleSignUp(email: string, password: string, redirectTo?: string) {
      const supabaseClient = useSupabaseClient();
      this.loading = true;
      this.message = '';
      try {
        // Try basic signup without metadata first
        const { error, data } = await supabaseClient.auth.signUp({
          email,
          password,
        });
        if (error) {
          this.message = error.message;
          this.messageType = 'error';
          return { success: false, error: error.message };
        } else {
          this.message = 'Check your email for verification link!';
          this.messageType = 'success';
          return { success: true, data };
        }
      } catch (err: any) {
        const errorMessage = 'An unexpected error occurred';
        this.message = errorMessage;
        this.messageType = 'error';
        return { success: false, error: errorMessage };
      } finally {
        this.loading = false;
      }
    },
    // update profile
    async updateProfile(formData: any) {
      this.loading = true;
      this.saveStatus = false;
      try {
        const response = await $fetch(`/api/auth/profiles/${this.user?.id}`, {
          method: 'PUT',
          body: {
            username: formData.username,
            first_name: formData.first_name,
            last_name: formData.last_name,
          },
        });
        if (response.success) {
          console.log('Profile was updated', response.profile);
          // Show success feedback
          this.saveStatus = true;
          setTimeout(() => {
            this.saveStatus = false;
          }, 1000);
        } else {
          console.error('Update failed', response);
        }
      } catch (error) {
        console.error('Update error:', error);
      } finally {
        this.loading = false;
      }
    },
    // clear message
    clearMessage() {
      this.message = '';
    },
    // Check if user is authenticated
    isAuthenticated() {
      return computed(() => !!this.user);
    },
  },
});
