<template>
  <div class="p-4 flex flex-col gap-4 max-w-[1200px]">
    <div class="bg-gray-50 p-4 rounded-md min-h-96">
      <div class="flex justify-between items-center">
        <h5 class="text-xl font-bold text-gray-800 underline underline-offset-4 decoration-orange-500">
          我创建的组
        </h5>
        <CreateBlockGroup :refresh="refresh" />
      </div>
      <div class="mt-4 grid grid-cols-2 gap-2">
        <BlockGroup v-for="(item, index) in (data as IBlockGroup[])" :key="index" :="item" />
      </div>
    </div>

    <div class="bg-gray-50 p-4 rounded-md min-h-96">
      <div class="flex justify-between items-center">
        <h5 class="text-xl font-bold text-gray-800 underline underline-offset-4 decoration-orange-500">
          我订阅的组
        </h5>

      </div>
      <div class="mt-4 grid grid-cols-2 gap-2">
        <BlockGroup v-for="(item, index) in (data as IBlockGroup[])" :key="index" :="item" />
      </div>
    </div>

    <div class="flex bg-gray-50 p-4 rounded-md">
      <div>1</div>
      <div>2</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { commonApi } from '~/services/common';
import { IBlockGroup } from '~/services/common/types';

definePageMeta({
  middleware: 'auth'
})

const user = useSupabaseUser()

const { data, refresh } = await commonApi.getMyBlockGroup(user.value?.user_metadata.user_name)

</script>

