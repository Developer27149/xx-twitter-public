<template>
  <div class="min-h-screen gap-12 max-w-[1200px] p-12">
    <div class="flex justify-between flex-wrap">
      <h1 class="text-3xl font-bold underline decoration-orange-500">Hello, {{ user?.user_metadata.name ?? '朋友' }}</h1>
      <CreateBlockGroup :refresh="refresh" />
    </div>
    <section class="p-4 my-8 relative bg-gray-100 pl-12 rounded-md text-gray-800">
      <span class="text-[48px] text-primary opacity-80 absolute -top-2 left-2">“</span>
      <p class="text-xl mb-2">黄推泛滥，是可忍孰不可忍！</p>
      <p>让我们来共建信任社区，在这里你可以选择订阅社区创建的黄推黑名单，配合浏览器插件自动 Block 这些可恶的黄推！</p>
      <h5 class="py-4 text-xl">订阅说明：</h5>
      <ul class="list-disc pl-8">
        <li>订阅后配合插件系统将会自动批量 Block 订阅的组每周更新的黄推名单</li>
        <li>每个用户目前最多创建两个订阅组</li>
      </ul>
    </section>
    <BlockGroup v-if="data" :="data?.[0]" />
    <div class="grid grid-cols-2 gap-6 my-6" v-if="data && data.length > 1">
      <BlockGroup v-for="attrs, idx in data.slice(1)" :key="idx" :="attrs" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { commonApi } from '~/services/common/index'

const user = useSupabaseUser()
const { data, refresh } = await commonApi.getBlockGroup()
console.log('data:::', data.value)
</script>
