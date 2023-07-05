<template>
  <div
    class="bg-gray-800 whitespace-pre-wrap rounded-md p-4 object-cover bg-center bg-no-repeat bg-cover min-h-[300px] flex flex-col text-white relative"
    :style="{ 'backgroundImage': 'url(' + background + ')' }">
    <div class="flex justify-between items-center">
      <h4 class="text-2xl max-w-[80%] truncate">{{ title }}</h4>
      <!-- <button v-if="mode !== 'preview' && user?.user_metadata" @click="onSubscribeAction"
        class="p-2 px-4 scale-[0.85] transition-all hover:scale-100 rounded-md text-[13px] bg-gray-400 bg-opacity-50 text-gray-50">
        {{
          isSubscribed ? '退订 🙃' : '订阅试试 ❤️' }}
      </button> -->
    </div>
    <p class="max-w-[80%] w-[400px] mt-auto">{{ intro }}</p>


    <div
      class="absolute right-0 top-0 bottom-0 h-full bg-gray-900 bg-opacity-50 flex flex-col justify-center gap-4 p-2 text-2xl">
      <NPopover trigger="hover" placement="left">
        <span>{{ isSubscribed ? '退订 🙃' : '订阅试试 ❤️' }}</span>
        <template #trigger>
          <div class="cursor-pointer hover:text-primary" @click="onSubscribeAction">
            <Icon name="ph:person-simple-run-thin" v-if="isSubscribed" />
            <Icon name="clarity:group-line" v-else />
          </div>
        </template>
      </NPopover>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EBlockGroupAction, IBlockGroup } from '~/services/common/types';
import { URL_SUBSCRIBE_BLOCK_GROUP } from '~/services/url.list';
import { NPopover } from 'naive-ui';
import { useRequest } from '~/componsables/request';

const user = useSupabaseUser()
const props = defineProps<IBlockGroup & {
  action?: EBlockGroupAction
}>()


const isSubscribed = ref(!!props.subscriber_list?.includes(user.value?.user_metadata.user_name))

const onSubscribeAction = async () => {
  const { error, data } = await useRequest(URL_SUBSCRIBE_BLOCK_GROUP, {
    body: {
      id: props.id,
      subscriber: isSubscribed.value
    },
    method: 'POST'
  })

  console.log('subscribe', data, error)

  if (!error.value) {
    isSubscribed.value = !isSubscribed.value
  }
}

</script>