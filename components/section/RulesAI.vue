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
            <Select v-model="gameDropdown">
              <SelectTrigger class="w-[180px] text-white bg-muted-700 border border-muted-600">
                <SelectValue placeholder="Select a game" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem v-for="game in games" :key="game.id" :value="game">
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
            <SpeechIcon />
            <p class="text-lg">Select a game and start asking about the rules!</p>
          </div>

          <!-- Messages -->
          <div v-for="(message, index) in messages" :key="index" class="flex flex-col gap-4">
            <!-- User message -->
            <div class="p-3 bg-muted-500 rounded-lg self-end">
              <p class="text-white">{{ questions[index] }}</p>
            </div>
            <!-- Assistant message -->
            <div class="p-[14px] bg-muted-700 rounded-lg self-start">
              <div class="text-white markdown-content" v-html="parseMarkdown(message)"></div>
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
          <Button
            variant="primary"
            :disabled="isLoading || !question"
            type="submit"
            class="h-[52px] w-[52px]"
          >
            Ask
          </Button>
        </form>
        <p class="text-muted-400 text-xs mt-2" v-if="!aiStore.selectedGame">
          Select a game first to start asking questions.
        </p>
        <p class="text-muted-500 text-xs mt-2" v-else>
          Game Selected:
          <span class="font-bold text-muted-300">{{ aiStore.selectedGame?.name }}</span>
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
import SpeechIcon from '@/components/ui/icons/speech.vue';

const gamesStore = useGamesStore();
const aiStore = useAiStore();
const games = computed(() => gamesStore.games);

// game selection - sync with store
const gameDropdown = computed({
  set: (value) => aiStore.setSelectedGame(value),
  get: () => aiStore.selectedGame,
});

// chat messages
const question = ref('');
const chatContainer = ref(null);

// Use store values
const isLoading = computed(() => aiStore.isLoading);
const messages = computed(() => aiStore.messages);
const questions = computed(() => aiStore.questions);

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
const handleAsk = async () => {
  if (!aiStore.selectedGame) {
    toast.error('Need to select a game', {});
    return;
  }
  if (!question.value) {
    return;
  }
  try {
    await aiStore.sendMessage(question.value, aiStore.selectedGame);
    scrollToBottom();
    question.value = '';
  } catch (error) {
    toast.error('Failed to send message. Please try again.');
  }
};
</script>

<!-- styles -->
<style scoped>
.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin: 0.5em 0;
  padding-left: 1.5em;
  list-style-type: disc;
}
</style>
