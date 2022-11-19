<script setup>
import { storeToRefs } from 'pinia';
import { useRootstockStore } from '../stores/rootstock';

const rskStore = useRootstockStore();
const { errorMessage, loading } = storeToRefs(rskStore);
</script>

<template>
  <div>
    <p class="loading" v-if="loading">{{ loading }}</p>
    <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
div {
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.error {
  color: red;
}
.loading {
  color: forestgreen;
}
</style>
