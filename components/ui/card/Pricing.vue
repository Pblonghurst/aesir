<template>
  <div class="bg-white rounded-2xl shadow p-6 w-full max-w-sm flex flex-col justify-between">
    <div>
      <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ title }}</h3>
      <p class="text-4xl font-bold text-gray-800 mb-4">{{ price }}</p>
      <ul class="text-gray-700 space-y-2 mb-6">
        <li v-for="(feature, index) in features" :key="index">• {{ feature }}</li>
      </ul>
    </div>
    <button class="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl transition">
      {{ buttonLabel }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  price: String,
  features: Array,
  buttonLabel: String
})
</script>
