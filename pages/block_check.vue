<template>
  <div class="max-w-[1200px] p-4 min-h-screen">
    <div class="flex flex-col gap-4 p-8 rounded-md bg-gray-50 relative">
      <Icon name="mdi:format-quote-open-outline" class="absolute top-4 left-4 text-primary" />
      <h5 class="text-xl">Block 数据检索</h5>
      <p class="text-sm">如果你已经使用被本插件的用户拉黑，可以使用一下搜索功能查到记录。</p>
    </div>
    <div class="flex justify-center items-center my-8">
      <input type="text" placeholder="用户名或别名" v-model="query"
        class="p-2 focus-visible:outline-none border w-96 rounded-full px-4 ml-4 pr-8 text-[14px]"
        @keypress.enter="onSearch">
      <Icon name="mdi:card-search"
        class="text-[32px] relative right-12 cursor-pointer text-primary opacity-50 hover:opacity-100"
        @click.stop="onSearch" />
    </div>
    <div>
      <NDataTable v-if="recordList.length" :data="recordList" :columns="columns" />
      <div v-if="loading" class="w-[80%]">
        <n-skeleton text :repeat="2" />
        <n-skeleton text style="width: 60%" />
        <n-skeleton text :repeat="1" style="width: 70%" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ro } from 'date-fns/locale';
import { NDataTable, useLoadingBar, NSkeleton } from 'naive-ui'
import { commonApi } from '~/services/common';
import { IBlockGroup } from '~/services/common/types';

const loadingBar = useLoadingBar()
const query = ref('')
const loading = ref(false)
const recordList = ref([] as IBlockGroup[])
const columns = [{
  key: 'title',
  title: '标题'
}, {
  key: 'intro',
  title: '简介'
}, {
  key: 'default_author',
  title: '创始人',
  render(row: IBlockGroup) {
    return h(
      'a',
      {
        style: {
          color: 'orangered'
        },
        target: '_blank',
        href: `https://twitter.com/${row.default_author}`
      },
      row.default_author
    )
  }
}]
const onSearch = async () => {
  try {
    loading.value = true
    loadingBar.start()
    const { data, error } = await commonApi.searchBlockRecord(query.value)
    console.log(data.value, error.value)
    if (!error.value && data.value) {
      recordList.value = data.value
    }
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
    loadingBar.finish()
  }
}
</script>
