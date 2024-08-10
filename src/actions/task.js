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

export function useGetTasks() {
  const url = endpoints.task.list;

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      tasks: data?.data?.data || [],
      tasksLoading: isLoading,
      tasksError: error,
      tasksValidating: isValidating,
      tasksEmpty: !isLoading && !data?.length,
    }),
    [error, isLoading, isValidating, data]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetTask(taskId) {
  const url = taskId ? [endpoints.task.details, { params: { taskId } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      task: data?.task,
      taskLoading: isLoading,
      taskError: error,
      taskValidating: isValidating,
    }),
    [data?.task, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useSearchTask(query) {
  const url = query ? [endpoints.task.search, { params: { query } }] : '';

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

export function useShowTask(id) {
  const URL = `${endpoints.task.details}/${id}`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = {
    task: data?.data,
    taskLoading: isLoading,
    taskError: error,
    taskValidating: isValidating,
  };

  return memoizedValue;
}
