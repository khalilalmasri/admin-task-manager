import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

// ----------------------------------------------------------------------

export function useGetStaffs() {
  const url = endpoints.staff.list;

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      staffs: data?.data?.data || [],
      staffsLoading: isLoading,
      staffsError: error,
      staffsValidating: isValidating,
      staffsEmpty: !isLoading && !data?.length,
    }),
    [error, isLoading, isValidating, data]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetStaff(staffId) {
  const url = staffId ? [endpoints.staff.details, { params: { staffId } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      staff: data?.staff,
      staffLoading: isLoading,
      staffError: error,
      staffValidating: isValidating,
    }),
    [data?.staff, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useSearchStaff(query) {
  const url = query ? [endpoints.staff.search, { params: { query } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.results || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !data?.results.length,
    }),
    [data?.results, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useShowStaff(id) {
  const URL = `${endpoints.staff.details}/${id}`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = {
    staff: data?.data,
    staffLoading: isLoading,
    staffError: error,
    staffValidating: isValidating,
  };

  return memoizedValue;
}
