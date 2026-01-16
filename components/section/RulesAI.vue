<template lang="">
  <!-- Rules AI -->
  <div class="lg:col-span-3">
    <div
      class="bg-muted-800/50 backdrop-blur-sm rounded-xl border border-muted-700 h-[calc(100vh-164px)] flex flex-col relative"
    >
      <!-- Loading -->
      <div
        v-if="isLoading"
        class="flex justify-center items-center h-full absolute top-0 left-0 w-full bg-muted-800/50 backdrop-blur-sm rounded-xl border border-muted-700 z-10"
      >
        <Spinner size="xl" variant="primary" />
      </div>
      <!-- Chat Header -->
      <div class="p-6 border-b border-muted-700">
        <div class="flex items-center justify-between flex-wrap gap-4">
          <h3 class="text-xl font-bold text-white">Game Rules Assistant</h3>
          <div class="flex items-center gap-3">
            <!-- Game Selection Dropdown -->
            <Select v-model="selectedGame">
              <SelectTrigger class="w-[180px] text-white bg-muted-700 border border-muted-600">
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
      <div class="flex-1 overflow-y-auto min-h-0 hide-scrollbar relative" ref="chatContainer">
        <div class="p-6 space-y-4 min-h-full flex flex-col justify-end">
          <!-- No messages -->
          <div
            class="text-center text-muted-400 flex flex-col items-center justify-center absolute inset-0 p-4"
            v-if="messages.length === 0 && !isLoading"
          >
            <svg class="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
              <defs>
                <linearGradient id="brand-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color: #fdba74; stop-opacity: 1" />
                  <stop offset="50%" style="stop-color: #fb923c; stop-opacity: 1" />
                  <stop offset="100%" style="stop-color: #f97316; stop-opacity: 1" />
                </linearGradient>
              </defs>
              <path
                stroke="url(#brand-gradient)"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.955 8.955 0 01-3.165-.6l-4.658 1.329a1 1 0 01-1.242-1.242l1.329-4.658A8.955 8.955 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z"
              />
            </svg>
            <p class="text-lg">Select a game and start asking about the rules!</p>
          </div>

          <!-- Test Messages -->
          <!-- <div v-for="i in 5" :key="i" class="text-item flex flex-col gap-4">
            <div class="p-4 bg-muted-700 rounded-lg self-end">
              <p class="text-white">what is a fish?</p>
            </div>

            <div class="p-4 bg-muted-700 rounded-lg self-start">
              <p class="text-white">
                OpenAI has many different models and several APIs to choose from. Reasoning models,
                like o3 and GPT-5, behave differently from chat models and respond better to
                different prompts. One important note is that reasoning models perform better and
                demonstrate higher intelligence when used with the Responses API.
              </p>
            </div>
          </div>
           -->
          <!-- Messages -->
          <div v-for="(message, index) in messages" :key="index" class="flex flex-col gap-4">
            <!-- User message -->
            <div class="p-3 bg-muted-500 rounded-lg self-end">
              <p class="text-white">{{ questions[index] }}</p>
            </div>
            <!-- Assistant message -->
            <div class="p-[14px] bg-muted-700 rounded-lg self-start">
              <div
                class="text-white markdown-content"
                v-html="parseMarkdown(message.content)"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Chat Input -->
      <div class="p-6 border-t border-muted-700">
        <form class="flex gap-3" @submit.prevent="handleAsk">
          <input
            v-model="question"
            type="text"
            placeholder="Ask about game rules..."
            class="flex-1 bg-muted-700 border-2 border-muted-500 rounded-lg px-3 py-6 text-white focus:outline-none focus:border-brand-400 h-[36px]"
          />
          <Button :disabled="isLoading || !question" type="submit" class="h-[52px] w-[52px]">
            Ask
          </Button>
        </form>
        <p class="text-muted-400 text-xs mt-2" v-if="!chosenGame">
          Select a game first to start asking questions.
        </p>
        <p class="text-muted-500 text-xs mt-2" v-else>
          Game Selected: <span class="font-bold text-muted-300">{{ chosenGame?.name }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useGamesStore } from '@/store/gamesStore';
import { useAiStore } from '@/store/aiStore';
import { toast } from 'vue-sonner';
import { marked } from 'marked';

const gamesStore = useGamesStore();
const aiStore = useAiStore();
const games = computed(() => gamesStore.games);

// game selection - sync with store
const selectedGame = computed({
  get: () => aiStore.selectedGameId,
  set: (value) => aiStore.setSelectedGame(value),
});

// chat messages
const messages = ref([]);
const question = ref('');
const questions = ref([]);
const isLoading = ref(false);
const error = ref(null);
const chatContainer = ref(null);

// Computed property to get the full game object from the selected ID
const chosenGame = computed(() => {
  if (!selectedGame.value) return null;
  return games.value.find((g) => g.id === selectedGame.value);
});

// Function to parse markdown to HTML
const parseMarkdown = (text) => {
  if (!text) return '';
  return marked.parse(text);
};

// Function to scroll chat container to bottom
const scrollToBottom = () => {
  nextTick(() => {
    chatContainer.value?.scrollTo({ top: chatContainer.value.scrollHeight, behavior: 'smooth' });
  });
};

// Handle ask button click
const handleAsk = () => {
  if (!chosenGame.value) {
    toast.error('Need to select a game', {});
    return;
  }
  if (!question.value) {
    return;
  }
  sendMessage(question.value);
  question.value = '';
};

// send message to AI
const sendMessage = async (question) => {
  try {
    isLoading.value = true;
    error.value = null;
    const response = await $fetch(`/api/auth/ai`, {
      method: 'POST',
      body: {
        question,
        game_name: chosenGame.value.name,
        game_rules: chosenGame.value.rules_text,
      },
    });
    // add the response to the messages
    messages.value.push({ content: response });
    questions.value.push(question);
  } catch (err) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
    scrollToBottom();
    console.log('questions', questions.value);
    console.log('response', chosenGame.value.name, chosenGame.value.rules_text);
  }
};
</script>

<!-- styles -->
<style scoped>
.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin: 0.5em 0 !;
  padding-left: 1.5em;
  list-style-type: disc;
}
</style>
