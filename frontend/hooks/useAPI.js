import { useState, useEffect } from 'react';
import { apiClient } from '../lib/apiClient';

/**
 * Custom hook for fetching data from the API
 * @param {Function} apiMethod - The API method to call
 * @param {*} deps - Dependency array for useEffect
 * @returns {Object} { data, loading, error, refetch }
 */
export function useFetch(apiMethod, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiMethod();
      setData(result);
    } catch (err) {
      setError(err.message || 'Failed to fetch data');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, deps);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

/**
 * Custom hook for managing async operations (mutations)
 * @returns {Object} { execute, loading, error, success }
 */
export function useMutation(apiMethod) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const execute = async (params) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      const result = await apiMethod(params);
      setSuccess(true);
      return result;
    } catch (err) {
      setError(err.message || 'Operation failed');
      console.error('Mutation error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    execute,
    loading,
    error,
    success,
  };
}
