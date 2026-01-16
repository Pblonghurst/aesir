<template>
  <div class="relative min-h-[60vh] flex flex-col items-center justify-center mb-12">
    <!-- Main heading -->
    <div class="flex flex-col items-center justify-center gap-8 text-center">
      <!-- pill -->
      <div
        class="bg-muted-800/40 backdrop-blur-sm rounded-full p-2 border border-muted-400/50 text-brand-400 text-sm px-3 py-1 flex items-center justify-center gap-2"
      >
        <SparklesIcon class="w-4 h-4 text-brand-400 mx-auto" />
        AI-Powered Rule Mastery
      </div>
      <!-- title -->
      <h1
        class="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white max-w-4xl mx-auto"
      >
        Master Complexity with
        <span
          class="bg-gradient-to-r from-brand-300 via-brand-400 to-brand-500 bg-clip-text text-transparent"
          >Aesir</span
        >
      </h1>
    </div>

    <!-- Description -->
    <div class="mt-8 text-center">
      <p
        class="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed"
      >
        Upload complex rulesets, manuals, or documentation. Chat with our AI to get instant,
        accurate clarifications and examples.
      </p>
    </div>

    <!-- Logged in state -->
    <div class="mt-12 flex justify-center gap-4" v-if="!loginVisible">
      <Button
        size="lg"
        class="mb-32 bg-gradient-to-r from-brand-300 via-brand-400 to-brand-500 text-black font-bold text-lg px-8 py-6 rounded-xl hover:from-brand-400 hover:via-brand-500 hover:to-brand-600 transition-all duration-300 hover:scale-105 border border-brand-400/50"
        @click="handleSignInClick()"
      >
        <span v-if="!user">Sign In</span>
        <span v-else>Go to Dashboard</span>
      </Button>

      <Button
        size="lg"
        class="mb-32 bg-gradient-to-r from-brand-300 via-brand-400 to-brand-500 text-black font-bold text-lg px-8 py-6 rounded-xl hover:from-brand-400 hover:via-brand-500 hover:to-brand-600 transition-all duration-300 hover:scale-105 border border-brand-400/50"
        @click="handleSignUpClick()"
        v-if="!user"
      >
        Sign Up
      </Button>
    </div>

    <!-- Sign in/up form -->
    <Login v-if="loginVisible" :default-tab="defaultTab" />

    <!-- Feature highlights -->
    <div
      class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-24 border-t border-muted-700/50 text-center max-[700px]:pt-12"
    >
      <div
        class="bg-muted-800/40 backdrop-blur-sm rounded-xl p-8 border border-muted-700/50 hover:border-brand-400/50 transition-all duration-300 hover:scale-105"
      >
        <ZapIcon class="w-10 h-10 text-brand-400 mx-auto mb-6 bg-brand-400/10 rounded-sm p-2" />
        <h3 class="text-xl font-semibold text-white mb-3">Instant Answers</h3>
        <p class="text-white/70">Get quick, accurate responses to your game rules questions</p>
      </div>
      <div
        class="bg-muted-800/40 backdrop-blur-sm rounded-xl p-8 border border-muted-700/50 hover:border-brand-400/50 transition-all duration-300 hover:scale-105"
      >
        <BookOpenIcon
          class="w-10 h-10 text-brand-400 mx-auto mb-6 bg-brand-400/10 rounded-sm p-2"
        />
        <h3 class="text-xl font-semibold text-white mb-3">Game Library</h3>
        <p class="text-white/70">Access rules for all your favorite board games in one place</p>
      </div>
      <div
        class="bg-muted-800/40 backdrop-blur-sm rounded-xl p-8 border border-muted-700/50 hover:border-brand-400/50 transition-all duration-300 hover:scale-105"
      >
        <BrainIcon class="w-10 h-10 text-brand-400 mx-auto mb-6 bg-brand-400/10 rounded-sm p-2" />
        <h3 class="text-xl font-semibold text-white mb-3">AI-Powered</h3>
        <p class="text-white/70">Smart assistance that understands context and nuance</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ZapIcon, BookOpenIcon, BrainIcon, SparklesIcon } from 'lucide-vue-next';
import { useAuthStore } from '@/store/authStore';
const authStore = useAuthStore();

const loginVisible = ref(false);
const defaultTab = ref('login');

// Use the global auth composable
const user = computed(() => authStore.user);

// handle sign in click
const handleSignInClick = () => {
  if (!user.value) {
    defaultTab.value = 'login';
    loginVisible.value = true;
  } else {
    navigateTo('/dashboard');
  }
};

// handle sign up click
const handleSignUpClick = () => {
  defaultTab.value = 'signup';
  loginVisible.value = true;
};
</script>
