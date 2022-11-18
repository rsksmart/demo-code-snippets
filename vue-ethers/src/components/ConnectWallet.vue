<script setup>
import { useRootstockStore } from '../stores/rootstock';

const rskStore = useRootstockStore();
</script>

<template>
  <h1>Connect Metamask!</h1>
  <button @click="rskStore.connect">connect</button>
</template>
