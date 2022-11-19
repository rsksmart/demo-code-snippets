<script setup>
import { useRootstockStore } from '../stores/rootstock';

const rskStore = useRootstockStore();
</script>

<template>
  <h1>Connected to Rootstock</h1>
  <p>{{ `Address: ${rskStore.address}` }}</p>
  <p>{{ `Chain ID: ${rskStore.chainId}` }}</p>
  <p>{{ `RBTC balance: ${rskStore.balance}` }}</p>
</template>
