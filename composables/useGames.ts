export const useGames = () => {
  const supabase = useSupabaseClient();
  const { user } = useAuth();
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Fetch all games for the current user
  const fetchGames = async () => {
    if (!user.value) return null;
    loading.value = true;
    error.value = null;

    try {
      const data = await $fetch('/api/auth/games');
      return data;
    } catch (err: any) {
      error.value = err.message;
      return null;
    } finally {
      loading.value = false;
    }
  };

  // Fetch a single game by ID
  const fetchGame = async (id: number) => {
    if (!user.value) return null;
    loading.value = true;
    error.value = null;

    try {
      const data = await $fetch(`/api/auth/games/${id}`);
      return data;
    } catch (err: any) {
      error.value = err.message;
      return null;
    } finally {
      loading.value = false;
    }
  };

  // Create a new game
  const createGame = async (gameData: {
    name: string;
    image_url?: string;
    rules_text?: string;
    rules_file_url?: string;
  }) => {
    if (!user.value) return null;
    loading.value = true;
    error.value = null;

    try {
      const data = await $fetch('/api/auth/games', {
        method: 'POST',
        body: gameData,
      });
      return data;
    } catch (err: any) {
      error.value = err.message;
      return null;
    } finally {
      loading.value = false;
    }
  };

  // Update a game
  const updateGame = async (
    id: number,
    gameData: {
      name?: string;
      image_url?: string;
      rules_text?: string;
      rules_file_url?: string;
    }
  ) => {
    if (!user.value) return null;
    loading.value = true;
    error.value = null;

    try {
      const data = await $fetch(`/api/auth/games/${id}`, {
        method: 'PUT',
        body: gameData,
      });
      return data;
    } catch (err: any) {
      error.value = err.message;
      return null;
    } finally {
      loading.value = false;
    }
  };

  // Delete a game
  const deleteGame = async (id: number) => {
    if (!user.value) return null;
    loading.value = true;
    error.value = null;

    try {
      await $fetch(`/api/auth/games/${id}`, {
        method: 'DELETE',
      });
      return true;
    } catch (err: any) {
      error.value = err.message;
      return false;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading: readonly(loading),
    error: readonly(error),
    fetchGames,
    fetchGame,
    createGame,
    updateGame,
    deleteGame,
  };
};
