import { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

function useFecth(url, fetchOptions) {
  const history = useHistory();
  const [payload, setPayload] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getData = useCallback(async () => {
    try {
      setIsLoading(true);
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
    } catch (error) {
      const { message, status } = JSON.parse(error.message);
      if (status === 401) {
        localStorage.removeItem('token');
        history.replace('/login');
      }
      setError(message);
      setIsLoading(false);
    }
  }, [url, fetchOptions, history]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { payload, error, isLoading };
}

export default useFecth;
