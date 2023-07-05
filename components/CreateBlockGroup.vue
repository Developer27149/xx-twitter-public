<template>
  <div>
    <NButton color="black" @click="showModal = true">
      <template #icon>
        <Icon name="material-symbols:add-box-outline" />
      </template>
      创建订阅
    </NButton>
    <n-modal v-model:show="showModal">
      <div class="bg-white p-8 rounded-md flex flex-col gap-8">
        <div class="relative bg-gray-50 p-4">
          <span class="absolute left-2 top-2 text-orange-500 text-3xl">“</span>
          <div class="pl-4">创建订阅，分享给现需要的人</div>
        </div>
        <NForm ref="formRef" :model="form" :rules="rules" label-placement="left" label-width="68" class="w-[540px]">
          <NFormItem required label="标题" path="title">
            <NInput v-model:value="form.title" maxlength="24" placeholder="吸引人的标题" />
          </NFormItem>
          <NFormItem label="介绍">
            <NInput type="textarea" v-model:value="form.intro" placeholder="创建这个订阅列表的初衷" />
          </NFormItem>
          <NFormItem label="背景图">
            <NInput v-model:value="form.background" placeholder="https://..." />
          </NFormItem>
        </NForm>
        <div class="flex justify-end gap-4">
          <NButton @click="showPreview = true">预览</NButton>
          <NButton type="primary" @click="onSubmit">发布</NButton>
        </div>
      </div>
    </n-modal>
    <NModal v-model:show="showPreview">
      <div class="w-[600px]">
        <BlockGroup v-if="showPreview" :="uploadData" mode="preview" />
      </div>
    </NModal>
  </div>
</template>

<script setup lang="ts">
import { FormInst, FormRules, NButton, NForm, NFormItem, NInput, NModal } from 'naive-ui'
import { IBlockGroup } from '~/services/common/types';
import BlockGroup from './BlockGroup.vue';
import { URL_BLOCK_GROUP } from '~/services/url.list';
import { useRequest } from '~/componsables/request';

const props = defineProps<{ refresh?: (params?: any) => Promise<unknown> }>()

const user = useSupabaseUser()
const showModal = ref(false)
const showPreview = ref(false)
const form = reactive({
  title: '',
  intro: '',
  background: '',
})
const rules = {
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
  ],
} as FormRules

const formRef = ref<FormInst>()
const uploadData = computed(() => ({
  like: 0,
  dislike: 0,
  subscribers: user.value?.user_metadata.user_name ?? '',
  user_name: user.value?.user_metadata.user_name,
  name: user.value?.user_metadata.name,
  author_avatar: user.value?.user_metadata.avatar_url,
  title: form.title,
  intro: form.intro,
  background: form.background,
} as IBlockGroup))

const onSubmit = () => {
  formRef.value?.validate(async (error) => {
    if (!error) {
      const { data, error } = await useRequest(URL_BLOCK_GROUP, {
        method: 'POST',
        body: JSON.stringify(uploadData.value),
      })
      if (error.value) {
        console.log('xx error xx:', error)
      } else {
        await props.refresh?.()
        showModal.value = false
      }
    }
  })
}
</script>
