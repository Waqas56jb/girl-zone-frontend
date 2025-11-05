import { useState, useEffect, useCallback } from 'react';
import { apiClient, ApiResponse } from '@/lib/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  dependencies: any[] = []
): UseApiState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall();
      if (response.success && response.data) {
        setData(response.data);
      } else {
        setError(response.message || 'Failed to fetch data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

export function useApiMutation<T, P = any>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (
    apiCall: (params: P) => Promise<ApiResponse<T>>,
    params: P
  ): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall(params);
      if (response.success && response.data) {
        return response.data;
      } else {
        setError(response.message || 'Operation failed');
        return null;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    mutate,
    loading,
    error,
  };
}

// Specific hooks for common API calls
export function useCompanions() {
  return useApi(() => apiClient.getCompanions(), []);
}

export function useCustomAis() {
  return useApi(() => apiClient.getCustomAis(), []);
}

export function useStarPackages() {
  return useApi(() => apiClient.getStarPackages(), []);
}

export function useAiAttributes(category: string) {
  return useApi(() => apiClient.getAiAttributes(category), [category]);
}

export function useUserDashboard() {
  return useApi(() => apiClient.getUserDashboard(), []);
}

export function useGenerations() {
  return useApi(() => apiClient.getGenerations(), []);
}

export function useConversations() {
  return useApi(() => apiClient.getConversations(), []);
}

export function useGallery() {
  return useApi(() => apiClient.getGallery(), []);
}

export function useEggplantRatings() {
  return useApi(() => apiClient.getEggplantRatings(), []);
}

export function useAffiliateProfile() {
  return useApi(() => apiClient.getAffiliateProfile(), []);
}
