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
    <p class="text-[12px] opacity-50 pt-1 hover:opacity-100 transition-all" v-if="subscriber_list?.length">{{
      subscriber_list?.length
    }}人正在订阅</p>

    <div v-if="action?.length"
      class="absolute right-0 top-0 bottom-0 h-full bg-gray-900 bg-opacity-50 flex flex-col justify-end items-center gap-2 p-2 text-2xl">
      <NPopover trigger="hover" placement="left">
        <span>{{ isSubscribed ? '退订 🙃' : '订阅试试 ❤️' }}</span>
        <template #trigger>
          <div class="cursor-pointer hover:text-primary" @click="onSubscribeAction">
            <Icon name="ph:person-simple-run-thin" v-if="isSubscribed" />
            <Icon name="clarity:group-line" v-else />
          </div>
        </template>
      </NPopover>
      <NPopover trigger="hover" placement="left"
        v-if="action?.includes('ban') && default_author === user?.user_metadata.user_name">
        <span>{{ ban ? '启用' : '禁用' }}</span>
        <template #trigger>
          <div class="cursor-pointer hover:text-primary" @click="onBan">
            <Icon name="material-symbols:lock-open-right-outline" v-if="ban" />
            <Icon name="material-symbols:lock-open-outline-sharp" v-else />
          </div>
        </template>
      </NPopover>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TBlockGroupAction, IBlockGroup } from '~/services/common/types';
import { URL_SUBSCRIBE_BLOCK_GROUP, URL_UPDATE_BLOCK_GROUP_BAN } from '~/services/url.list';
import { NPopover } from 'naive-ui';
import { useRequest } from '~/componsables/request';

const user = useSupabaseUser()
const props = defineProps<IBlockGroup & {
  action?: TBlockGroupAction[]
}>()


const isSubscribed = ref(!!props.subscriber_list?.includes(user.value?.user_metadata.user_name))


const onSubscribeAction = async () => {
  const { error } = await useRequest(URL_SUBSCRIBE_BLOCK_GROUP, {
    body: {
      id: props.id,
      subscriber: isSubscribed.value
    },
    method: 'POST'
  })

  if (!error.value) {
    isSubscribed.value = !isSubscribed.value
  }
}

const onBan = async () => {
  const { error, data } = await useRequest(URL_UPDATE_BLOCK_GROUP_BAN, {
    body: {
      id: props.id,
      ban: !props.ban
    },
    method: 'POST'
  })
  console.log('error:', error.value)
  if (data.value) {
    // props.ban = data.value.ban
    console.log(data.value)
  }

}

</script>