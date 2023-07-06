import { URL_BLOCK_GROUP, URL_SEARCH_BLOCK_RECORD } from '../url.list';

import { IBlockGroup } from './types';
import { useRequest } from '~/componsables/request';

export const commonApi = {
  getBlockGroup: () => useRequest<IBlockGroup[]>(URL_BLOCK_GROUP),
  getMyBlockGroup: (user_name: string) => useRequest<IBlockGroup[]>(URL_BLOCK_GROUP + `/${user_name}`),
  getMySubscriberBlockGroup: (user_name: string) => useRequest<IBlockGroup[]>(URL_BLOCK_GROUP + `/${user_name}/subscriber`),
  searchBlockRecord: (user_name: string) => useRequest<IBlockGroup[]>(URL_SEARCH_BLOCK_RECORD + `/${user_name}`),
};
