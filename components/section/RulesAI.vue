<template lang="">
  <!-- Rules AI -->
  <div class="lg:col-span-3">
    <div
      class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 h-[calc(100vh-164px)] flex flex-col"
    >
      <!-- Chat Header -->
      <div class="p-6 border-b border-gray-700">
        <div class="flex items-center justify-between flex-wrap gap-4">
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
        <!-- No messages -->
        <div
          class="text-center text-gray-400 mt-20 h-[calc(100%-164px)] flex flex-col items-center justify-center"
          v-if="messages.length === 0"
        >
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

        <!-- Messages -->
        <div v-for="message in messages" :key="message.id">
          <div v-if="message.role === 'assistant'">
            <p class="text-white">{{ message.content }}</p>
          </div>
          <div v-else>
            <p class="text-orange-500">{{ message.content }}</p>
          </div>
        </div>
      </div>

      <!-- Chat Input -->
      <div class="p-6 border-t border-gray-700">
        <form class="flex gap-3">
          <input
            v-model="question"
            type="text"
            placeholder="Ask about game rules... (e.g., 'How do I win?' or 'What's the setup?')"
            class="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500 h-[36px]"
          />
          <Button type="button" @click="sendMessage(question)">Send</Button>
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

const gamesStore = useGamesStore();
const games = computed(() => gamesStore.games);

// game selection
const selectedGame = ref('');

// chat messages
const messages = ref([]);
const question = ref('');
const isLoading = ref(false);
const error = ref(null);

// Computed property to get the full game object from the selected ID
const chosenGame = computed(() => {
  if (!selectedGame.value) return null;
  return games.value.find((g) => g.id === selectedGame.value);
});

const test = () => {
  console.log(question.value);
};
// Add your methods here
const sendMessage = async (question) => {
  try {
    isLoading.value = true;
    error.value = null;
    const response = await $fetch(`/api/auth/ai`, {
      method: 'POST',
      body: {
        question,
      },
    });
    // add the response to the messages
    messages.value.push({ role: 'assistant', content: response });
  } catch (err) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
};
</script>
