import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function useSmartContract(provider, name, setErrorMessage, setLoading) {
  const [contract, setContract] = useState(null);
  const [transferEvent, setTransferEvent] = useState(null);

  const transferEventListener = (from, to, amount) =>
    setTransferEvent({
      from,
      to,
      amount: amount.toString(),
    });

  useEffect(() => {
    if (provider && name) {
      (async () => {
        try {
          setErrorMessage('');
          setLoading(true);
          const { address, abi } = await import(`../contracts/${name}.json`);
          const smartContract = new ethers.Contract(address, abi, provider);
          setContract(smartContract);
          const signer = await provider.getSigner();
          // filter transfers `from:` and `to:` signer
          const filter = smartContract.filters.Transfer(
            signer.address,
            signer.address,
          );
          // attach Transfer event listener
          smartContract.on(filter, transferEventListener);
        } catch (error) {
          setErrorMessage(error.message);
        } finally {
          setLoading(false);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider, name]);
  return [contract, transferEvent];
}

export default useSmartContract;
