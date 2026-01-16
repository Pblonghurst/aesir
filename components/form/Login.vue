<template lang="">
  <!-- Auth Forms -->
  <div
    v-if="!user"
    class="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 h-full flex flex-col justify-center items-center w-full mt-12 mb-24 max-[700px]:mb-12"
  >
    <Tabs v-model="activeTab" class="w-full">
      <!-- tabs list -->
      <TabsList class="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>

      <!-- login tab -->
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <div class="mb-6">
              <CardDescription> Sign in to your account to continue. </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form @submit.prevent="onLogin" class="space-y-4" autocomplete="on">
              <div class="space-y-1">
                <Label for="login-email">Email</Label>
                <Input
                  id="login-email"
                  v-model="loginForm.email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  autocomplete="email"
                />
              </div>
              <div class="space-y-1">
                <Label for="login-password">Password</Label>
                <Input
                  id="login-password"
                  v-model="loginForm.password"
                  type="password"
                  required
                  placeholder="Enter your password"
                  autocomplete="current-password"
                />
              </div>
              <Button type="submit" :disabled="loading" class="w-full mt-4">
                {{ loading ? 'Signing in...' : 'Sign In' }}
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      <!-- signup tab -->
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <div class="mb-6">
              <CardDescription> Create a new account to get started. </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form @submit.prevent="onSignUp" class="space-y-4" autocomplete="on">
              <div class="space-y-1">
                <Label for="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  v-model="signupForm.email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  autocomplete="email"
                />
              </div>
              <div class="space-y-1">
                <Label for="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  v-model="signupForm.password"
                  type="password"
                  required
                  minlength="6"
                  placeholder="Create a password (min 6 characters)"
                  autocomplete="new-password"
                />
              </div>
              <div class="space-y-1">
                <Label for="signup-username">Username</Label>
                <Input
                  id="signup-username"
                  v-model="signupForm.username"
                  type="text"
                  required
                  placeholder="Enter your username"
                  autocomplete="username"
                />
              </div>
              <div class="space-y-1">
                <Label for="signup-first-name">First Name</Label>
                <Input
                  id="signup-first-name"
                  v-model="signupForm.first_name"
                  type="text"
                  required
                  placeholder="Enter your first name"
                  autocomplete="first-name"
                />
              </div>
              <div class="space-y-1">
                <Label for="signup-last-name">Last Name</Label>
                <Input
                  id="signup-last-name"
                  v-model="signupForm.last_name"
                  type="text"
                  required
                  placeholder="Enter your last name"
                  autocomplete="last-name"
                />
              </div>
              <Button type="submit" :disabled="loading" class="w-full mt-4">
                {{ loading ? 'Creating account...' : 'Create Account' }}
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>

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
import { useAuthStore } from '@/store/authStore';
const authStore = useAuthStore();
const user = computed(() => authStore.user);
const loading = computed(() => authStore.loading);
const message = computed(() => authStore.message);
const messageType = computed(() => authStore.messageType);

// Props
const props = defineProps({
  defaultTab: {
    type: String,
    default: 'login',
  },
});

// Local reactive data
const activeTab = ref(props.defaultTab);
const loginForm = reactive({
  email: '',
  password: '',
});
const signupForm = reactive({
  email: '',
  password: '',
  first_name: '',
  last_name: '',
  username: '',
});

// login method
const onLogin = async () => {
  authStore.handleSignIn(loginForm.email, loginForm.password, '/dashboard');
};

// signup method
const onSignUp = async () => {
  authStore.handleSignUp(signupForm.email, signupForm.password);
};

// Clear messages when switching tabs
watch(activeTab, () => {
  authStore.clearMessage();
});
</script>
