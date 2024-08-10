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

export function useGetProjects() {
  const url = endpoints.project.list;

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      projects: data?.data?.data || [],
      projectsLoading: isLoading,
      projectsError: error,
      projectsValidating: isValidating,
      projectsEmpty: !isLoading && !data?.length,
    }),
    [error, isLoading, isValidating, data]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetProject(projectId) {
  const url = projectId ? [endpoints.project.details, { params: { projectId } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      project: data?.project,
      projectLoading: isLoading,
      projectError: error,
      projectValidating: isValidating,
    }),
    [data?.project, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useSearchProject(query) {
  const url = query ? [endpoints.project.search, { params: { query } }] : '';

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

export function useShowProject(id) {
  const URL = `${endpoints.project.details}/${id}`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = {
    project: data?.data,
    projectLoading: isLoading,
    projectError: error,
    projectValidating: isValidating,
  };

  return memoizedValue;
}
