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
          <Label for="image">Game Image</Label>
          <Input id="image" type="file" accept="image/*" />
        </div>

        <div class="space-y-2">
          <Label for="rules">Rules File</Label>
          <Input id="rules" type="file" accept=".pdf,.doc,.docx,.txt" />
        </div>

        <div class="space-y-2">
          <Label for="rules_text">Rules Text</Label>
          <textarea
            id="rules_text"
            v-model="newGame.rules_text"
            placeholder="Enter game rules or instructions"
            class="min-h-[100px]"
          />
        </div>

        <DialogFooter>
          <Button type="submit" :disabled="dialogStore.isLoading">
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
import { useGames } from '../../composables/useGames';
import { useGamesAddDialogStore, useGamesStore } from '../../store/gamesStore';

const { createGame } = useGames();
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
  if (!newGame.value.name) return;

  dialogStore.isLoading = true;
  try {
    const result = await createGame(newGame.value);
    if (result) {
      dialogStore.isOpen = false;
      // Reset form
      newGame.value = {
        name: '',
        image_url: '',
        rules_text: '',
        rules_file_url: '',
      };
      // Refresh games list using store
      await gamesStore.fetchGames();
    }
  } catch (error) {
    console.error('Error adding game:', error);
  } finally {
    dialogStore.isLoading = false;
  }
};
</script>
