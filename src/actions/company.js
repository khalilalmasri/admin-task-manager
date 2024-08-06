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

export function useGetCompanys() {
  const url = endpoints.company.list;

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      companys: data?.data?.data || [],
      companysLoading: isLoading,
      companysError: error,
      companysValidating: isValidating,
      companysEmpty: !isLoading && !data?.length,
    }),
    [error, isLoading, isValidating, data]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetCompany(companyId) {
  const url = companyId ? [endpoints.company.details, { params: { companyId } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      company: data?.company,
      companyLoading: isLoading,
      companyError: error,
      companyValidating: isValidating,
    }),
    [data?.company, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useSearchcompany(query) {
  const url = query ? [endpoints.company.search, { params: { query } }] : '';

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

export function useShowCompany(id) {
  const URL = `${endpoints.company.details}/${id}`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = {
    company: data?.data,
    companyLoading: isLoading,
    companyError: error,
    companyValidating: isValidating,
  };

  return memoizedValue;
}
