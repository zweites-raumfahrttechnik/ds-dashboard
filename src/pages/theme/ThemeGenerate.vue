<script lang="ts" setup>
import {
  Card,
  Divider,
  Form,
  FormItem,
  Row,
  Col,
  Input,
  Descriptions,
  DescData,
  Button,
} from '@arco-design/web-vue';

import { FormInstance } from '@arco-design/web-vue/es/form';
import { useAxios } from '@vueuse/integrations/useAxios';
import { GEN_CODE } from '@/api/url';

import PageContainer from '@/components/PageContainer.vue';
import ConnectSelect from './components/ConnectSelect.vue';
import { defaultGenCodeFormValue, GenCodeFormModel } from './types';
import { useUserModel } from '@/model';

const metadata = ref<DescData[]>([
  {
    label: 'Project',
    value: 'Maven Project',
  },
  {
    label: 'Java',
    value: '11',
  },
  {
    label: 'Spring Boot',
    value: '2.7.5',
  },

  {
    label: 'Packaging',
    value: 'Jar',
  },
]);
const genCodeFormRef = ref<FormInstance>();
const genCodeForm = reactive<GenCodeFormModel>({ ...defaultGenCodeFormValue });

const { token } = useUserModel();

const { data: file, execute: generate } = useAxios(
  '/api' + GEN_CODE,
  {
    method: 'POST',
    responseType: 'blob',
    headers: { Authorization: `ASI ${token.value}` || 'ASI ' },
  },
  {
    immediate: false,
  },
);

const packageName = computed(() => {
  return genCodeForm.group + '.' + genCodeForm.artifact;
});

const handleConnectChange = (uuid: string) => {
  genCodeForm.uuid = uuid;
};

const handleGenerate = async () => {
  const res = genCodeFormRef.value?.validate();
  if (!res) {
    return;
  }
  generate({
    data: {
      ...genCodeForm,
    },
  });
};

watch(
  () => file.value,
  val => {
    const blob = new Blob([val], { type: 'application/octet-stream' });
    const fileName = 'demo.zip';

    const elink = document.createElement('a');
    elink.download = fileName;
    elink.style.display = 'none';
    elink.href = window.URL.createObjectURL(blob);
    document.body.appendChild(elink);
    elink.click();
    window.URL.revokeObjectURL(elink.href);
    document.body.removeChild(elink);
  },
);
</script>

<template>
  <PageContainer>
    <Card class="general-card" :bordered="false">
      <template #title>实例选择</template>
      <ConnectSelect @handle-connect-change="handleConnectChange" />
    </Card>

    <Divider :style="{ marginTop: '0' }" />
    <Card class="general-card card-container" :bordered="false">
      <template #title>主题服务</template>

      <Row :wrap="false">
        <Col class="col-height">
          <div :style="{ display: 'flex', justifyContent: 'center', alignItems: 'center' }">
            <Descriptions size="large" :column="2" class="form" :data="metadata" title="元数据" />
          </div>

          <div :style="{ display: 'flex', justifyContent: 'center', alignItems: 'center' }">
            <Form ref="genCodeFormRef" :model="genCodeForm" class="form" layout="vertical">
              <FormItem label="Group" field="group" :rules="[{ required: true }]">
                <Input v-model="genCodeForm.group" />
              </FormItem>

              <FormItem label="Artifact" field="artifact" :rules="[{ required: true }]">
                <Input v-model="genCodeForm.artifact" />
              </FormItem>

              <FormItem label="Name" field="name" :rules="[{ required: true }]">
                <Input v-model="genCodeForm.name" />
              </FormItem>

              <FormItem label="Describe" field="describe">
                <Input v-model="genCodeForm.describe" />
              </FormItem>

              <FormItem label="Package name">
                <Input v-model="packageName" readonly />
              </FormItem>
            </Form>
          </div>
          <div :style="{ display: 'flex', justifyContent: 'center', alignItems: 'center' }">
            <div :style="{ width: '100px', marginTop: '10px' }">
              <Button type="primary" long @click="handleGenerate"> 生成</Button>
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  </PageContainer>
</template>

<style lang="less" scoped>
.form {
  width: 60%;
}

.card-container {
  height: 100%;
  flex: 1;

  .col-height {
    height: 600px;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
      background-color: #ecf0f1;
    }

    &::-webkit-scrollbar-thumb {
      background: #bdc3c7;
    }
  }

  .line-center {
    display: flex;
    justify-content: center;
  }

  :deep(.arco-card-body) {
    position: relative;
  }
}
</style>
