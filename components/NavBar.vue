<template>
  <div class="bg-[#212328] w-[80px] flex-col flex h-screen">
    <div class="flex-grow flex items-center flex-col pt-8 gap-4">
      <n-popover trigger="hover" placement="right">
        <template #trigger>
          <NuxtLink to="/" class="p-1 bg-orange-100 rounded-md relative">
            <span class="absolute left-[65%] top-[40%] text-xl text-primary font-bold">X</span>
            <Icon name="skill-icons:twitter" class="cursor-pointer w-8 h-8  hover:text-primary transition-all"
              :class="{ 'text-primary': $route.path === '/', 'text-gray-100': $route.path !== '/' }" />
          </NuxtLink>
        </template>
        <span>黄推订阅列表</span>
      </n-popover>

      <NPopover trigger="hover" placement="right">
        <template #trigger>
          <NuxtLink to="/block_group" class="p-1 bg-gray-50 rounded-md bg-opacity-10 ">
            <Icon name="clarity:group-line"
              :class="{ 'text-primary': $route.path === '/block_group', 'text-gray-100': $route.path !== '/search' }"
              class="cursor-pointer w-8 h-8 text-gray-100  transition-all hover:text-primary" />
          </NuxtLink>
        </template>
        <span>我的订阅</span>
      </NPopover>

      <NuxtLink to="search" class="p-1 bg-gray-50 rounded-md bg-opacity-10">
        <Icon :class="{ 'text-primary': $route.path === '/search', 'text-gray-100': $route.path !== '/search' }"
          name="ic:outline-search" class="cursor-pointer w-8 h-8 text-gray-100  transition-all hover:text-primary" />
      </NuxtLink>
    </div>
    <div class="mt-auto mb-8 mx-auto flex flex-col items-center gap-8">
      <img v-if="user?.user_metadata" :src="user.user_metadata.avatar_url" @error="onError"
        class="p-[1.5px] bg-gray-400 rounded-full w-[44px] h-[44px]" />
      <section class="flex flex-col cursor-pointer group" @click="onClickAccountBtn">
        <Icon name="ic:outline-exit-to-app"
          class=" w-8 h-8 text-gray-50 opacity-20 group-hover:opacity-100 transition-all"
          :class="{ 'transform rotate-180': !user }" />
        <span class="text-[12px] text-center text-white">{{
          user ? '登出' : '登录'
        }}</span>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NPopover } from 'naive-ui'

const user = useSupabaseUser()
const supabase = useSupabaseAuthClient();

const onError = (e: Event) => {
  if (e.target) {
    const img = e.target as HTMLImageElement
    if (img.src === '/logo.png') return
    img.src = '/logo.png'
  }
}

const onLogout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
  }
};

const onLogin = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'twitter',
  });

  if (error) {
    console.error(error);
  }
};


const onClickAccountBtn = () => {
  if (user.value) {
    onLogout()
  } else {
    onLogin()
  }
}


</script>

