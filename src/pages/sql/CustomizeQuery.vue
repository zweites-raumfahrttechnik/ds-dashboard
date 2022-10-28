<script lang="ts" setup>
import { Card } from '@arco-design/web-vue';

import PageContainer from '@/components/PageContainer.vue';

import CodemirrorEditor from './components/CodeMirror.vue';
</script>

<template>
  <PageContainer>
    <Card class="general-card" :bordered="false">
      <template #title>编辑器</template>

      <CodemirrorEditor />
    </Card>
  </PageContainer>
</template>
