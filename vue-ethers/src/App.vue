<script setup>
import { useRootstockStore } from './stores/rootstock';
import MessageBoard from './components/MessageBoard.vue';
import SendRbtc from './components/SendRbtc.vue';
import WalletDashboard from './components/WalletDashboard.vue';
import ConnectWallet from './components/ConnectWallet.vue';

const rskStore = useRootstockStore();
</script>

<template>
  <div class="screen">
    <div class="container">
      <ConnectWallet v-if="!rskStore.address" />
      <div v-else>
        <WalletDashboard />
        <SendRbtc />
      </div>
    </div>
    <MessageBoard />
  </div>
</template>

<style scoped>
.screen {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}
.container {
  text-align: center;
}
</style>
