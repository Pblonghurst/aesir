<template lang="">
  <!-- My Games -->
  <Card class="bg-gray-800/50 backdrop-blur-sm rounded-xl gap-4 border border-gray-700">
    <!-- Header -->
    <CardHeader class="flex items-center justify-between text-white">
      <CardTitle>My Games</CardTitle>
      <Button @click="dialogStore.openAddGameDialog()">Add Game</Button>
      <Button @click="test()"> test </Button>
    </CardHeader>
    <!-- Games List -->
    <CardContent class="flex flex-col gap-4">
      <!-- Loading State -->
      <div v-if="gamesStore.isLoading" class="flex items-center justify-center py-8">
        <Spinner size="lg" variant="primary" />
      </div>

      <!-- Error State -->
      <div v-else-if="gamesStore.error" class="text-red-400 text-center py-4">
        {{ gamesStore.error }}
      </div>

      <!-- Empty State -->
      <div v-else-if="games.length === 0" class="text-center py-8 text-gray-400">
        <p>No games found. Create your first game!</p>
      </div>

      <!-- Games List -->
      <div
        v-else
        v-for="game in games"
        :key="game.id"
        class="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer"
        @click="selectedGame = game.id"
        :class="selectedGame === game.id ? 'ring-2 ring-purple-500' : ''"
      >
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
import { useGamesStore, useGamesAddDialogStore } from '@/store/gamesStore';

const dialogStore = useGamesAddDialogStore();
const gamesStore = useGamesStore();

const selectedGame = ref(null);
const games = computed(() => gamesStore.getGames);

const test = () => {
  gamesStore.isLoading = true;
};
</script>
