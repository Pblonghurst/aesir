<template lang="">
  <!-- Add Game Dialog -->
  <Dialog v-model:open="dialogStore.isOpen">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add New Game</DialogTitle>
        <DialogDescription>
          Add a new game to your collection. Fill in the details below.
        </DialogDescription>
      </DialogHeader>

      <form @submit.prevent="handleAddGame" class="space-y-4">
        <div class="space-y-2">
          <Label for="name">Game Name *</Label>
          <Input id="name" v-model="newGame.name" placeholder="Enter game name" required />
        </div>

        <div class="space-y-2">
          <Label for="image">Game Image (Optional)</Label>
          <Input id="image" type="file" accept="image/*" disabled />
          <p class="text-xs text-gray-400">File upload disabled for now</p>
        </div>

        <div class="space-y-2">
          <Label for="rules">Rules File (Optional)</Label>
          <Input id="rules" type="file" accept=".pdf,.doc,.docx,.txt" disabled />
          <p class="text-xs text-gray-400">File upload disabled for now</p>
        </div>

        <div class="space-y-2">
          <Label for="rules_text">Rules Text</Label>
          <textarea
            id="rules_text"
            v-model="newGame.rules_text"
            placeholder="Enter game rules or instructions"
            class="min-h-[100px] w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
          />
        </div>

        <DialogFooter>
          <Button type="submit" :disabled="dialogStore.isLoading" @click="handleAddGame()">
            <span v-if="dialogStore.isLoading">Adding...</span>
            <span v-else>Add Game</span>
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
<script setup>
import { ref } from 'vue';
import { useGamesAddDialogStore, useGamesStore } from '../../store/gamesStore';

const dialogStore = useGamesAddDialogStore();
const gamesStore = useGamesStore();
const newGame = ref({
  name: '',
  image_url: '',
  rules_text: '',
  rules_file_url: '',
});

// add game
const handleAddGame = async () => {
  try {
    dialogStore.isLoading = true;
    await gamesStore.createGame(newGame.value);

    // Reset form
    newGame.value = {
      name: '',
      image_url: '',
      rules_text: '',
      rules_file_url: '',
    };

    // Close dialog
    dialogStore.closeAddGameDialog();
  } catch (error) {
    console.error('Failed to create game:', error);
  } finally {
    dialogStore.isLoading = false;
  }
};
</script>
