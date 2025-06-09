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
      <RulesAI />
      <!-- Sidebar -->
      <div class="space-y-6">
        <MyGames />
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
</script>
