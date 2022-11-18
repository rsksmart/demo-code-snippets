<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { utils } from 'ethers';
import { useRootstockStore } from '../stores/rootstock';

const rskStore = useRootstockStore();
const { errorMessage, loading, provider, balance } = storeToRefs(rskStore);

const rbtcToSend = ref(0.00001);
const toAddress = ref('0xB62BD53308fb2834b3114a5f725D0382CBe9f008');
const sendRbtc = async () => {
  try {
    errorMessage.value = '';
    loading.value = 'Initiating transaction';
    const signer = provider.value.getSigner(0);
    const tx = await signer.sendTransaction({
      to: utils.getAddress(toAddress.value),
      value: utils.parseEther(rbtcToSend.value.toString()),
    });
    loading.value = `Sending tx: ${tx.hash}`;
    await tx.wait();
  } catch (error) {
    if (error.code !== 'ACTION_REJECTED') errorMessage.value = error.message;
  } finally {
    loading.value = '';
  }
};
</script>

<template>
  <label>
    Send
    <input
      type="number"
      v-model="rbtcToSend"
      min="0"
      :max="balance"
      step="0.00001"
    />
    RBTC
  </label>
  <label>
    To address
    <input type="text" v-model="toAddress" />
  </label>
  <button @click="sendRbtc">send RBTC</button>
</template>

<style scoped>
button {
  cursor: pointer;
}
label {
  display: block;
}
input[type='number'] {
  width: 5rem;
}
input[type='text'] {
  width: 20rem;
}
</style>
