import React, { useState } from 'react';
import axios from 'axios';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<boolean>(false);

  const sendRequest = async (request: {url: string},
    dataHandler: (data: any) => void) => {
    try {
      setIsLoading(true);
      const response = await axios.get(request.url || '');
      const data = await response.data;
      dataHandler(data);
    } catch (err) {
      setError(true);
      throw new Error(`Error: ${err}`);
    }
    setIsLoading(false);
  };

  return {
    sendRequest,
    isLoading,
    error,
  };
};

export default useHttp;
