// composables/useAuth.ts
export const useAuth = () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  // Reactive state for UI feedback
  const loading = ref(false);
  const message = ref('');
  const messageType = ref<'success' | 'error'>('success');
  const profile = ref<any>(null);

  // Fetch user profile
  const fetchProfile = async () => {
    if (!user.value) return null;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.value.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      profile.value = data;
      return data;
    } catch (err) {
      console.error('Error fetching profile:', err);
      return null;
    }
  };

  // Watch for user changes and fetch profile
  watch(
    user,
    async (newUser) => {
      if (newUser) {
        await fetchProfile();
      } else {
        profile.value = null;
      }
    },
    { immediate: true }
  );

  // handle login
  const handleLogin = async (email: string, password: string, redirectTo?: string) => {
    loading.value = true;
    message.value = '';

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        message.value = error.message;
        messageType.value = 'error';
        return { success: false, error: error.message };
      } else {
        if (redirectTo) {
          await navigateTo(redirectTo);
        }
        return { success: true };
      }
    } catch (err: any) {
      const errorMessage = 'An unexpected error occurred';
      message.value = errorMessage;
      messageType.value = 'error';
      return { success: false, error: errorMessage };
    } finally {
      loading.value = false;
    }
  };

  // handle sign up
  const handleSignUp = async (
    email: string,
    password: string,
    options?: {
      redirectTo?: string;
      metadata?: Record<string, any>;
    }
  ) => {
    loading.value = true;
    message.value = '';

    try {
      // Try basic signup without metadata first
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        message.value = error.message;
        messageType.value = 'error';
        return { success: false, error: error.message };
      } else {
        message.value = 'Check your email for verification link!';
        messageType.value = 'success';
        return { success: true, data };
      }
    } catch (err: any) {
      const errorMessage = 'An unexpected error occurred';
      message.value = errorMessage;
      messageType.value = 'error';
      return { success: false, error: errorMessage };
    } finally {
      loading.value = false;
    }
  };

  // handle sign out
  const handleSignOut = async (redirectTo?: string) => {
    loading.value = true;

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        message.value = error.message;
        messageType.value = 'error';
        return { success: false, error: error.message };
      } else {
        if (redirectTo) {
          await navigateTo(redirectTo);
        }
        return { success: true };
      }
    } catch (err: any) {
      const errorMessage = 'An unexpected error occurred';
      message.value = errorMessage;
      messageType.value = 'error';
      return { success: false, error: errorMessage };
    } finally {
      loading.value = false;
    }
  };

  const clearMessage = () => {
    message.value = '';
  };

  // Check if user is authenticated
  const isAuthenticated = computed(() => !!user.value);

  return {
    // State
    user,
    profile: readonly(profile),
    loading: readonly(loading),
    message: readonly(message),
    messageType: readonly(messageType),
    isAuthenticated,

    // Methods
    handleLogin,
    handleSignUp,
    handleSignOut,
    clearMessage,
    fetchProfile,
  };
};
