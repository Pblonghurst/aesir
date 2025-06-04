<template>
  <nav class="shadow-md p-2 bg-gray-900">
    <div class="max-w-7xl mx-auto py-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-8">
          <h1 class="text-2xl font-bold text-white">Dashboard</h1>
          <!-- <nav class="flex gap-6">
            <a href="#" class="text-blue-600 font-medium">Overview</a>
            <a href="#" class="text-gray-600  hover:text-gray-900">Analytics</a>
            <a href="/dashboard/settings" class="text-gray-600 hover:text-gray-900">Settings</a>
          </nav> -->
        </div>
        <div class="flex items-center gap-4">
          <!-- User Info Section -->
          <div class="flex items-center gap-3">
            <!-- User Details -->
            <div class="text-right">
              <div class="text-sm font-medium text-white">
                {{ profile?.username }}
              </div>
              <div class="text-xs text-gray-400">
                {{ user?.email }}
              </div>
            </div>
            <!-- Avatar with Popup -->
            <div class="relative">
              <Dialog>
                <DropdownMenu>
                  <!-- dropdown menu trigger -->
                  <DropdownMenuTrigger>
                    <button
                      class="w-10 h-10 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center hover:ring-2 hover:ring-green-400 focus:outline-none"
                    >
                      <img
                        v-if="user?.avatar"
                        :src="user.avatar"
                        :alt="user?.email"
                        class="w-full h-full object-cover"
                      />
                      <span v-else class="text-white font-medium text-sm">
                        {{ initial }}
                      </span>
                    </button>
                  </DropdownMenuTrigger>

                  <!-- dropdown menu -->
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel class="flex items-center justify-between px-2 py-1 gap-2">
                      <span class="text-black">Dark Mode</span>
                      <Switch id="theme-toggle" />
                    </DropdownMenuLabel>
                    <DialogTrigger as-child>
                      <DropdownMenuItem class="cursor-pointer"> Edit Profile </DropdownMenuItem>
                    </DialogTrigger>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem @click="onSignOut" class="cursor-pointer">
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <!-- Login Form -->
                  <form class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        required
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        required
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </form>
                  <DialogFooter>
                    <Button>Save Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
const { user, handleSignOut, profile } = useAuth();

const onSignOut = async () => {
  await handleSignOut('/');
};
console.log(profile);
// get initials from email
const initial = computed(() => {
  return user.value?.email?.charAt(0).toUpperCase() || '';
});
</script>
