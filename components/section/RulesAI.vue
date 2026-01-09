<template lang="">
  <!-- Rules AI -->
  <div class="lg:col-span-3">
    <div
      class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 h-[600px] flex flex-col"
    >
      <!-- Chat Header -->
      <div class="p-6 border-b border-gray-700">
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-bold text-white">Board Game Rules Assistant</h3>
          <div class="flex items-center gap-3">
            <!-- Game Selection Dropdown -->
            <Select v-model="selectedGame">
              <SelectTrigger class="w-[180px] text-white bg-gray-700 border border-gray-600">
                <SelectValue placeholder="Select a game" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem v-for="game in games" :key="game.id" :value="game.id">
                    {{ game.name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <!-- Chat Messages -->
      <div class="flex-1 overflow-y-auto p-6 space-y-4" ref="chatContainer">
        <div class="text-center text-gray-400 mt-20">
          <svg
            class="w-16 h-16 mx-auto mb-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-3.165-.6l-4.658 1.329a1 1 0 01-1.242-1.242l1.329-4.658A8.955 8.955 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z"
            />
          </svg>
          <p class="text-lg">Select a game and start asking about the rules!</p>
          <p class="text-sm mt-2">
            Try asking: "How do I set up the game?" or "What happens when I roll a 6?"
          </p>
        </div>
      </div>

      <!-- Chat Input -->
      <div class="p-6 border-t border-gray-700">
        <form class="flex gap-3">
          <input
            type="text"
            placeholder="Ask about game rules... (e.g., 'How do I win?' or 'What's the setup?')"
            class="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500 h-[36px]"
          />
          <Button>Send</Button>
        </form>
        <p class="text-gray-400 text-xs mt-2" v-if="!chosenGame">
          Select a game first to start asking questions
        </p>
        <p class="text-gray-300 text-xs mt-2" v-else>
          Selected: <span class="font-semibold">{{ chosenGame?.name }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useGamesStore } from '@/store/gamesStore';
import { TableColumnsSplitIcon } from 'lucide-vue-next';

const gamesStore = useGamesStore();
const games = computed(() => gamesStore.games);
const selectedGame = ref('');

// Computed property to get the full game object from the selected ID
const chosenGame = computed(() => {
  if (!selectedGame.value) return null;
  return games.value.find((g) => g.id === selectedGame.value);
});

// Add your methods here
const sendMessage = () => {
  // Add your send message functionality
};

const clearChat = () => {
  // Add your clear chat functionality
};
</script>
