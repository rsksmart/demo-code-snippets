import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { providers, utils } from 'ethers';

export const useRootstockStore = defineStore('rootstock', () => {
  const address = ref(null);
  const chainId = ref(0);
  const balance = ref(0);
  const errorMessage = ref('');
  const loading = ref('');

  const provider = computed(() => new providers.Web3Provider(window.ethereum));

  const getBalance = async () => {
    balance.value = address.value
      ? utils.formatEther(await provider.value.getBalance(address.value))
      : 0;
  };

  const connectMetamask = async () => {
    // if Metamask is not installed
    if (window.ethereum === undefined)
      throw new Error('Please install Metamask');
    await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
  };

  const updateNetworkInfo = async () => {
    [address.value] = await provider.value.listAccounts();
    chainId.value = (await provider.value.getNetwork()).chainId;
    getBalance();
  };

  const addEventListeners = () => {
    window.ethereum.on('accountsChanged', updateNetworkInfo);
    window.ethereum.on('chainChanged', () => window.location.reload());
    // update RBTC balance on every new block
    provider.value.on('block', getBalance);
  };

  const connect = async () => {
    try {
      errorMessage.value = '';
      loading.value = 'Connecting to Rootstock...';
      await connectMetamask();
      await updateNetworkInfo();
      addEventListeners();
    } catch (error) {
      errorMessage.value = error.message;
    } finally {
      loading.value = '';
    }
  };

  return {
    connect,
    provider,
    address,
    chainId,
    balance,
    errorMessage,
    loading,
  };
});
