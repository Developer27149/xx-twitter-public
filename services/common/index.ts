import { URL_BLOCK_GROUP, URL_SEARCH_BLOCK_RECORD, URL_SEARCH_USERS_BY_NAME } from '../url.list';

import { IBlockGroup } from './types';
import { useRequest } from '~/componsables/request';

export const commonApi = {
  getBlockGroup: () => useRequest<IBlockGroup[]>(URL_BLOCK_GROUP),
  getMyBlockGroup: (user_name: string) => useRequest<IBlockGroup[]>(URL_BLOCK_GROUP + `/${user_name}`),
  getMySubscriberBlockGroup: (user_name: string) => useRequest<IBlockGroup[]>(URL_BLOCK_GROUP + `/${user_name}/subscriber`),
  searchBlockRecord: (user_name: string) => useRequest<IBlockGroup[]>(URL_SEARCH_BLOCK_RECORD + `/${user_name}`),
  searchUserByName: (user_name: string) => useRequest<{ full_name: string }[]>(URL_SEARCH_USERS_BY_NAME + `/${user_name}`),
};
