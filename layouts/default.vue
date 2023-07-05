<template>
  <n-config-provider preflight-style-disabled>
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
  </n-config-provider>
</template>

<script setup lang="ts">
import { NConfigProvider, NDialogProvider, NMessageProvider, NNotificationProvider } from 'naive-ui'
</script>