import { useState, useEffect } from 'react';

export function useFetch(url) {
  console.log('useFetch called for:', url);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    // oxlint-disable-next-line react/set-state-in-effect -- resetting error before a new fetch starts; there's no derived-state equivalent for in-flight async status
    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Request failed');
        return res.json();
      })
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}