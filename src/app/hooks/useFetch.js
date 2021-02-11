import { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
const noop = () => {};

function useFecth({
  onStart = noop,
  onSuccess = noop,
  onFailure = noop,
  url,
  fetchOptions,
  condition = true,
}) {
  const history = useHistory();
  const [payload, setPayload] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getData = useCallback(async () => {
    try {
      setIsLoading(true);
      onStart();

      const response = await fetch(url, fetchOptions);
      const json = await response.json();

      if (!response.ok) {
        const error = 'Something went wrong!';
        throw new Error(
          JSON.stringify({ message: error, status: response.status })
        );
      }

      setPayload(json);
      setIsLoading(false);
      onSuccess(json);
    } catch (error) {
      const { message, status } = JSON.parse(error.message);
      if (status === 401) {
        localStorage.removeItem('token');
        history.replace('/login');
      }
      onFailure(error.message);
      setError(message);
      setIsLoading(false);
    }
  }, [onStart, onSuccess, onFailure, url, fetchOptions, history]);

  useEffect(() => {
    if (condition) {
      getData();
    }
  }, [getData, condition]);

  return { payload, error, isLoading };
}

export default useFecth;
