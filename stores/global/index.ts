import { GLOBAL_STORE } from '~/stores/storeIdList';
import { IBlockGroup } from '~/services/common/types';
import { storeToRefs } from 'pinia';

export const globalStore = defineStore(GLOBAL_STORE, () => {
  const blockGroupList = ref([] as IBlockGroup[]);
  
  return {
    blockGroupList,
  };
});

export const useGlobalStore = () => storeToRefs(globalStore());
