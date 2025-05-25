// composables/useAuth.ts
export const useAuth = () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  // Reactive state for UI feedback
  const loading = ref(false);
  const message = ref('');
  const messageType = ref<'success' | 'error'>('success');

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
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: options?.metadata || {},
        },
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

  // Get user profile data
  const getUserProfile = computed(() => {
    if (!user.value) return null;
    return {
      id: user.value.id,
      email: user.value.email,
      metadata: user.value.user_metadata,
      createdAt: user.value.created_at,
    };
  });

  return {
    // State
    user,
    loading: readonly(loading),
    message: readonly(message),
    messageType: readonly(messageType),
    isAuthenticated,
    getUserProfile,

    // Methods
    handleLogin,
    handleSignUp,
    handleSignOut,
    clearMessage,
  };
};
