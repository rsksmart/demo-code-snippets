import { useContext } from 'react';
import { RLoginButton } from '@rsksmart/rlogin';
import rLoginContext from '../contexts/rLoginContext';

function Connect() {
  const { connect } = useContext(rLoginContext);
  return (
    <RLoginButton onClick={connect}>
      Connect wallet
    </RLoginButton>
  );
}

export default Connect;
