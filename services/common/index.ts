import { IBlockGroup } from './types';
import { URL_BLOCK_GROUP } from '../url.list';
import { getToken } from '../../componsables/clientUtils';

export const commonApi = {
  getBlockGroup: () => useFetch<IBlockGroup[]>(URL_BLOCK_GROUP),
};
