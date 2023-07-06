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
        <BlockGroup v-for="(item, index) in (myBlockGroup.data.value as IBlockGroup[])" :key="index" :="item"
          :action="['ban', 'delete', 'share']" />
      </div>
    </div>

    <div class="bg-gray-50 p-4 rounded-md min-h-96">
      <div class="flex justify-between items-center">
        <h5 class="text-xl font-bold text-gray-800 underline underline-offset-4 decoration-orange-500">
          我订阅的组
        </h5>

      </div>
      <div class="mt-4 grid grid-cols-2 gap-2">
        <BlockGroup v-for="(item, index) in (mySubscriberGroup.data.value as IBlockGroup[])" :key="index" :="item"
          :action="['subscribe']" />
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
const user_name = user.value?.user_metadata.user_name

const [myBlockGroup, mySubscriberGroup] = await Promise.all([
  commonApi.getMyBlockGroup(user_name),
  commonApi.getMySubscriberBlockGroup(user_name)
])

console.log(mySubscriberGroup.data.value)
</script>

