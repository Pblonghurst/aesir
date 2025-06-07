<template>
  <div class="max-w-7xl mx-auto px-6 py-20">
    <!-- Hero Section -->
    <HeroLanding />

    <!-- Sign in/up form -->
    <Login />

    <!-- Logged in state -->
    <div v-if="user" class="text-center">
      <div class="text-green-400 mb-4">
        <svg class="w-10 h-10 mx-auto" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <h3 class="text-xl font-semibold text-white mb-2">You're logged in!</h3>
      <p class="text-gray-400 mb-6">Ready to explore your dashboard?</p>
      <Button @click="navigateTo('/dashboard')">Go to Dashboard</Button>
    </div>

    <!-- pricing cards -->
  </div>
</template>

<script setup>
// Page meta
definePageMeta({
  layout: 'default',
});
// Use the global auth composable
const { user } = useAuth();
</script>
