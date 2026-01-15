<template>
  <div class="relative min-h-[60vh] flex items-center justify-center mb-12 overflow-hidden">
    <!-- Content container -->
    <div class="relative z-10 text-center max-w-4xl mx-auto">
      <!-- Main heading with gradient text -->
      <h1
        class="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 bg-clip-text text-transparent animate-fade-in"
      >
        Aesir
      </h1>

      <!-- Subtitle -->
      <h2 class="text-3xl md:text-4xl font-semibold mb-8 text-white/90">
        Your AI-Powered Game Rules Assistant
      </h2>

      <!-- Description -->
      <div class="bg-gray-800/60 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 mb-8">
        <p class="text-lg md:text-xl text-white/90 leading-relaxed mb-4">
          Aesir helps you navigate the complex world of board games and tabletop gaming. Get instant
          answers to your game rules questions, clarify confusing mechanics, and master any game
          with the help of AI.
        </p>
        <p class="text-base md:text-lg text-white/70">
          Whether you're learning a new game or settling a rules dispute, Aesir is here to assist
          you every step of the way.
        </p>
      </div>

      <!-- Feature highlights -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div
          class="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-orange-400/50 transition-all duration-300 hover:scale-105"
        >
          <ZapIcon class="w-8 h-8 text-orange-400 mx-auto mb-3" />
          <h3 class="text-lg font-semibold text-white mb-2">Instant Answers</h3>
          <p class="text-sm text-white/70">
            Get quick, accurate responses to your game rules questions
          </p>
        </div>
        <div
          class="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-orange-400/50 transition-all duration-300 hover:scale-105"
        >
          <BookOpenIcon class="w-8 h-8 text-orange-400 mx-auto mb-3" />
          <h3 class="text-lg font-semibold text-white mb-2">Game Library</h3>
          <p class="text-sm text-white/70">
            Access rules for all your favorite board games in one place
          </p>
        </div>
        <div
          class="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-orange-400/50 transition-all duration-300 hover:scale-105"
        >
          <BrainIcon class="w-8 h-8 text-orange-400 mx-auto mb-3" />
          <h3 class="text-lg font-semibold text-white mb-2">AI-Powered</h3>
          <p class="text-sm text-white/70">Smart assistance that understands context and nuance</p>
        </div>
      </div>

      <!-- Logged in state -->
      <div class="mt-12 flex justify-center">
        <Button
          size="lg"
          class="bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 text-black font-bold text-lg px-8 py-6 rounded-xl hover:from-orange-400 hover:via-orange-500 hover:to-orange-600 transition-all duration-300 hover:scale-105 border border-orange-400/50"
          @click="navigateTo('/dashboard')"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ZapIcon, BookOpenIcon, BrainIcon } from 'lucide-vue-next';
import { useAuthStore } from '@/store/authStore';
const authStore = useAuthStore();
// Use the global auth composable
const user = computed(() => authStore.user);
</script>
