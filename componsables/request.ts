import { ECustomHTTPErrorCode } from '~/services/common/types';
import { UseFetchOptions } from 'nuxt/app';
import { createDiscreteApi } from 'naive-ui';

export const useRequest = async <T>(url: string, options = {} as UseFetchOptions<T>) => {
  // @ts-ignore
  const { data, error, refresh } = await useFetch(url, {
    onResponse: ({ response }) => {
      if (response.status !== 200) {
        throw Error(response.statusText);
      }
      const rawData = response._data;
      console.log('raw data:', rawData);
      const { data } = rawData;
      if (rawData.code === 0) {
        response._data = data as T;
      } else {
        const { notification } = createDiscreteApi(['notification']);
        console.log('request interceptor:', notification);
        notification.info({
          content: rawData.message,
          title: '很抱歉',
        });
        throw Error(data.message);
      }
    },
    ...options,
  });
  return { data, refresh, error };
};

export const generateApiSuccessResponse = (data: unknown = null) => {
  return {
    code: ECustomHTTPErrorCode.success,
    message: 'success',
    data,
  };
};

export const generate501Response = (message?: string) => ({
  code: ECustomHTTPErrorCode['server-error'],
  message: message && message.length > 0 ? message : '服务端异常',
  data: null,
});

export const generateApiServerErrorResponse = ({ code, message }: { code: ECustomHTTPErrorCode; message: string }) => ({ data: null, message, code });
