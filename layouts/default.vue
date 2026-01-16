<template>
  <div class="min-h-screen animated-gradient">
    <HeaderLanding />
    <slot />
    <Footer />
  </div>
</template>

<script setup></script>

<style scoped>
.animated-gradient {
  background: linear-gradient(-45deg, #0a0e14, #0d1117, #0f1419, #0a0e14);
  background-size: 400% 400%;
  animation: gradient-shift 15s ease infinite;
}

@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
