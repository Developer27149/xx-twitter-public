<template>
  <div
    class="bg-gray-800 whitespace-pre-wrap rounded-md p-4 object-cover bg-center bg-no-repeat bg-cover min-h-[300px] flex flex-col text-white relative"
    :style="{ 'backgroundImage': 'url(' + background + ')' }">
    <div class="flex justify-between items-center">
      <h4 class="text-2xl">{{ title }}</h4>
      <button v-if="mode !== 'preview' && user?.user_metadata" @click="onSubscribeAction"
        class="p-2 px-4 scale-[0.85] transition-all hover:scale-100 rounded-md text-[13px] bg-gray-400 bg-opacity-50 text-gray-50">
        {{
          isSubscribed ? '退订 🙃' : '订阅试试 ❤️' }}
      </button>
    </div>
    <section class="flex gap-4 items-center text-gray-200 mt-auto">
      <img :src="author_avatar" class="w-10 h-10 rounded-full" />
      <div>
        <NuxtLink class="block text-gray-300" :to='`https://twitter.com/${user_name}`' target="_blank">
          <span class="font-bold pr-1 text-white">{{ user_name }}</span>@<span>{{ name }}</span>
        </NuxtLink>
        <n-rate v-if="score !== 0" color="orangered" readonly allow-half :default-value="score" />
      </div>

    </section>
    <div class="flex justify-between items-end">
      <p class="pt-12 max-w-[80%]">{{ intro }}</p>
      <Icon @click="onReverseLikeStatus" v-if="isSubscribed"
        class="cursor-pointer p-1 text-gray-800 bg-white bg-opacity-70 rounded-full text-[24px]"
        :class="{ 'text-[orangered]': isLiked }" name="material-symbols:favorite-rounded" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IBlockGroup } from '~/services/common/types';
import { NRate } from 'naive-ui'
import { URL_SUBSCRIBE_BLOCK_GROUP, URL_UPDATE_BLOCK_GROUP_LIKE } from '~/services/url.list';

const user = useSupabaseUser()
const props = defineProps<IBlockGroup & {
  mode?: 'preview' | 'default'
}>()
const isLiked = ref(props.like_user?.includes(user.value?.user_metadata.user_name))

// console.log('props', props)
const subscribeList = computed(() => {
  return props.subscribers?.split(',') ?? []
})
const isSubscribed = computed(() => {
  return props.subscribers?.split(',').includes(user.value?.user_metadata.user_name)
})

const score = computed(() => {
  if (props.like === 0 && props.dislike === 0) return 0
  return +((props.like / (props.dislike + props.like)) * 5).toFixed(1)
})


const onSubscribeAction = async () => {
  const { data } = await useFetch(URL_SUBSCRIBE_BLOCK_GROUP, {
    method: 'POST',
    body: JSON.stringify({
      user_name: user.value?.user_metadata.user_name,
      id: props.id,
      subscribes: isSubscribed.value ? subscribeList.value.filter(i => i !== user.value?.user_metadata.user_name) : `${props.subscribers},${user.value?.user_metadata.user_name}`
    })
  })
  console.log('update response:', data)
}

const onReverseLikeStatus = async () => {
  isLiked.value = !isLiked.value
  const { data, error } = await useFetch(URL_UPDATE_BLOCK_GROUP_LIKE, {
    body: JSON.stringify({
      id: props.id,
      isLike: isLiked.value,
      user_name: user.value?.user_metadata.user_name
    }),
    method: 'POST'
  })
  console.log(data.value, error.value)
}
</script>