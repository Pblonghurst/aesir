<template>
  <!-- Main Content -->
  <main class="max-w-7xl mx-auto px-6 py-8">
    <!-- Welcome Section -->
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h2>
      <p class="text-gray-600">Here's what's happening with your account today.</p>
    </div>

    <!-- Content Sections -->
  </main>
</template>

<script setup>
// Protect this page - redirect to login if not authenticated
definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
});
</script>
