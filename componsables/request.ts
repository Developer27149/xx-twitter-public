import { UseFetchOptions } from 'nuxt/app';

export const useRequest = async <T>(url: string, options = {} as UseFetchOptions<T>) => {
  // @ts-ignore
  const { data, error, refresh } = useFetch<{ message: string; code: number; data: T }>(url, {
    onResponse: response => {
      // if(response._data)
      console.log('use fetch interceptor response:', response);
    },
    onRequest: request => {
      console.log('use fetch interceptor request:', request);
    },
    ...options,
  });
  // if (error.value) {
  //   throw Error(error.value.message);
  // }

  return { data, refresh, error };
};
