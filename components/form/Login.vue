<template lang="">
  <!-- Auth Forms -->
  <div v-if="!user" class="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
    <div class="flex mb-6">
      <button
        @click="activeTab = 'login'"
        :class="activeTab === 'login' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'"
        class="flex-1 py-2 px-4 rounded-l-lg font-medium transition-colors"
      >
        Login
      </button>
      <button
        @click="activeTab = 'signup'"
        :class="activeTab === 'signup' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'"
        class="flex-1 py-2 px-4 rounded-r-lg font-medium transition-colors"
      >
        Sign Up
      </button>
    </div>

    <!-- Login Form -->
    <form v-if="activeTab === 'login'" @submit.prevent="onLogin" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          v-model="loginForm.email"
          type="email"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          v-model="loginForm.password"
          type="password"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your password"
        />
      </div>
      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {{ loading ? 'Signing in...' : 'Sign In' }}
      </button>
    </form>

    <!-- Signup Form -->
    <form v-if="activeTab === 'signup'" @submit.prevent="onSignUp" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          v-model="signupForm.email"
          type="email"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          v-model="signupForm.password"
          type="password"
          required
          minlength="6"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Create a password (min 6 characters)"
        />
      </div>
      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
      >
        {{ loading ? 'Creating account...' : 'Create Account' }}
      </button>
    </form>

    <!-- Error/Success Messages -->
    <div
      v-if="message"
      :class="messageType === 'error' ? 'text-red-600 bg-red-50' : 'text-green-600 bg-green-50'"
      class="mt-4 p-3 rounded-lg text-sm"
    >
      {{ message }}
    </div>
  </div>
</template>

<script setup>
const { user, loading, message, messageType, handleLogin, handleSignUp, clearMessage } = useAuth();
// Local reactive data
const activeTab = ref('login');
const loginForm = reactive({
  email: '',
  password: '',
});
const signupForm = reactive({
  email: '',
  password: '',
});
// Methods using the composable
const onLogin = async () => {
  const result = await handleLogin(loginForm.email, loginForm.password, '/dashboard');
  if (result.success) {
    // Form will be cleared automatically on navigation
  }
};
const onSignUp = async () => {
  const result = await handleSignUp(signupForm.email, signupForm.password);
  if (result.success) {
    // Reset form on success
    signupForm.email = '';
    signupForm.password = '';
  }
};
// Clear messages when switching tabs
watch(activeTab, () => {
  clearMessage();
});
</script>
