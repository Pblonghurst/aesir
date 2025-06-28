<template lang="">
  <!-- My Games -->
  <Card class="bg-gray-800/50 backdrop-blur-sm rounded-xl gap-4 border border-gray-700">
    <!-- Header -->
    <CardHeader class="flex items-center justify-between text-white">
      <CardTitle>My Games</CardTitle>
      <Button @click="dialogStore.openAddGameDialog()">Add Game</Button>
    </CardHeader>
    <!-- Games List -->
    <CardContent class="flex flex-col gap-4">
      <!-- Loading State -->
      <div v-if="gamesStore.isLoading" class="flex items-center justify-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
        <span class="ml-2 text-gray-400">Loading games...</span>
      </div>

      <!-- Error State -->
      <div v-else-if="gamesStore.error" class="text-red-400 text-center py-4">
        {{ gamesStore.error }}
      </div>

      <!-- Empty State -->
      <div v-else-if="gamesStore.getGames.length === 0" class="text-center py-8 text-gray-400">
        <p>No games found. Create your first game!</p>
      </div>

      <!-- Games List -->
      <div
        v-else
        v-for="game in gamesStore.getGames"
        :key="game.id"
        class="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer"
        @click="selectedGame = game.id"
        :class="selectedGame === game.id ? 'ring-2 ring-purple-500' : ''"
      >
        <img
          :src="game.image_url || '/placeholder-game.png'"
          :alt="game.name"
          class="w-10 h-10 rounded object-cover"
        />
        <div class="flex-1 min-w-0">
          <p class="font-medium text-white truncate">{{ game.name }}</p>
          <p class="text-xs text-gray-400">Game</p>
        </div>
      </div>
    </CardContent>
  </Card>

  <!-- Add Game Dialog -->
  <AddGame />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useGamesStore, useGamesAddDialogStore } from '@/store/gamesStore';

const gamesStore = useGamesStore();
const dialogStore = useGamesAddDialogStore();
const selectedGame = ref(null);

// Manual fetch function
const manualFetch = async () => {
  try {
    const response = await fetch('/api/auth/games');
    const data = await response.json();
    console.log('Manual fetch data:', data);
  } catch (error) {
    console.error('Manual fetch error:', error);
  }
};

onMounted(() => {
  gamesStore.fetchGames();
  manualFetch(); // Call manual fetch on mount
});
</script>
