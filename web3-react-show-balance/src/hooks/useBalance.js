import { useEffect, useState } from 'react';

function useBalance(web3, account, setLoading, setErrorMessage) {
  const [balance, setBalance] = useState('?');
  useEffect(() => {
    if (web3 && account) {
      (async () => {
        try {
          setLoading(true);
          setErrorMessage('');
          // Will convert an upper or lowercase Ethereum address to a checksum address.
          // https://web3js.readthedocs.io/en/v1.2.11/web3-utils.html#tochecksumaddress
          const correctedAccount = web3.utils.toChecksumAddress(account);
          const balanceInWei = await web3.eth.getBalance(correctedAccount);
          setBalance(
            // convert balance from wei to ether
            Number(web3.utils.fromWei(balanceInWei, 'ether')).toFixed(2),
          );
        } catch (error) {
          setErrorMessage(error.message);
          setBalance('?');
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [web3, account, setLoading, setErrorMessage]);
  return balance;
}

export default useBalance;
