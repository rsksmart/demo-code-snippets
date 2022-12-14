import { useContext } from 'react';
import rLoginContext from '../contexts/rLoginContext';

function LoadingStatus() {
  const { loadingStatus } = useContext(rLoginContext);

  return (
    loadingStatus && (
      <div className="loading">
        <p>{loadingStatus}</p>
      </div>
    )
  );
}

export default LoadingStatus;
