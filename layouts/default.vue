<template>
  <n-config-provider preflight-style-disabled>
    <NLoadingBarProvider>
      <n-notification-provider>
        <NMessageProvider>
          <NDialogProvider>
            <div class="flex" id="default-layout">
              <NavBar />
              <div class="h-screen overflow-y-auto" :style="{
                'width': 'calc(100vw - 80px)'
              }">
                <slot />
              </div>
            </div>
          </NDialogProvider>
        </NMessageProvider>
      </n-notification-provider>
    </NLoadingBarProvider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { NConfigProvider, NDialogProvider, NMessageProvider, NNotificationProvider, NLoadingBarProvider } from 'naive-ui'
</script>