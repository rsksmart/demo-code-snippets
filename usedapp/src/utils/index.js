export const getAddressLink = (explorerUrl) => (address) =>
  `${explorerUrl}/address/${address}`;

export const getTransactionLink = (explorerUrl) => (txnId) =>
  `${explorerUrl}/tx/${txnId}`;
