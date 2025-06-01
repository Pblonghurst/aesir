<template>
  <div class="max-w-7xl mx-auto px-6 py-20">
    <!-- Hero Section -->
    <SectionHeroLanding />

    <!-- Sign in/up form -->
    <FormLogin />

    <!-- Logged in state -->
    <div v-if="user" class="text-center">
      <div class="text-green-400 mb-4">
        <svg class="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <h3 class="text-xl font-semibold text-white mb-2">You're logged in!</h3>
      <p class="text-gray-400 mb-6">Ready to explore your dashboard?</p>
      <NuxtLink
        to="/dashboard"
        class="bg-primary-500 text-black bg-green-400 px-5 py-3 hover:bg-green-200 rounded-lg hover:bg-primary-600 transition-colors"
      >
        Go to Dashboard
      </NuxtLink>
    </div>

    <!-- pricing cards -->
    <!-- <SectionPricing /> -->
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
