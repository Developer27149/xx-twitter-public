<template>
  <div class="flex justify-center items-center flex-col py-32 min-h-screen gap-12 max-w-[1200px] p-12">
    <h1 class="text-3xl font-bold underline">Hello {{ user?.user_metadata.name }}!</h1>
    <section class="text-center px-12">
      <p>黄推泛滥，是可忍孰不可忍！</p>
      <br>
      <p>让我们来共建信任链，在这里你可以选择订阅社区创建的黄推黑名单，配合浏览器插件自动 Block 这些可恶的黄推！</p>
    </section>

    <!-- <div v-for="{ id, title, body } in data" :key="id"
      class="text-left max-w-[600px] w-full px-4 py-2 border border-gray-100 rounded-md shadow-md">
      <h2 class="text-xl font-bold">{{ title }}</h2>
      <p class="text-gray-500">{{ body }}</p>
    </div> -->
    {{
      data }}
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';

const { data, suspense } = useQuery({
  queryKey: ['demo'],
  queryFn: () => useFetch('/api/block_group')
});

await suspense();
</script>
