<template>
  <!-- Main Content -->
  <main class="max-w-7xl mx-auto py-8">
    <!-- Welcome Section -->
    <!-- <div class="mb-8">
      <h2 class="text-3xl font-bold text-white mb-2">Welcome back, {{ user?.email }}!</h2>
      <p class="text-white/80">Ask questions about your board game rules with AI assistance.</p>
    </div> -->

    <!-- AI Chat Interface - Main Focus -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- AI Chat Section (Main Focus) -->
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
                <select
                  v-model="selectedGame"
                  class="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
                >
                  <option value="">Select a game...</option>
                  <option v-for="game in games" :key="game.id" :value="game.id">
                    {{ game.name }}
                  </option>
                </select>
                <button
                  @click="clearChat"
                  class="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                >
                  Clear Chat
                </button>
              </div>
            </div>
            <div
              v-if="selectedGameData"
              class="flex items-center gap-3 mt-3 p-3 bg-gray-700/50 rounded-lg"
            >
              <img
                :src="selectedGameData.image"
                :alt="selectedGameData.name"
                class="w-8 h-8 rounded object-cover"
              />
              <span class="text-white font-medium">{{ selectedGameData.name }}</span>
              <span class="text-gray-400 text-sm">• Rules loaded</span>
            </div>
          </div>

          <!-- Chat Messages -->
          <div class="flex-1 overflow-y-auto p-6 space-y-4" ref="chatContainer">
            <div v-if="chatMessages.length === 0" class="text-center text-gray-400 mt-20">
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

            <div
              v-for="message in chatMessages"
              :key="message.id"
              class="flex gap-3"
              :class="message.isUser ? 'justify-end' : 'justify-start'"
            >
              <div
                v-if="!message.isUser"
                class="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold"
              >
                AI
              </div>
              <div
                :class="[
                  'max-w-[70%] p-4 rounded-lg',
                  message.isUser
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700/70 text-white border border-gray-600',
                ]"
              >
                <p class="whitespace-pre-wrap">{{ message.content }}</p>
                <span class="text-xs opacity-70 mt-2 block">{{
                  formatTime(message.timestamp)
                }}</span>
              </div>
              <div
                v-if="message.isUser"
                class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold"
              >
                U
              </div>
            </div>

            <div v-if="isTyping" class="flex gap-3">
              <div
                class="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold"
              >
                AI
              </div>
              <div class="bg-gray-700/70 text-white border border-gray-600 p-4 rounded-lg">
                <div class="flex space-x-1">
                  <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style="animation-delay: 0.2s"
                  ></div>
                  <div
                    class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style="animation-delay: 0.4s"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Chat Input -->
          <div class="p-6 border-t border-gray-700">
            <form @submit.prevent="sendMessage" class="flex gap-3">
              <input
                v-model="currentMessage"
                type="text"
                placeholder="Ask about game rules... (e.g., 'How do I win?' or 'What's the setup?')"
                class="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                :disabled="!selectedGame || isTyping"
              />
              <button
                type="submit"
                :disabled="!currentMessage.trim() || !selectedGame || isTyping"
                class="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
                Send
              </button>
            </form>
            <p class="text-gray-400 text-xs mt-2" v-if="!selectedGame">
              Select a game first to start asking questions
            </p>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- My Games -->
        <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold text-white">My Games</h3>
            <button
              @click="showAddGameModal = true"
              class="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add
            </button>
          </div>

          <div class="space-y-3 max-h-60 overflow-y-auto">
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
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
const { user } = useAuth();

// Protect this page - redirect to login if not authenticated
definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
});

// Reactive data
const showAddGameModal = ref(false);
const selectedGame = ref('');
const currentMessage = ref('');
const isTyping = ref(false);
const chatContainer = ref(null);

const newGame = ref({
  name: '',
  image: '',
  rulesFile: null,
});

const chatMessages = ref([]);

// Sample board games data
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

const recentQuestions = ref([
  { id: 1, text: 'How do I trade resources?', game: 'Catan', timestamp: Date.now() - 300000 },
  {
    id: 2,
    text: 'What happens when I land on Go?',
    game: 'Monopoly',
    timestamp: Date.now() - 600000,
  },
  { id: 3, text: 'Can I use proper nouns?', game: 'Scrabble', timestamp: Date.now() - 900000 },
]);

// Computed properties
const selectedGameData = computed(() => {
  return games.value.find((game) => game.id === selectedGame.value);
});

const totalQuestions = computed(() => {
  return games.value.reduce((sum, game) => sum + game.questionsAsked, 0);
});

const sessions = ref(24);

// Add your methods here
const sendMessage = () => {
  // Add your send message functionality
};

const clearChat = () => {
  // Add your clear chat functionality
};

const handleFileUpload = (event) => {
  // Add your file upload handling
};

const addGame = () => {
  // Add your add game functionality
};

const formatTime = (timestamp) => {
  // Add your time formatting
  return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
</script>
