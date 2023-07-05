import { IBlockGroup } from './types';
import { URL_BLOCK_GROUP } from '../url.list';
import { useRequest } from '~/componsables/request';

export const commonApi = {
  getBlockGroup: () => useRequest<IBlockGroup[]>(URL_BLOCK_GROUP),
  getMyBlockGroup: (user_name: string) => useRequest<IBlockGroup[]>(URL_BLOCK_GROUP + `/${user_name}`),
  getMySubscriberBlockGroup: (user_name: string) => useRequest<IBlockGroup[]>(URL_BLOCK_GROUP + `/${user_name}/subscriber`),
};
