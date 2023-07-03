<template>
  <n-config-provider preflight-style-disabled>
    <NMessageProvider>

      <NDialogProvider>
        <div class="flex" id="default-layout">
          <div class="bg-[#212328] w-[80px] flex-col flex h-screen">
            <img src="/logo.png" class="w-[48px] mx-auto my-4 rounded-md" />
            <div class="flex-grow flex items-center flex-col pt-12 gap-4">
              <NuxtLink to="/" class="p-1 bg-gray-50 rounded-md bg-opacity-10">
                <Icon name="skill-icons:twitter" class="cursor-pointer w-8 h-8  hover:text-primary transition-all"
                  :class="{ 'text-primary': $route.path === '/', 'text-gray-100': $route.path !== '/' }" />
              </NuxtLink>
              <NuxtLink to="search" class="p-1 bg-gray-50 rounded-md bg-opacity-10">
                <Icon :class="{ 'text-primary': $route.path === '/search', 'text-gray-100': $route.path !== '/search' }"
                  name="ic:outline-search" class="cursor-pointer w-8 h-8 text-gray-100 hover:text-white transition-all" />
              </NuxtLink>
            </div>
            <div class="mt-auto mb-8 mx-auto flex flex-col items-center gap-8">
              <img v-if="user?.user_metadata" :src="user.user_metadata.avatar_url" :class="{ 'opacity-50': !isLoad }"
                @load="onLoad" @error="onError" class="p-[1.5px] bg-gray-400 rounded-full w-[44px] h-[44px]" />
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
          <div class="h-screen overflow-y-auto" :style="{
              'width': 'calc(100vw - 80px)'
            }">

            <slot />
          </div>
        </div>
      </NDialogProvider>
    </NMessageProvider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { NConfigProvider, NDialogProvider, NMessageProvider } from 'naive-ui'
const user = useSupabaseUser()
const supabase = useSupabaseAuthClient();
const isLoad = ref(false)

const onLoad = () => {
  isLoad.value = true
}

const onError = (e: Event) => {
  if (e.target) {
    const img = e.target as HTMLImageElement
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