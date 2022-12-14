import { useContext } from 'react';
import rLoginContext from '../contexts/rLoginContext';

function ErrorMessage() {
  const { errorMessage } = useContext(rLoginContext);

  return (
    errorMessage && (
      <div className="error">
        <p>Error: {errorMessage}</p>
      </div>
    )
  );
}

export default ErrorMessage;
