<template lang="">
  <!-- My Games -->
  <Card class="bg-gray-800/50 backdrop-blur-sm rounded-xl gap-4 border border-gray-700">
    <CardHeader class="flex items-center justify-between text-white">
      <CardTitle>My Games</CardTitle>
      <Button>Add Game</Button>
    </CardHeader>
    <CardContent class="flex flex-col gap-4">
      <div
        v-for="game in games"
        :key="game.id"
        class="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer"
        @click="selectedGame = game.id"
        :class="selectedGame === game.id ? 'ring-2 ring-purple-500' : ''"
      >
        <img :src="game.image" :alt="game.name" class="w-10 h-10 rounded object-cover" />
        <div class="flex-1 min-w-0">
          <p class="font-medium text-white truncate">{{ game.name }}</p>
          <p class="text-xs text-gray-400">{{ game.questionsAsked }} questions</p>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
<script setup>
// Sample board games data
const selectedGame = ref('');

const games = ref([
  {
    id: 1,
    name: 'Settlers of Catan',
    image:
      'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=64&h=64&fit=crop&crop=center',
    questionsAsked: 15,
    rulesContext: 'Catan rules context loaded...',
  },
  {
    id: 2,
    name: 'Monopoly',
    image:
      'https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?w=64&h=64&fit=crop&crop=center',
    questionsAsked: 8,
    rulesContext: 'Monopoly rules context loaded...',
  },
  {
    id: 3,
    name: 'Scrabble',
    image:
      'https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=64&h=64&fit=crop&crop=center',
    questionsAsked: 12,
    rulesContext: 'Scrabble rules context loaded...',
  },
]);
</script>
